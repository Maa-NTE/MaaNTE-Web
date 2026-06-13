---
title: Auto play piano
---

## Introduction

Read the MIDI score and send keyboard playing to the current target window.

::: info controller

- [x] Desktop - Preset
- [x] Desktop - Frontend
- [x] Desktop - Backend

:::

MIDI score

::: steps

1. MIDI score Custom Path

    Relative paths will be resolved from the project root directory, for example, `songs/example.mid`; absolute paths can also be entered.
    
      - For example: if the file is located in `C:\Users\download\` and the file name (including the extension) is `song.mid` (`song.midi`), paste the full path (e.g., `C:\Users\download\song.mid`) into the output directory.

2. Playing speed

   When selecting the playback speed, the default speed is `1.0`. Can manually enter the speed multiplier to adjust it, but once changed, it cannot be changed during execution.

3. modulation

   When selecting a key, the default key is `0`. To raise the key by a minor semitone, type `+1`. To raise the key by a major semitone, type `+12`. (The same applies to lowering the key.)
:::
