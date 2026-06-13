---
title: Introduction
dir:
  order: 1
index: true
---

MaaNTE offers a comprehensive automation toolkit for Neverness to Everness, helping you cut down repetitive in-game actions.

Currently, these functions are categorized as follows:

## Daily tasks

| Task | Function | illustrate |
| --- | --- | --- |
| [Claim Rewards](Daily/ClaimRewards.md) {rowspan=2} | 領取活躍度獎勵 | 自動領取日常獎勵。 {rowspan=2} |
| 領取環期賞令獎勵 |
| [Get furniture rewards](CityTycoon/Furniture.md) | 領取異象家具獎勵 | 依序識別並領取三件已知的家具（倉鼠球、棉棉、破損的木箱） |
| [Claim earnings from The Cafe by Origen](CityTycoon/WithdrawMoney.md) | 領取一卡舍收益 | - |

## Real-time assistance

| Task | Function |
| --- | --- |
| [Real-time assistance](RealTimeAssist/RealTime.md) | Accessibility features will continue to run until manually terminated. |
| [Auto Dodge & Counter](RealTimeAssist/SoundDodge.md) | Automatic dodging and counterattack based on audio recognition. |
| [Quick Pickup](RealTimeAssist/AutoFScroll.md) | Once enabled, it will continuously use F + scroll wheel for extremely fast pickup (press and hold F to trigger). |

## City Tycoon

| Task | Function | illustrate |
| --- | --- | --- |
| 一咖舍 | [Claim earnings from The Cafe by Origen](CityTycoon/WithdrawMoney.md) | 領取一咖舍收益 |
| 房產 | [Get furniture rewards](CityTycoon/Furniture.md) | 領取異象家具獎勵 |

## Hethereau Hobbies

| Task | Function | illustrate |
| --- | --- | --- |
| 同城派送 | - | - |
| 車輛賽事 | - | - |
| 店長特供 | [Automatic coffee maker](HethereauHobbies/MakeCoffee.md) | !!Auto attack enemies!! |
| 雨燕出遊 | - | - |
| Pink Paws Heist | [Pink Paws Heist](HethereauHobbies/PinkPawHeist.md) | Automatically scraping for Pink Paws Heist. |
| 海上釣客 {rowspan=2} | [Fishing Quest (old) ](HethereauHobbies/Fish.md#task1) | Automatically cycles through fishing: casting, waiting for a bite, and reeling in the fish; supports automatic fish selling and automatic bait purchase. |
| [Fishing Quest (new) ](HethereauHobbies/Fish.md#task2) | The auto fishing will be executed automatically in a loop, and by default it will run continuously. |
| 小小麻雀 | - | - |
| Tetrominoes | [Tetrominoes](HethereauHobbies/Tetris.md) | Automatically play Tetris. |
| Super Sound | [Super Sound](HethereauHobbies/Rhythm.md) | 自動演奏音遊，支援選曲與連打 |

## Others

| Function | illustrate |
| --- | --- |
| [Auto play piano](others/AutoPiano.md) | Auto play piano, support `.midi` file. |
| [Caress](others/Touch) | Keep touching the small animals. |
| [Go and have a check at wishing pool](FountainCheckin.md) | Go to the wishing pool and make a wish. |

## Data collection

::: info Declaration
The **Data collection** class is used to collect data for development and optimization of features, and is not enabled by default.

This feature does not upload data to the network; you need to manually send the collected data to us.
:::

| Function | application | Collection range |
| --- | --- | --- |
| [Autonomous driving dataset collection](DatasetCollection/AutonomousDrivingDataset) | Autonomous driving function model training | Game graphics and controls |

---

## More content

For detailed installation and setup instructions, please refer to the upstream repository for [README](https://github.com/1bananachicken/MaaNTE) .

Having problems? Please refer to [Trouble shooting](trouble_shooting-en_us.md) .

### Contribute content to the document

Submit to a repository on GitHub : [MaaNTE-Web](https://github.com/Maa-NTE/MaaNTE-Web/) .

Related materials : [X - Translation list](../translation.md)
