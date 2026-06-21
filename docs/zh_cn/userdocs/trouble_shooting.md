---
title: 问题排查手册
description: MaaNTE 问题排查手册，涵盖无法启动、无法开始任务、模拟器、截图、WebView2 等常见问题及解决方案
head:
  - - meta
    - name: keywords
      content: MaaNTE,问题排查,报错,无法启动,WebView2,模拟器,截图,故障排除
dir:
  order: 3
---

[[TOC]]

## 运行问题

### 无法启动

::: collapse

- 弹窗提示 `Could not find the WebView2 Runtime.`

    缺少`WebView2`。

    前往 [Microsoft Edge WebView2 | Microsoft Edge Developer](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2) 下载并安装 `Microsoft Edge WebView2` 。

- 弹窗提示 `To run this application, you must install .NET`

    缺少.NET运行库

    该问题为`MFAA`特有问题，`1.0.0`及以后版本改用`MXU`，不再需要`.NET`，建议更新到新版本。
  
    如果你仍想使用旧版本，可以前往[下载 .NET 10.0](https://dotnet.microsoft.com/zh-tw/download/dotnet/thank-you/sdk-10.0.300-windows-x64-installer) 下载并安装 `.NET 10.0 Desktop Runtime` （.NET 桌面运行时）。
:::

### 无法开始任务

::: collapse

- 不支持当前控制器

    在 MaaNTE 右上角`连接设置`中选择合适的控制器。

- 无法连接窗口

    - 确保你打开了异环。
    - 确保你是**以管理员身份运行**的 MaaNTE 。

- 资源加载失败

    删除 MaaNTE 所在目录下全部内容（可以保留`config`文件夹），然后重新解压。

- 出现`HD_python.exe`窗口

    你的电脑可能存在**蠕虫病毒**，建议尽快杀毒并重装系统。

    部分外挂工具也会导致这个问题，这种情况下我们不受理该类问题。
:::

### 任务运行异常

::: collapse

- 无法正常进行点击/操作

    - 确保你的 MaaNTE 处于**纯英文**路径下，并且没有全角符号（最好符号也别有）。
    - 确保你是**以管理员身份运行**的 MaaNTE 。
    - 确保 Windows 屏幕缩放为 100%。
    - 确保 MaaNTE 连接了正确的窗口。
    - 尝试其它控制器。
    - 尝试更改游戏帧率。

- 抢占鼠标

    `桌面端-默认`、`桌面端-前台`有此类情况为正常现象。

- 窗口乱飞

    `桌面端-后台`有此类情况为正常现象。

- 任务频繁失败

    关闭游戏内插帧、超分辨率等影响画质的功能。
:::

## 各任务相关问题

### 自动钓鱼

::: collapse

- 无法购买鱼饵

    尝试降低`鱼饵识别阈值`。

    如果无法解决，也可自行购买足够鱼饵（建议1000+）后关闭自动购买鱼饵功能使用。
:::

### 自动做咖啡

::: collapse

- 只知道锤人

    正常现象，本质上是自动锤所有人。需要**娜娜莉**的都市技能。

- 没有收益/没有全连击

    正常现象，本质上是自动锤所有人。需要**娜娜莉**的都市技能。
:::
