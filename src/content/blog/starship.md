---
title: 'Starship：把终端提示符调成 Tokyo Night 夜景'
description: '基于 Alacritty 安装 Starship 提示符，配好 JetBrains Mono Nerd 字体与 Tokyo Night 预设，再顺手调出透明磨砂窗口。'
pubDate: '2026-09-13'
category: 'Linux'
tags: ['linux',  '终端美化']
---

Starship 是一个十分美观的终端提示符工具，本文的配置基于 **Alacritty** 终端。

## 一、安装 Starship 与 Nerd 字体

Arch 系一条命令搞定：

```bash
sudo pacman -S starship ttf-jetbrains-mono-nerd
```

终端解释器实在太多，这里把官网的初始化步骤整理过来，照着自己在用的 shell 改就行。

### 把初始化脚本加进 shell 配置

**Bash** —— 在 `~/.bashrc` 末尾添加：

```bash
# ~/.bashrc
eval "$(starship init bash)"
```

**Fish** —— 在 `~/.config/fish/config.fish` 末尾添加：

```fish
# ~/.config/fish/config.fish
starship init fish | source
```

**Zsh** —— 在 `~/.zshrc` 末尾添加：

```bash
# ~/.zshrc
eval "$(starship init zsh)"
```

**PowerShell** —— 在 `Microsoft.PowerShell_profile.ps1` 末尾添加。可以在 PowerShell 里用 `$PROFILE` 变量查询该文件位置，类 Unix 系统通常是 `~/.config/powershell/Microsoft.PowerShell_profile.ps1`：

```powershell
Invoke-Expression (&starship init powershell)
```

**Ion** —— 在 `~/.config/ion/initrc` 末尾添加：

```bash
# ~/.config/ion/initrc
eval $(starship init ion)
```

**Elvish** —— 仅支持 v0.18 及以上版本；在 `~/.config/elvish/rc.elv`（Windows 为 `%AppData%\elvish\rc.elv`）末尾添加：

```elvish
# ~/.elvish/rc.elv
eval (starship init elvish)
```

> v0.21.0 之前的版本，配置文件可能是 `~/.elvish/rc.elv`。

**Tcsh** —— 在 `~/.tcshrc` 末尾添加：

```tcsh
# ~/.tcshrc
eval `starship init tcsh`
```

**Nushell** —— 仅支持 v0.96+（后续可能会有变化）。在 Nushell 中运行 `$nu.config-path` 可以找到配置文件位置：

```nu
mkdir ($nu.data-dir | path join "vendor/autoload")
starship init nu | save -f ($nu.data-dir | path join "vendor/autoload/starship.nu")
```

**Xonsh** —— 在 `~/.xonshrc` 末尾添加：

```python
# ~/.xonshrc
execx($(starship init xonsh))
```

**Cmd** —— 需要搭配 Clink (v1.2.30+)。把下面这段存成 `starship.lua`，放进 Clink 的脚本目录：

```lua
-- starship.lua
load(io.popen('starship init cmd'):read("*a"))()
```

> 其他平台也可以用 Homebrew（`brew install starship`）或 Winget（`winget install starship`）安装。

## 二、套用 Tokyo Night 预设

官方预设列表在这里，我用的是「东京夜晚」：

<https://starship.rs/zh-CN/presets/#tokyo-night>

```bash
# 创建 Starship 配置目录
mkdir -p ~/.config

# 下载 Tokyo Night 预设并覆盖默认配置
curl -o ~/.config/starship.toml https://starship.rs/presets/toml/tokyo-night.toml
```

## 三、给 Alacritty 加上透明度和字体

```bash
nano ~/.config/alacritty/alacritty.toml
```

```toml
[font]
# 强制使用刚才安装的 Nerd 字体，确保 Starship 图标完美渲染
normal = { family = "JetBrainsMono Nerd Font", style = "Regular" }
bold = { family = "JetBrainsMono Nerd Font", style = "Bold" }
italic = { family = "JetBrainsMono Nerd Font", style = "Italic" }
size = 12.0

[window]
# 核心美学参数：开启窗口透明度，让 Noctalia 的壁纸透过来
opacity = 0.85
# 开启动态填充，防止窗口边缘出现黑边
dynamic_padding = true

# 设置这个能让窗口透明，如果是 None 就会很丑
decorations = "Full"
```

## 四、重启 Alacritty

```bash
pkill alacritty
```

再次启动 Alacritty，应该就能看到效果了。
