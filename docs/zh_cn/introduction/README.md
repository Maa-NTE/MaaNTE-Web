---
title: 功能介绍
dir:
  order: 1
index: true
---

MaaNTE 是面向《异环（Neverness to Everness）》的自动化工具集，专注于减少重复操作、提升日常游玩效率。

目前，功能分为下列几类：

## 日常任务

| 任务 | 功能 | 描述 |
| --- | --- | --- |
| [领取奖励](Daily/ClaimRewards.md) {rowspan=2} | 领取活跃度奖励 | 自动领取日常奖励。 {rowspan=2} |
| 领取环期赏令奖励 |
| [家具领取](CityTycoon/Furniture.md) | 领取异象家具奖励 | 依次识别并领取三个已知的家具（仓鼠球、棉棉、破损的木箱） |
| [领取一咖舍收益](CityTycoon/WithdrawMoney.md) | 领取一咖舍收益 | - |

## 实时辅助

| 任务 | 描述 |
| --- | --- |
| [实时辅助](RealTimeAssist/RealTime.md) | 通用的辅助功能，包含自动拾取、跳过剧情、自动传送等功能。 |
| [音频闪避](RealTimeAssist/SoundDodge.md) | 基于音频的自动闪避与反击 |
| [快速拾取](RealTimeAssist/AutoFScroll.md) | 持续按住 F 并滚动滚轮，实现快速拾取 |

## 都市大亨

| 玩法 | 任务 | 描述 |
| --- | --- | --- |
| 一咖舍 | [领取一咖舍收益](CityTycoon/WithdrawMoney.md) | 领取一咖舍收益 |
| 房产 | [家具领取](CityTycoon/Furniture.md) | 领取异象家具奖励 |

## 都市闲趣

| 玩法 | 任务 | 描述 |
| --- | --- | --- |
| 同城派送 | - | - |
| 车辆赛事 | - | - |
| 店长特供 | [自动做咖啡](HethereauHobbies/MakeCoffee.md) | !!自动锤人!! |
| 雨燕出行 | - | - |
| 粉爪大劫案 | [粉爪大劫案](HethereauHobbies/PinkPawHeist.md) | 自动刷取粉爪大劫案 |
| 海上钓客 {rowspan=2} | [钓鱼任务](HethereauHobbies/Fish.md#task1) | 自动循环执行钓鱼：抛竿、等待上钩、收杆，支持自动卖鱼和自动买鱼饵。 |
| [钓鱼任务（新）](HethereauHobbies/Fish.md#task2) | 自动循环执行钓鱼，默认情况下会一直循环执行。 |
| 小小麻雀 | - | - |
| 泯除方块 | [泯除方块](HethereauHobbies/Tetris.md) | 自动俄罗斯方块 |
| 超强音 | [超强音](HethereauHobbies/Rhythm.md) | 自动演奏音游，支持选曲与连打 |

## 其它功能

| 任务 | 描述 |
| --- | --- |
| [自动弹琴](others/AutoPiano.md) | 自动演奏钢琴，支持midi谱面。 |
| [抚摸](others/Touch) | 一直摸小动物 |
| [喷泉打卡](FountainCheckin.md) | 去许愿池许个愿吧 |

## 数据收集

::: info 声明
**数据收集**类功能用于收集开发和优化功能的数据，默认情况下不会开启。

该功能不会将数据上传到网络，需要您手动将收集的数据发送给我们。
:::

| 任务 | 用途 | 收集范围 |
| --- | --- | --- |
| [自动驾驶数据集收集](DatasetCollection/AutonomousDrivingDataset) | 自动驾驶功能模型训练 | 游戏画面、操作 |

---

## 更多内容

详细安装与配置说明请查看上游仓库的 [README](https://github.com/1bananachicken/MaaNTE)。

遇到问题？请参考 [问题排查](trouble_shooting-zh_cn.md)。

### 为文档贡献内容

为 GitHub 上的仓库 [MaaNTE-Web](https://github.com/Maa-NTE/MaaNTE-Web/) 提交 PR 即可。

相关资料：[术语表](../translation.md)
