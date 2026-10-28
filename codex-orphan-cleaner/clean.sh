#!/bin/bash
# Codex 残留进程清理：结束旧 Codex 实例留下的孤儿辅助进程（父进程=1 且早于当前主进程启动）
# 删除：launchctl bootout gui/$(id -u)/com.shully.codex-orphan-cleaner; rm ~/Library/LaunchAgents/com.shully.codex-orphan-cleaner.plist; rm -r ~/.config/codex-orphan-cleaner
APP="/Applications/ChatGPT.app/Contents"
MAIN=$(pgrep -f "^$APP/MacOS/ChatGPT" | head -1)
if [ -n "$MAIN" ]; then
  MAIN_START=$(ps -o lstart= -p "$MAIN" | xargs -I{} date -j -f "%a %b %d %T %Y" "{}" +%s 2>/dev/null)
else
  MAIN_START=9999999999
fi
ps -axo pid=,ppid=,command= | while read -r pid ppid cmd; do
  [ "$ppid" = "1" ] || continue
  case "$cmd" in
    "$APP/Resources/native/bare-modifier-monitor"*|"$APP/Frameworks/Codex Framework.framework/"*crashpad_handler*) ;;
    *) continue ;;
  esac
  START=$(ps -o lstart= -p "$pid" | xargs -I{} date -j -f "%a %b %d %T %Y" "{}" +%s 2>/dev/null)
  [ -n "$START" ] || continue
  if [ "$START" -lt "$((MAIN_START - 5))" ]; then
    kill "$pid" 2>/dev/null && echo "$(date '+%F %T') killed $pid ${cmd:0:90}"
  fi
done
