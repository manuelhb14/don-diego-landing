#!/bin/zsh

set -e
set -u
set -o pipefail

LOAD_AGENT=0

usage() {
  cat <<'EOF'
Usage:
  install-vnc-resolution-watcher.zsh [--load]

Installs:
  ~/bin/vnc-resolution-watcher.zsh
  ~/.config/vnc-resolution-watcher/config.zsh
  ~/Library/LaunchAgents/local.vnc-resolution-watcher.plist

Options:
  --load      Load or reload the LaunchAgent after installing files
  -h, --help  Show this help
EOF
}

while (( $# > 0 )); do
  case "$1" in
    --load)
      LOAD_AGENT=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      print -ru2 -- "unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

SCRIPT_DIR="${0:A:h}"
WATCHER_SRC="$SCRIPT_DIR/vnc-resolution-watcher.zsh"
CONFIG_SRC="$SCRIPT_DIR/vnc-resolution-watcher.config.example.zsh"
PLIST_TEMPLATE="$SCRIPT_DIR/local.vnc-resolution-watcher.plist"

INSTALL_BIN_DIR="${INSTALL_BIN_DIR:-$HOME/bin}"
CONFIG_DIR="${CONFIG_DIR:-$HOME/.config/vnc-resolution-watcher}"
LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"
LOG_DIR="$HOME/Library/Logs"

WATCHER_DST="$INSTALL_BIN_DIR/vnc-resolution-watcher.zsh"
CONFIG_DST="$CONFIG_DIR/config.zsh"
PLIST_DST="$LAUNCH_AGENTS_DIR/local.vnc-resolution-watcher.plist"

[[ -f "$WATCHER_SRC" ]] || { print -ru2 -- "missing $WATCHER_SRC"; exit 1; }
[[ -f "$CONFIG_SRC" ]] || { print -ru2 -- "missing $CONFIG_SRC"; exit 1; }
[[ -f "$PLIST_TEMPLATE" ]] || { print -ru2 -- "missing $PLIST_TEMPLATE"; exit 1; }

mkdir -p -- "$INSTALL_BIN_DIR" "$CONFIG_DIR" "$LAUNCH_AGENTS_DIR" "$LOG_DIR"

install -m 755 "$WATCHER_SRC" "$WATCHER_DST"

if [[ ! -e "$CONFIG_DST" ]]; then
  install -m 600 "$CONFIG_SRC" "$CONFIG_DST"
  print -r -- "created config: $CONFIG_DST"
else
  print -r -- "kept existing config: $CONFIG_DST"
fi

escape_sed_replacement() {
  print -r -- "$1" | sed 's/[&|]/\\&/g'
}

SCRIPT_PATH_ESCAPED="$(escape_sed_replacement "$WATCHER_DST")"
CONFIG_PATH_ESCAPED="$(escape_sed_replacement "$CONFIG_DST")"
HOME_ESCAPED="$(escape_sed_replacement "$HOME")"

sed \
  -e "s|__SCRIPT_PATH__|$SCRIPT_PATH_ESCAPED|g" \
  -e "s|__CONFIG_PATH__|$CONFIG_PATH_ESCAPED|g" \
  -e "s|__HOME__|$HOME_ESCAPED|g" \
  "$PLIST_TEMPLATE" > "$PLIST_DST"
chmod 644 "$PLIST_DST"
print -r -- "installed LaunchAgent: $PLIST_DST"

if ! command -v displayplacer >/dev/null 2>&1; then
  print -ru2 -- "warning: displayplacer is not installed or is not on PATH"
fi

if (( LOAD_AGENT )); then
  LABEL="local.vnc-resolution-watcher"
  DOMAIN="gui/$(id -u)"

  launchctl bootout "$DOMAIN" "$PLIST_DST" >/dev/null 2>&1 || true
  launchctl bootstrap "$DOMAIN" "$PLIST_DST"
  launchctl enable "$DOMAIN/$LABEL"
  print -r -- "loaded LaunchAgent: $LABEL"
else
  print -r -- "edit $CONFIG_DST, then load with:"
  print -r -- "  launchctl bootstrap gui/$(id -u) $PLIST_DST"
  print -r -- "  launchctl enable gui/$(id -u)/local.vnc-resolution-watcher"
fi
