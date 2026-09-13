---
title: 'Linux 输入法 雾凇拼音与万象'
description: '在 Arch Linux 上用 Fcitx5 搭配 Rime 引擎，先配好开箱即用的雾凇拼音，再换成词库更丰富的万象输入法。'
pubDate: '2026-09-13'
category: 'Linux'
tags: ['linux', 'fcitx5', ]
---

雾凇拼音是一份开箱即用的简体中文 Rime 输入法配置：词库长期维护、基本功能齐全、完全离线使用、质量稳定可靠。

> 官方仓库：<https://github.com/iDvel/rime-ice>

## 一、安装雾凇拼音

Arch 系可以直接用包管理器 `yay` / `paru` 安装 Fcitx5 与雾凇拼音的配置包：

```bash
paru -S fcitx5-im fcitx5-rime rime-ice-git
```

### 配置 `default.custom.yaml`

在 `default.custom.yaml` 中粘贴以下内容：

```yaml
patch:
  # 仅使用「雾凇拼音」的默认配置，配置此行即可
  __include: rime_ice_suggestion:/
  # 以下根据自己所需自行定义，仅做参考。
  # 针对对应处方的定制条目，请使用 <recipe>.custom.yaml 中配置，例如 rime_ice.custom.yaml
  __patch:
    key_binder/bindings/+:
      # 开启逗号句号翻页
      - { when: paging, accept: comma, send: Page_Up }
      - { when: has_menu, accept: period, send: Page_Down }
```

### 重启输入法

在终端重启 Fcitx5，雾凇拼音即可生效：

```bash
fcitx5
```

## 二、万象输入法

万象同样跑在 Fcitx5 框架 + Rime 引擎之下，说白了就是换了一套词库和语法库。

> 前提：已经安装好 Fcitx5。

### 第一步：拉取万象仓库

```bash
cd ~
git clone --depth 1 https://github.com/amzxyz/rime-wanxiang.git ~/rime-wanxiang-temp
```

### 第二步：把源码注入 Rime 工作目录

```bash
cp -r ~/rime-wanxiang-temp/* ~/.local/share/fcitx5/rime/
```

### 第三步：编辑 `default.custom.yaml`

```bash
nano ~/.local/share/fcitx5/rime/default.custom.yaml
```

粘贴以下内容：

```yaml
patch:
  # 1. 引入万象拼音上游推荐的默认设置（替代雾凇）
  __include: wanxiang_suggested_default.yaml:/

  # 2. 声明启用的输入方案列表
  # 万象分为标准版(wanxiang)和增强版(wanxiang_pro，支持双拼+辅码)
  # 这里默认启用标准版，如需增强版可取消下方注释
  schema_list:
    - schema: wanxiang
    # - schema: wanxiang_pro

  # 3. 注入你之前设置的全局切换热键
  "switcher/hotkeys":
    - "control+space"
    - "shift_r"

  "ascii_composer/switch_key":
    shift_r: commit_code
    shift_l: noop
```

### 第四步：重新编译 Rime 配置

```bash
rime_deployer --build ~/.local/share/fcitx5/rime /usr/share/rime-data
```

### 第五步：重启输入法

```bash
fcitx5
```