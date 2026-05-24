#!/bin/zsh

set -u
set -o pipefail

CONFIG_FILE="${VNC_RESOLUTION_CONFIG:-$HOME/.config/vnc-resolution-watcher/config.zsh}"
STATE_FILE="${VNC_RESOLUTION_STATE_FILE:-$HOME/.vnc-resolution-state}"
POLL_SECONDS="${POLL_SECONDS:-3}"
CONNECTED_POLL_SECONDS="${CONNECTED_POLL_SECONDS:-$POLL_SECONDS}"
IDLE_POLL_SECONDS="${IDLE_POLL_SECONDS:-$POLL_SECONDS}"
NORMAL_GRACE_SECONDS="${NORMAL_GRACE_SECONDS:-10}"
DRY_RUN=0
RUN_ONCE=0
NEXT_SLEEP_SECONDS="$POLL_SECONDS"

typeset -ga VNC_PORTS
typeset -ga IPHONE_HOSTS
typeset -ga IPAD_HOSTS
typeset -ga IPHONE_IPS
typeset -ga IPAD_IPS
typeset -ga NORMAL_PRESET
typeset -ga IPHONE_PRESET
typeset -ga IPAD_PRESET

VNC_PORTS=(5900)
IPHONE_HOSTS=()
IPAD_HOSTS=()
IPHONE_IPS=()
IPAD_IPS=()
NORMAL_PRESET=()
IPHONE_PRESET=()
IPAD_PRESET=()

usage() {
  cat <<'EOF'
Usage:
  vnc-resolution-watcher.zsh [options]

Options:
  --config PATH       Use a config file instead of ~/.config/vnc-resolution-watcher/config.zsh
  --once              Detect and apply once, then exit
  --dry-run           Print the mode that would be applied without running displayplacer
  --list-peers        Print Tailscale peer hostnames and IPs, then exit
  --print-vnc-ips     Print currently connected VNC remote IPs, then exit
  --debug-detect      Print raw socket data, parsed remote IPs, and detected mode, then exit
  -h, --help          Show this help
EOF
}

die() {
  print -ru2 -- "vnc-resolution-watcher: $*"
  exit 1
}

log_message() {
  local message="$*"
  print -ru2 -- "$(date '+%Y-%m-%dT%H:%M:%S%z') $message"

  if command -v logger >/dev/null 2>&1; then
    logger -t vnc-resolution-watcher -- "$message" || true
  fi
}

while (( $# > 0 )); do
  case "$1" in
    --config)
      (( $# >= 2 )) || die "--config requires a path"
      CONFIG_FILE="$2"
      shift 2
      ;;
    --once)
      RUN_ONCE=1
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --list-peers)
      if ! command -v tailscale >/dev/null 2>&1; then
        die "tailscale is not installed or is not on PATH"
      fi
      if ! command -v jq >/dev/null 2>&1; then
        die "jq is required for --list-peers"
      fi
      tailscale status --json \
        | jq -r '.Peer[] | [
            .HostName,
            (.DNSName // "-"),
            (.OS // "-"),
            (.TailscaleIPs | join(","))
          ] | @tsv'
      exit 0
      ;;
    --print-vnc-ips)
      PRINT_VNC_IPS=1
      shift
      ;;
    --debug-detect)
      DEBUG_DETECT=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "unknown option: $1"
      ;;
  esac
done

get_vnc_lsof_names() {
  local port

  for port in "${VNC_PORTS[@]}"; do
    lsof -nP -a -iTCP:"$port" -sTCP:ESTABLISHED -Fn 2>/dev/null || true
  done
}

get_vnc_netstat_lines() {
  netstat -anv -p tcp 2>/dev/null \
    | awk -v ports="${VNC_PORTS[*]}" '
        BEGIN {
          split(ports, port_list, " ")
          for (i in port_list) {
            wanted["." port_list[i]] = 1
          }
        }
        $1 ~ /^tcp/ && $6 == "ESTABLISHED" {
          for (suffix in wanted) {
            if ($4 ~ suffix "$") {
              print
              next
            }
          }
        }
      '
}

get_vnc_remote_ips() {
  {
    get_vnc_lsof_names \
      | awk '
        /^n/ && /->/ {
          sub(/^n/, "")
          sub(/^.*->/, "")
          sub(/^\[/, "")
          sub(/\]:[0-9]+$/, "")
          sub(/:[0-9]+$/, "")
          print
        }
      '

    get_vnc_netstat_lines \
      | awk '
          {
            remote = $5
            sub(/\.[0-9]+$/, "", remote)
            print remote
          }
        '
  } \
    | sort -u
}

if (( ${PRINT_VNC_IPS:-0} )); then
  if [[ -r "$CONFIG_FILE" ]]; then
    source "$CONFIG_FILE"
  fi

  get_vnc_remote_ips
  exit 0
fi

[[ -r "$CONFIG_FILE" ]] || die "config file not found: $CONFIG_FILE"
source "$CONFIG_FILE"

if [[ -n "${IPHONE_IP:-}" ]]; then
  IPHONE_IPS+=("$IPHONE_IP")
fi

if [[ -n "${IPAD_IP:-}" ]]; then
  IPAD_IPS+=("$IPAD_IP")
fi

if [[ -n "${IPHONE_HOST:-}" ]]; then
  IPHONE_HOSTS+=("$IPHONE_HOST")
fi

if [[ -n "${IPAD_HOST:-}" ]]; then
  IPAD_HOSTS+=("$IPAD_HOST")
fi

(( ${#IPHONE_IPS[@]} > 0 || ${#IPAD_IPS[@]} > 0 || ${#IPHONE_HOSTS[@]} > 0 || ${#IPAD_HOSTS[@]} > 0 )) \
  || die "set IPHONE_HOSTS/IPHONE_IPS and/or IPAD_HOSTS/IPAD_IPS in $CONFIG_FILE"

ensure_preset() {
  local mode="$1"
  shift

  (( $# > 0 )) || die "missing ${mode} displayplacer preset in $CONFIG_FILE"
}

ensure_preset "normal" "${NORMAL_PRESET[@]}"

if (( ${#IPHONE_IPS[@]} > 0 || ${#IPHONE_HOSTS[@]} > 0 )); then
  ensure_preset "iphone" "${IPHONE_PRESET[@]}"
fi

if (( ${#IPAD_IPS[@]} > 0 || ${#IPAD_HOSTS[@]} > 0 )); then
  ensure_preset "ipad" "${IPAD_PRESET[@]}"
fi

resolve_host_ips() {
  local host

  {
    for host in "$@"; do
      dscacheutil -q host -a name "$host" 2>/dev/null \
        | awk '/ip_address:/ {print $2}'

      if command -v tailscale >/dev/null 2>&1 && command -v jq >/dev/null 2>&1; then
        tailscale status --json 2>/dev/null \
          | jq -r --arg host "$host" '
              def norm: ascii_downcase | rtrimstr(".");
              (.Peer[]?, .Self)
              | select(((.DNSName // "") | norm) == ($host | norm))
              | .TailscaleIPs[]?
            '
      fi
    done
  } | sort -u
}

build_mode_ips() {
  local static_output
  local resolved_output

  static_output="$(printf '%s\n' "$@")"
  resolved_output="$(resolve_host_ips "${MODE_HOSTS[@]}")"

  {
    [[ -n "$static_output" ]] && print -r -- "$static_output"
    [[ -n "$resolved_output" ]] && print -r -- "$resolved_output"
  } | awk 'NF' | sort -u
}

remote_has_any() {
  local remote_ip
  local candidate_ip

  for remote_ip in "${REMOTE_IPS[@]}"; do
    for candidate_ip in "$@"; do
      [[ "$remote_ip" == "$candidate_ip" ]] && return 0
    done
  done

  return 1
}

detect_mode() {
  local remote_output
  local iphone_output
  local ipad_output
  typeset -ga REMOTE_IPS
  typeset -ga ACTIVE_IPHONE_IPS
  typeset -ga ACTIVE_IPAD_IPS
  typeset -ga MODE_HOSTS

  remote_output="$(get_vnc_remote_ips)"
  if [[ -z "$remote_output" ]]; then
    REMOTE_IPS=()
  else
    REMOTE_IPS=("${(@f)remote_output}")
  fi

  MODE_HOSTS=("${IPHONE_HOSTS[@]}")
  iphone_output="$(build_mode_ips "${IPHONE_IPS[@]}")"
  if [[ -z "$iphone_output" ]]; then
    ACTIVE_IPHONE_IPS=()
  else
    ACTIVE_IPHONE_IPS=("${(@f)iphone_output}")
  fi

  MODE_HOSTS=("${IPAD_HOSTS[@]}")
  ipad_output="$(build_mode_ips "${IPAD_IPS[@]}")"
  if [[ -z "$ipad_output" ]]; then
    ACTIVE_IPAD_IPS=()
  else
    ACTIVE_IPAD_IPS=("${(@f)ipad_output}")
  fi

  if (( ${#ACTIVE_IPHONE_IPS[@]} > 0 )) && remote_has_any "${ACTIVE_IPHONE_IPS[@]}"; then
    print -r -- "iphone"
  elif (( ${#ACTIVE_IPAD_IPS[@]} > 0 )) && remote_has_any "${ACTIVE_IPAD_IPS[@]}"; then
    print -r -- "ipad"
  else
    print -r -- "normal"
  fi
}

if (( ${DEBUG_DETECT:-0} )); then
  typeset -ga MODE_HOSTS

  MODE_HOSTS=("${IPHONE_HOSTS[@]}")
  iphone_debug_ips="$(build_mode_ips "${IPHONE_IPS[@]}")"
  MODE_HOSTS=("${IPAD_HOSTS[@]}")
  ipad_debug_ips="$(build_mode_ips "${IPAD_IPS[@]}")"

  print -r -- "config: $CONFIG_FILE"
  print -r -- "ports: ${VNC_PORTS[*]}"
  print -r -- "iphone hosts: ${IPHONE_HOSTS[*]:-(none)}"
  print -r -- "ipad hosts: ${IPAD_HOSTS[*]:-(none)}"
  print -r -- "iphone IPs: ${${(F)${(@f)iphone_debug_ips}}:-${IPHONE_IPS[*]:-(none)}}"
  print -r -- "ipad IPs: ${${(F)${(@f)ipad_debug_ips}}:-${IPAD_IPS[*]:-(none)}}"
  print -r -- ""
  print -r -- "raw lsof -Fn:"
  get_vnc_lsof_names | sed 's/^/  /'
  print -r -- ""
  print -r -- "raw netstat:"
  get_vnc_netstat_lines | sed 's/^/  /'
  print -r -- ""
  print -r -- "parsed remote IPs:"
  get_vnc_remote_ips | sed 's/^/  /'
  print -r -- ""
  print -r -- "detected mode:"
  detect_mode | sed 's/^/  /'
  exit 0
fi

write_state() {
  local mode="$1"
  local state_dir="${STATE_FILE:h}"

  mkdir -p -- "$state_dir"
  print -r -- "$mode" > "$STATE_FILE"
}

run_displayplacer() {
  local mode="$1"
  shift

  if (( DRY_RUN )); then
    print -r -- "dry-run: would apply $mode preset:"
    printf '  displayplacer'
    printf ' %q' "$@"
    printf '\n'
    return 0
  fi

  if ! command -v displayplacer >/dev/null 2>&1; then
    die "displayplacer is not installed or is not on PATH"
  fi

  displayplacer "$@"
}

apply_mode() {
  local mode="$1"
  local current_state

  current_state="$(cat "$STATE_FILE" 2>/dev/null || true)"
  if (( ! DRY_RUN )) && [[ "$current_state" == "$mode" ]]; then
    return 0
  fi

  case "$mode" in
    iphone)
      run_displayplacer "$mode" "${IPHONE_PRESET[@]}" || return 1
      ;;
    ipad)
      run_displayplacer "$mode" "${IPAD_PRESET[@]}" || return 1
      ;;
    normal)
      run_displayplacer "$mode" "${NORMAL_PRESET[@]}" || return 1
      ;;
    *)
      die "unknown mode: $mode"
      ;;
  esac

  if (( ! DRY_RUN )); then
    write_state "$mode"
    log_message "applied $mode mode"
  fi
}

last_recognized_seen=0

tick() {
  local mode
  local now
  local current_state

  mode="$(detect_mode)"
  now="$(date +%s)"
  current_state="$(cat "$STATE_FILE" 2>/dev/null || true)"

  if [[ "$mode" == "iphone" || "$mode" == "ipad" ]]; then
    last_recognized_seen="$now"
    NEXT_SLEEP_SECONDS="$CONNECTED_POLL_SECONDS"
    apply_mode "$mode"
    return
  fi

  if (( last_recognized_seen == 0 || now - last_recognized_seen >= NORMAL_GRACE_SECONDS )); then
    apply_mode "normal"
    NEXT_SLEEP_SECONDS="$IDLE_POLL_SECONDS"
  elif (( DRY_RUN )); then
    NEXT_SLEEP_SECONDS="$CONNECTED_POLL_SECONDS"
    print -r -- "dry-run: holding current preset during ${NORMAL_GRACE_SECONDS}s normal-mode grace period"
  elif [[ "$current_state" == "iphone" || "$current_state" == "ipad" ]]; then
    NEXT_SLEEP_SECONDS="$CONNECTED_POLL_SECONDS"
  else
    NEXT_SLEEP_SECONDS="$IDLE_POLL_SECONDS"
  fi
}

while true; do
  tick

  (( RUN_ONCE )) && exit 0
  sleep "$NEXT_SLEEP_SECONDS"
done
