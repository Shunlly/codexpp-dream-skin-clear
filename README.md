# Codex++ Dream Skin 原图增强

Codex++ 用户脚本：降低 dream-skin 的面板透明遮罩，让皮肤原图更清晰；可隐藏主题名/标语。带设置页（✿）。

## 安装
1. 下载 `dream-skin-clear.js` 放到 `~/.config/Codex++/user_scripts/`（Windows：`%USERPROFILE%\.config\Codex++\user_scripts\`）
2. Codex++ 管理工具 → 拓展 → 本地拓展，启用后点「热重载拓展」
3. 侧边栏 ✿「Dream Skin 原图增强」调整设置

## 卸载
删除该文件并热重载即可，不修改 Codex++ 本体。

---

# Codex 残留进程清理（macOS）

Codex++ 重启 Codex 时，旧实例的 `bare-modifier-monitor`、`crashpad_handler` 可能残留，导致桌面宠物卡住、拖不动。此工具每 60 秒清理一次早于当前 Codex 启动的孤儿进程，不影响正在运行的 Codex。

- 安装：`bash codex-orphan-cleaner/install.sh`
- 卸载：`bash codex-orphan-cleaner/install.sh uninstall`
- 日志：`~/.config/codex-orphan-cleaner/clean.log`
