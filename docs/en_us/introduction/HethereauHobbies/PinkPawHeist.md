---
title: Pink Paws Heist
---

## Introduction

Automatically scraping for Pink Paws Heist.

This task needs to be started next to `Chiz` (make sure there is an interaction button for `Chiz` on the screen).

::: warning

Before performing this task, please make sure to set the `End Task Hotkey` and enable `Global Hotkey` in MaaNTE's settings.

:::

::: tip

Before performing this task, please disable the `Camera Correction` function in the game settings.

:::

::: info controller

- [ ] Desktop - Preset
- [x] Desktop - Frontend
- [ ] Desktop - Backend

:::

::: steps

1. Infinite loop

   When enabled, the task will loop indefinitely until manually stopped. Enabling this setting will hide the `loop count` setting.

   This feature is enabled by default, and we recommend that you enable it as well.

2. Cycle count

    How many times will this task be performed in this execution.

    The content to be filled in must satisfy **any positive number**.

3. Map Scheme

    Choose the appropriate solution.

    Different schemes generally have different requirements for team composition. Please configure the team according to the description. MaaNTE will not change your team composition.

   ::: info Advertence
   Different solutions may be written by different authors, and the specific configuration items may also differ.
   :::

## PLAN

::: info Illustrate
The data below was measured using the recommended team composition and represents its performance only on the developer's device. This data is for reference only and is not guaranteed to perform on all devices or under all conditions.
:::

::: table title="Related data and algorithms" hl-cells="tip:(1,2)(1,4)(1,5)(2,1)(2,3)(3,1)(3,3);success:(1,6)(1,7)(1,8)(1,9)(2,6)(2,7)(2,8)(2,9)(3,6)(3,7)(3,8)(3,9)" max-content

|  | Values |  | Every average return | Total average return | Raw data | $\text{Counttime}$ | Runtime | $\text{Total runtime}$ |
| --- | :---: | --- | :---: | :---: | --- | :---: | --- | :---: |
| Average times return | $\frac{\text{Total time}}{\text{Total rate}}$ | Fons | $\frac{\text{Total Fons}}{\text{Evacuation success rate}}$ | $\frac{\text{Total Fons}}{\text{Total time}}$ | Pass | $\text{Evacuation success rate}$ | Fons | $\text{Total Fons}$ |
| Evacuation success rate | $\frac{\text{Evacuation success rate}}{\text{Total rate}}$ | Paw-Paw Coin | $\frac{\text{Total Paw-Paw Coin}}{\text{Evacuation success rate}}$ | $\frac{\text{Total Paw-Paw Coin}}{\text{Total time}}$ | Fail | $\text{Evacuation fail rate}$ | Paw-Paw Coin | $\text{Total Paw-Paw Coin}$ |

:::

### Plan 1st.

::: table title="Pairing requirements"

| - | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| Requirements | - | - | Mint | - |
| Recommend | Nanally | - | Mint | Sakiri |

:::

This plan is for early feasibility testing and is extremely inefficient; it is not recommended.

::: table title="Related materials" hl-cells="tip:(1,2)(1,4)(1,5)(2,1)(2,3)(3,1)(3,3)"

| | Values | | Every average return | Total average return |
| --- | :---: | --- | :---: | :---: |
| Average times return | - | Fons | - | - |
| Evacuation success rate | 30% | Paw-Paw Coin | 1 | - |

:::

### Plan 2nd.

Need to set the graphics quality to `Performance` and set the FPS to `60` or `120`.

::: table title="Pairing requirements"

| - | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| Requirements | Nanally | - | Sakiri | Skia |
| Recommend | Nanally | Lacrimosa | Sakiri | Skia |

:::

::: table title="Related materials" hl-cells="tip:(1,2)(1,4)(1,5)(2,1)(2,3)(3,1)(3,3)"

|  | Values |  | Every average return | Total average return |
| --- | :---: | --- | :---: | :---: |
| Average times return | - | Fons | - | - |
| Evacuation success rate | 80% | Paw-Paw Coin | - | - |

:::

### Plan 3rd.

::: info Precautions
This solution is in the early internal testing phase, and the data is subject to change at any time.
:::

::: table title="Pairing requirements"

| - | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| Requirements-1 | Sakiri | Skia | Mint | - |
| Recommend-1 | Sakiri | Skia | Mint | Lacrimosa |
| Requirements-2 | - | Hotori | Mint | - |
| Recommend-2 | Sakiri | Hotori | Mint | Lacrimosa |

:::

Need to set the graphics quality to `Performance` and set the FPS to `60` or `120`.

**==Route time fine-tuning==**：Fine-tune only if the measured route still shows a **fixed deviation**. Adjust less if you go too far, and increase if you don't reach the correct path.

::: table title="Relevant data" hl-cells="tip:(1,2)(1,4)(1,5)(2,1)(2,3)(3,1)(3,3);success:(1,6)(1,7)(1,8)(1,9)(2,6)(2,7)(2,8)(2,9)(3,6)(3,7)(3,8)(3,9)" max-content

|  | Values |  | Every average return | Total average return | Raw data | 2026-06-08 | Runtime | $13\text{h}15\text{min}$ |
| --- | :---: | --- | :---: | :---: | --- | :---: | --- | :---: |
| Average times return | $7.79\text{min}$ | Fons | $62030$ | $5306$ | Pass | $68$ | Fons | $4218010$ |
| Evacuation success rate | $66.67\%$ | Paw-Paw Coin | $442$ | $38$ | Fail | $34$ | Paw-Paw Coin | $30085$ |

:::