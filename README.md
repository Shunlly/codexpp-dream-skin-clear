# Codex++ Dream Skin 原图增强

降低 Dream Skin 盖在背景上的半透明面板，让皮肤原图更清楚；可选隐藏主题名、标语和顶栏遮罩。提供侧边栏设置页（✿）。

这是 **Codex++ 用户脚本**（本地拓展），不是独立皮肤包，也不会改 Codex / Codex++ 安装目录。

## 功能

| 选项 | 默认 | 说明 |
| --- | --- | --- |
| 启用原图增强 | 开 | 关闭后恢复 Dream Skin 原版遮罩 |
| 主面板透明度 | 15 | `0` = 几乎全透看原图，`100` = 接近原版白板 |
| 次级面板透明度 | 20 | 侧栏、卡片等次级面板 |
| 隐藏主题名 | 关 | 隐藏首页标题上方的主题名字 |
| 隐藏主题标语 | 关 | 隐藏首页标题下方说明文字 |
| 隐藏顶栏遮罩 | 开 | 去掉对话页顶部半透明白条 |

设置保存在浏览器 `localStorage`（键：`shully:dream-skin-clear:settings`）。点「恢复默认」可清空。

## 要求

- 已安装并正常运行 [Codex++](https://github.com/BigPizzaV3/CodexPlusPlus)
- 已启用 Dream Skin（本脚本只调节遮罩，不会替你换皮肤）

## 安装

1. 下载 [`dream-skin-clear.js`](https://raw.githubusercontent.com/Shunlly/codexpp-dream-skin-clear/main/dream-skin-clear.js)
2. 放到 Codex++ 用户脚本目录（没有就新建）：

| 平台 | 目录 |
| --- | --- |
| Windows | `%APPDATA%\Codex++\user_scripts\` |
| macOS / Linux | `~/.config/Codex++/user_scripts/` |

Windows 示例：`C:\Users\<用户名>\AppData\Roaming\Codex++\user_scripts\dream-skin-clear.js`

3. 打开 **Codex++ 管理工具 → 拓展 → 本地拓展**
4. 确认全局用户脚本 / 拓展已开启，并启用 `dream-skin-clear.js`（新文件一般默认启用）
5. 点击 **热重载拓展**
6. 在 Codex 侧边栏打开 ✿ **Dream Skin 原图增强**，按需调节

命令行示例：

```bash
# macOS / Linux
mkdir -p ~/.config/Codex++/user_scripts
curl -L -o ~/.config/Codex++/user_scripts/dream-skin-clear.js \
  https://raw.githubusercontent.com/Shunlly/codexpp-dream-skin-clear/main/dream-skin-clear.js
```

```powershell
# Windows PowerShell
$dir = Join-Path $env:APPDATA "Codex++\user_scripts"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/Shunlly/codexpp-dream-skin-clear/main/dream-skin-clear.js" `
  -OutFile (Join-Path $dir "dream-skin-clear.js")
```

## 卸载

1. 删除 `user_scripts` 目录下的 `dream-skin-clear.js`
2. 在 Codex++ 管理页再点一次 **热重载拓展**

如仍残留样式，刷新 Codex 页面或重启 Codex++ 即可。

## 排查

| 现象 | 处理 |
| --- | --- |
| 侧边栏没有 ✿ 入口 | 确认文件在正确目录、拓展已启用，并已热重载 |
| 有入口但背景没变化 | 先确认 Dream Skin 已启用；再把「主面板透明度」调低试一下 |
| Windows 放到了错误目录 | 请用 `%APPDATA%\Codex++\user_scripts\`，不要用 `%USERPROFILE%\.config\...` |

更完整的拓展机制说明见 Codex++ 官方文档：[EXTENSIONS.md](https://github.com/BigPizzaV3/CodexPlusPlus/blob/main/EXTENSIONS.md)。

---

## 附：Codex 残留进程清理（仅 macOS）

Codex++ 重启 Codex 时，旧实例的 `bare-modifier-monitor`、`crashpad_handler` 可能残留，导致桌面宠物卡住、拖不动。`codex-orphan-cleaner` 每 60 秒清理一次**早于当前 Codex 启动**的孤儿进程，不影响正在运行的 Codex。

**仅适用于 macOS**，与上方原图增强脚本相互独立。

```bash
# 安装
bash codex-orphan-cleaner/install.sh

# 卸载
bash codex-orphan-cleaner/install.sh uninstall
```

日志：`~/.config/codex-orphan-cleaner/clean.log`
