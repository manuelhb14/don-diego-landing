# VNC Resolution Watcher

This automation switches the Mac display preset based on which Tailscale device
is actively connected to the Mac over VNC.

```txt
iPhone VNC connection -> iPhone displayplacer preset
iPad VNC connection   -> iPad displayplacer preset
No VNC connection     -> normal displayplacer preset
```

## Files

- `scripts/vnc-resolution-watcher.zsh`: long-running watcher.
- `scripts/vnc-resolution-watcher.config.example.zsh`: config template.
- `scripts/local.vnc-resolution-watcher.plist`: launchd template.
- `scripts/install-vnc-resolution-watcher.zsh`: installer for `~/bin`, config, and LaunchAgent.

## Setup

Install `displayplacer`:

```bash
brew install displayplacer
```

Install the watcher files:

```bash
scripts/install-vnc-resolution-watcher.zsh
```

Find the Tailscale IPs for the iPhone and iPad:

```bash
~/bin/vnc-resolution-watcher.zsh --list-peers
```

The output columns are hostname, DNS name, OS, and Tailscale IPs. iOS devices
may report `localhost` as their hostname, so use the DNS name to distinguish
the iPhone and iPad. Prefer the DNS name in `IPHONE_HOSTS` / `IPAD_HOSTS`;
the watcher resolves it every poll and compares the resolved Tailscale IPs to
the active VNC socket.

Find valid display IDs and resolutions:

```bash
displayplacer list
```

Edit the config:

```bash
$EDITOR ~/.config/vnc-resolution-watcher/config.zsh
```

The important fields are:

```zsh
IPHONE_HOSTS=("manuels-iphone.example-tailnet.ts.net")
IPAD_HOSTS=("manuels-ipad.example-tailnet.ts.net")

# Optional fixed IP fallbacks:
IPHONE_IPS=()
IPAD_IPS=()

NORMAL_PRESET=(
  'id:YOUR_DISPLAY_ID res:2560x1440 scaling:on origin:(0,0) degree:0'
)

IPHONE_PRESET=(
  'id:YOUR_DISPLAY_ID mode:18 enabled:true origin:(0,0) degree:90'
)

IPAD_PRESET=(
  'id:YOUR_DISPLAY_ID res:1366x1024 scaling:on origin:(0,0) degree:0'
)
```

For multiple monitors, include one displayplacer argument per display in every
preset array.

## Test Before Loading

Dry run one detection pass:

```bash
~/bin/vnc-resolution-watcher.zsh --once --dry-run
```

Print the currently connected VNC remote IPs:

```bash
~/bin/vnc-resolution-watcher.zsh --print-vnc-ips
```

Print raw socket data and the mode the watcher would detect:

```bash
~/bin/vnc-resolution-watcher.zsh --debug-detect
```

Apply once for real:

```bash
~/bin/vnc-resolution-watcher.zsh --once
```

## Load At Login

After the config is correct:

```bash
scripts/install-vnc-resolution-watcher.zsh --load
```

Check status:

```bash
launchctl print gui/$(id -u)/local.vnc-resolution-watcher
```

Stop it:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/local.vnc-resolution-watcher.plist
```

Logs:

```bash
tail -f ~/Library/Logs/vnc-resolution-watcher.log
tail -f ~/Library/Logs/vnc-resolution-watcher.err
```

## Notes

- Direct VNC usually listens on TCP `5900`; set `VNC_PORTS=(5900 5901)` if your server uses another port too.
- The watcher uses `lsof` and a `netstat` fallback as the source of truth for active VNC connections.
- Tailscale is only needed to discover peer IPs; runtime detection is based on the active VNC socket.
- `POLL_SECONDS` controls how often the watcher checks for VNC connections.
- `NORMAL_GRACE_SECONDS` prevents display flicker during short reconnects.
