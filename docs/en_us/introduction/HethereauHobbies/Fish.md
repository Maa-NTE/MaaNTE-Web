---
title: Fishing Quest
---

## Introduction

The automatically perform fishing tasks.Includes both the [old version](#task1) and [new version](#task2) task entry points.

## Fishing Quest (old) {#task1}

Automatically cycles through fishing: casting, waiting for a bite, and reeling in the fish; supports automatic fish selling and automatic bait purchase.

::: info controller

- [x] Desktop - Preset
- [x] Desktop - Frontend
- [x] Desktop - Backend

:::

::: steps

1. Infinite loop

    When enabled, the `loop count` setting will be hidden and ignored.

2. Loop count

    How many rounds of this task will be performed in this execution.

    The content to be filled in must satisfy `^\d+$`, that is, **any number**.

3. Number of fish caught each time

   The recommended number of times to fish per cycle is `99`.

    ::: info For example
    When `the number of cycles` is `5` and `the number of fish caught each time` is `99`, the game will stop after fishing `99*5=495` times.
    :::

4. Automatic fish selling

   After completing a round of fishing, should the operator sell **all the fish in the fish** basket.

5. Automatic fish bait purchase

   Should or not for purchase `99` baits after completing a round of fishing.

6. Fish bait recognition threshold

   The higher the confidence level required for identifying bait images when purchasing fish bait, the stricter the requirements.

   If cannot identify the location of the clicked bait, try lowering this value.
:::

## Fishing Quest（new）{#task2}

The auto fishing will be executed automatically in a loop, and by default it will run continuously.

> [!WARNING]
> There's still no way to directly handle overnight fishing interrupted by the monthly pass. You can try setting up a timed task to continue fishing, but the actual effect cannot be guaranteed.
>
> The fishing function's automatic bait purchase and automatic fish selling functions will take up mouse time.

::: info controller

- [+] Desktop - Preset
- [x] Desktop - Frontend
- [+] Desktop - Backend

:::

::: steps

1. Automatic fish selling

   When should or not for the fish in your inventory be sold automatically when there are **no enough Scale Coins**.

2. Automatic fish bait purchase

   Should or not for purchase `99` fish baits if have **not enough fish bait**.

3. Fish bait recognition threshold

   The higher the confidence level required for identifying bait images when purchasing fish bait, the stricter the requirements.

   - If cannot identify the location of the clicked bait, try lowering this value.
:::
