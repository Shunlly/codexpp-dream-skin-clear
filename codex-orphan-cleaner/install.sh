#!/bin/bash
# 安装 Codex 残留进程清理（macOS）：bash install.sh   卸载：bash install.sh uninstall
set -e
L=com.shully.codex-orphan-cleaner; D="$HOME/.config/codex-orphan-cleaner"; P="$HOME/Library/LaunchAgents/$L.plist"
launchctl bootout gui/$(id -u)/$L 2>/dev/null || true
if [ "$1" = uninstall ]; then rm -f "$P"; rm -rf "$D"; echo "已卸载"; exit 0; fi
mkdir -p "$D" "$HOME/Library/LaunchAgents"
cp "$(dirname "$0")/clean.sh" "$D/clean.sh"; chmod +x "$D/clean.sh"
cat > "$P" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>Label</key><string>$L</string>
<key>ProgramArguments</key><array><string>/bin/bash</string><string>$D/clean.sh</string></array>
<key>StartInterval</key><integer>60</integer>
<key>RunAtLoad</key><true/>
<key>StandardOutPath</key><string>$D/clean.log</string>
<key>StandardErrorPath</key><string>$D/clean.log</string>
</dict></plist>
PL
launchctl bootstrap gui/$(id -u) "$P"; echo "已安装，每 60 秒检查一次，日志：$D/clean.log"
