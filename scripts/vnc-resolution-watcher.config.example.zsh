# Copy this file to:
#   ~/.config/vnc-resolution-watcher/config.zsh
#
# Then fill in the Tailscale IPs and displayplacer presets for this Mac.

# Direct VNC uses TCP 5900 by default. Add more ports if your VNC server uses
# a different listener.
VNC_PORTS=(5900)

# Polling interval for active VNC connections.
POLL_SECONDS=3

# Delay before restoring the normal preset after the VNC connection disappears.
# This prevents flicker during short reconnects.
NORMAL_GRACE_SECONDS=10

# Get peer IPs with:
#   vnc-resolution-watcher.zsh --list-peers
#
# Prefer MagicDNS hostnames. The watcher resolves these every poll, then
# compares the resolved Tailscale IPs to the active VNC socket.
IPHONE_HOSTS=("manuels-iphone.example-tailnet.ts.net")
IPAD_HOSTS=("manuels-ipad.example-tailnet.ts.net")

# Optional fixed IP fallbacks. Include both the 100.x IPv4 and fd7a:... IPv6
# Tailscale addresses if you want the watcher to keep working without DNS.
IPHONE_IPS=()
IPAD_IPS=()

# Get valid display IDs and resolutions with:
#   displayplacer list
#
# Paste each displayplacer display argument as one quoted array item. For a
# multi-monitor setup, include one item per display in each preset.
NORMAL_PRESET=(
  'id:YOUR_DISPLAY_ID res:2560x1440 scaling:on origin:(0,0) degree:0'
)

IPHONE_PRESET=(
  'id:YOUR_DISPLAY_ID mode:18 enabled:true origin:(0,0) degree:90'
)

IPAD_PRESET=(
  'id:YOUR_DISPLAY_ID res:1366x1024 scaling:on origin:(0,0) degree:0'
)
