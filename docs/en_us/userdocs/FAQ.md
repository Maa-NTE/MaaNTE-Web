---
title: FAQ
description: MaaNTE FAQ covering the MXU interface, configuration tabs, task execution, controllers, and other common issues
head:
  - - meta
    - name: keywords
      content: MaaNTE,FAQ,MXU,configuration,tasks,controller,error,troubleshooting
order: 2
---

This page answers common MaaNTE questions. If you run into problems while using MaaNTE, start with the [troubleshooting guide](trouble_shooting.md).

[[TOC]]

## MXU UI

::: collapse

- What is MXU?

    [MXU](https://github.com/MistEO/MXU), short for MaaFramework Next UI, is a general GUI client based on the [MaaFramework PI V2](https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.3-ProjectInterfaceV2%E5%8D%8F%E8%AE%AE.md) protocol. It provides the ready-to-use graphical interface for this project.

- Why does MaaNTE use MXU?

    Early versions of this project used [MFAAvalonia](https://github.com/MaaXYZ/MFAAvalonia), the GUI bundled with the [MaaFramework project template](https://github.com/MaaXYZ/MaaPracticeBoilerplate). During use, we found that its configuration style, interaction flow, and learning curve were not the best fit for this project. After reviewing projects such as [M9A](https://github.com/MAA1999/M9A) and [MAAEnd](https://github.com/MaaEnd/MaaEnd), the developers decided to switch to MXU.

    For MaaNTE, MXU is easier to configure, more convenient to interact with, better at log management, and does not require a .NET runtime. It still has some limitations, but it is currently the best fit among mainstream MaaFramework GUI clients. You can still manage another GUI yourself if you prefer.
:::

### Configurations and tabs

::: collapse

- What are configurations and tabs?

    MXU displays MaaFramework configurations as tabs so users can choose different configurations for different use cases.

- What is separated between configurations?

    MXU describes configurations as having independent task and device settings.

    In practice, task lists, detailed task options, task enabled states, task expanded states, scheduled execution, connection settings, selected controller, connected window, and real-time screenshot display state are independent between configurations. Items in the Settings page are shared.

- About preset configurations

    Some common configurations are bundled as presets and applied automatically on first launch. If you do not need one, you can close the tab to delete it.

    If you delete a preset by mistake, create a new configuration and select the corresponding preset to add it back.

- About scheduled execution

    In the lower-right corner of a configuration, the schedule feature can run that configuration at a specified time. Schedules are independent between configurations.
:::

### Tasks

::: collapse

- What is a task?

    Each MaaNTE automation feature is an independent task that can be enabled or disabled as needed. Every task corresponds to a specific in-game operation or activity, such as [Claim Rewards](../introduction/Daily/ClaimRewards.md) or [Auto Fishing](../introduction/HethereauHobbies/Fish.md).

    Select the tasks you want in the task list. MaaNTE runs them in list order.

- How are tasks categorized?

    Tasks are mainly grouped by feature type:

    - **Daily tasks**: daily repeated actions such as claiming activity rewards, battle pass rewards, furniture rewards, and The Cafe by Origen earnings.
    - **Real-time assistance**: helpers that run while playing, such as auto pickup, story skipping, auto teleport, audio dodge, and quick pickup.
    - **City Tycoon**: features related to The Cafe by Origen, real estate, and furniture.
    - **Hethereau Hobbies**: automation for activities such as coffee making, fishing, Pink Paws Heist, Tetrominoes, and Super Sound.
    - **Others**: entertainment features and unfinished features such as auto piano, touch, and fountain check-in.
    - **Data collection**: data collection for feature development and optimization. These are disabled by default.

    See [Introduction](../introduction/README.md) for details about each task group.

- What is the task list?

    The task list is the large area on the left side of an MXU tab. It shows all tasks added to that configuration and lets you adjust detailed task options.

- In what order are tasks executed?

    Tasks run **from top to bottom in the task list**. Unchecked tasks are skipped. You can drag the six-dot handle next to a task title to change the order.

- Why are multiple tasks not run at the same time?

    MaaNTE uses image recognition and simulated mouse and keyboard input. Running multiple tasks at once would make their operations interfere with each other, so MaaNTE executes tasks sequentially.

- What is a controller? What are the differences?

    A controller is the MaaFramework component that interacts with the game window. MaaNTE provides three controller modes:

    - **Win32 - Default**: operates in the background when the game window is not focused. You can usually use the computer for other work while tasks run, though mouse focus may occasionally be taken.
    - **Win32 - Front**: directly operates the foreground game window. The game window must stay visible and unobstructed, and the mouse is fully occupied while tasks run.
    - **Win32 - Background**: simulates operations in the background. The game window may be covered but must not be minimized. It moves the window instead of moving the mouse around.

    Choose a controller in the connection settings in the upper-right corner. Each task document also lists supported controller types.

- Why do some tasks require a specific controller?

    Some task operations have problems under certain controllers, so those controllers are restricted. Check each task document for its supported controller list.

    These restrictions are usually related to controller behavior and game-side quirks.

- How can I tell whether a task is running correctly?

    While a task runs, check the MaaNTE log panel for real-time logs. If a task fails or behaves unexpectedly, the log usually contains the relevant error message.

    If a task does not run correctly, follow the [troubleshooting guide](trouble_shooting.md).
:::

## MaaNTE features

::: collapse

- What are MaaNTE's main features?

    MaaNTE covers part of the automatable gameplay in Neverness to Everness. See [Introduction](../introduction/README.md) for the full feature list and detailed task documentation.

- What should I do when a feature has a problem?

    First check [Introduction](../introduction/README.md) and the [troubleshooting guide](trouble_shooting.md). If the problem remains, contact us and report it.

- What is data collection?

    Data collection tasks collect data needed for MaaNTE feature development and optimization, such as training data for autonomous driving. These tasks are **disabled by default**, and collected data is **not uploaded automatically**. You must manually send the data to the developers.

- What game features are supported, and what will be supported later?

    MaaNTE is under active development. Some gameplay is not supported yet. Follow [GitHub Releases](https://github.com/1bananachicken/MaaNTE/releases) for feature updates.

    If you want support for a feature, send feedback through GitHub Issues or the official QQ group.
:::

## MaaNTE online map tool

::: collapse

- What is the MaaNTE online map tool?

    The [MaaNTE online map tool](https://map.maante.org/) is a web map for Neverness to Everness. Compared with other maps, it supports real-time positioning and route sharing.

- How do I use real-time positioning?

    Real-time positioning must be used together with a supported tool, such as MaaNTE. The interface is public, and other tools are welcome to integrate with it.

    See the relevant documentation for how to use it with MaaNTE.
:::
