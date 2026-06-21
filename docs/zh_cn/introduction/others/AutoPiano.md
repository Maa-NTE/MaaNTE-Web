---
title: 自动弹琴
description: MaaNTE 自动弹琴功能，读取 MIDI 谱子自动演奏钢琴，支持后台运行
head:
  - - meta
    - name: keywords
      content: 异环,自动弹琴,自动演奏,MIDI,钢琴,MaaNTE
---

## 简介

读取 MIDI 谱子并向当前目标窗口发送键盘演奏。

::: info 控制器

- [x] 桌面端-默认
- [x] 桌面端-前台
- [x] 桌面端-后台

:::

MIDI 乐谱

::: steps

1. MIDI 乐谱自定义路径

    相对路径会从项目根目录解析，例如 `songs/example.mid`；也可以填写绝对路径。
    
    举例来说:例如文件位置在 `C:\Users\download\` 且文件名称(含副档名)为 `song.mid` ( `song.midi` )，将完整路径粘贴(例如 `C:\Users\download\song.mid` )至输出目录。

2. 播放速度

  在选择拨放速度时，默认速度为 `1.0` ，可以手动输入速度倍率调节，更改后在执行中不可变更。

3. 转调

  在选择转调时，默认调性为 `0` ，如果要升小半节音输入 `+1` ，如果要升一个大调输入 `+12` ，(降调亦是如此)以此类推...。
:::
