---
title: 功能介紹
dir:
  order: 1
index: true
---

MaaNTE 是《異環（Neverness to Everness）》的自動化工具集，專注於減少重複操作、提升日常遊玩效率。

目前，功能分為下列幾類：

## 日常任務

| 任務 | 功能 | 說明 |
| --- | --- | --- |
| [領取獎勵](Daily/ClaimRewards.md) {rowspan=2} | 領取活躍度獎勵 | 自動領取日常獎勵。 {rowspan=2} |
| 領取環期賞令獎勵 |
| [家具領取](CityTycoon/Furniture.md) | 領取異象家具獎勵 | 依序識別並領取三件已知的家具（倉鼠球、棉棉、破損的木箱） |
| [領取一咖舍收益](CityTycoon/WithdrawMoney.md) | 領取一卡舍收益 | - |

## 實時輔助

| 任務 | 說明 |
| --- | --- |
| [實時輔助](RealTimeAssist/RealTime.md) | 通用的輔助功能，包含自動拾取、跳過劇情、自動傳送等功能。 |
| [音訊閃避](RealTimeAssist/SoundDodge.md) | 基於音訊的自動閃避與反擊 |
| [快速拾取](RealTimeAssist/AutoFScroll.md) | 持續按住 F 並滾動滾輪，實現快速拾取 |

## 都市大亨

| 玩法 | 任務 | 說明 |
| --- | --- | --- |
| 一咖舍 | [領一咖舍收益](CityTycoon/WithdrawMoney.md) | 領取一咖舍收益 |
| 房產 | [家具領取](CityTycoon/Furniture.md) | 領取異象家具獎勵 |

## 都市閒趣

| 玩法 | 任務 | 說明 |
| --- | --- | --- |
| 同城派送 | - | - |
| 車輛賽事 | - | - |
| 店長特供 | [自動做咖啡](HethereauHobbies/MakeCoffee.md) | !!自動錘人!! |
| 雨燕出遊 | - | - |
| 粉爪大劫案 | [粉爪大劫案](HethereauHobbies/PinkPawHeist.md) | 自動刷取粉爪大劫案 |
| 海上釣客 {rowspan=2} | [釣魚任務](HethereauHobbies/Fish.md#task1) | 自動循環執行釣魚：拋竿、等待上鉤、收桿，支援自動賣魚和自動買魚餌。 |
| [釣魚任務（新）](HethereauHobbies/Fish.md#task2) | 自動迴圈執行釣魚，預設會一直循環執行。 |
| 小小麻雀 | - | - |
| 泯除方塊 | [泯除方塊](HethereauHobbies/Tetris.md) | 自動俄羅斯方塊 |
| 超強音 | [超強音](HethereauHobbies/Rhythm.md) | 自動演奏音遊，支援選曲與連打 |

## 其它功能

| 任務 | 說明 |
| --- | --- |
| [自動彈琴](others/AutoPiano.md) | 自動彈奏鋼琴，支援midi譜面。 |
| [撫摸](others/Touch) | 一直摸小動物 |
| [噴泉打卡](FountainCheckin.md) | 去許願池許個願吧 |

## 資料收集

::: info 聲明
**資料收集**類功能用於收集開發和最佳化功能的數據，預設不會開啟。

該功能不會將資料上傳到網絡，需要您手動將收集的資料傳送給我們。
:::

| 任務 | 用途 | 收集範圍 |
| --- | --- | --- |
| [自動駕駛資料集收集](DatasetCollection/AutonomousDrivingDataset) | 自動駕駛功能模型訓練 | 遊戲畫面、操作 |

---

## 更多內容

詳細安裝與設定說明請查看上游倉庫的 [README](https://github.com/1bananachicken/MaaNTE)。

遇到問題？請參考 [問題排查](trouble_shooting-ja_jp.md)。

### 為文檔貢獻內容

提交給 GitHub 上的倉庫 [MaaNTE-Web](https://github.com/Maa-NTE/MaaNTE-Web/) 即可。

相關資料：[術語表](../translation.md)
