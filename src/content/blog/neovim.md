---
title: 'Neovim + LazyVim：Night 透明主题'
description: '在 Arch / CachyOS 上从零安装 Neovim 与 LazyVim，配齐搜索、剪贴板与 LSP 依赖，再把主题调成与 Starship 同源的 Tokyo Night 透明风。'
pubDate: '2026-09-13'
category: 'Linux'
tags: ['linux', 'neovim' , '终端美化']
---

## 一、安装依赖

```bash
# 1. 核心搜索与剪贴板依赖（Telescope 插件 + Wayland 剪贴板的物理基础）
sudo pacman -S ripgrep fd wl-clipboard

# 2. LSP 与 Treesitter 编译依赖（解析语法树、编译语言服务器）
sudo pacman -S npm python gcc

# 3. Neovim 本体（CachyOS 仓库提供 0.12.x 版本）
sudo pacman -S neovim
```

## 二、隔离旧配置

如果之前装过 Neovim，先把旧配置整体移走备份（不存在时会静默跳过）：

```bash
mv ~/.config/nvim      ~/.config/nvim.bak      2>/dev/null
mv ~/.local/share/nvim ~/.local/share/nvim.bak 2>/dev/null
mv ~/.local/state/nvim ~/.local/state/nvim.bak 2>/dev/null
mv ~/.cache/nvim       ~/.cache/nvim.bak       2>/dev/null
```

## 三、克隆 LazyVim Starter 模板

```bash
git clone https://github.com/LazyVim/starter ~/.config/nvim
```

## 四、配置 Tokyo Night 透明主题

打开主题配置文件：

```bash
nano ~/.config/nvim/lua/plugins/colorscheme.lua
```

写入以下内容：

```lua
return {
  {
    "folke/tokyonight.nvim",
    lazy = false,
    priority = 1000,
    opts = {
      style = "night", -- 与 Starship 的 tokyo-night 预设保持同源
      transparent = true, -- 开启全局透明

      -- 针对 Neovim 0.11+ 的 Bufferline 不透明 Bug 的物理修复
      on_colors = function(colors)
        colors.bg = "NONE"
        colors.bg_dark = "NONE"
        colors.bg_float = "NONE"
      end,

      styles = {
        sidebars = "transparent",
        floats = "transparent",
      },
    },
  },
}
```

## 五、启动

重新打开一次 `nvim`，LazyVim 会自动拉取插件并完成初始化，主题随即生效。
