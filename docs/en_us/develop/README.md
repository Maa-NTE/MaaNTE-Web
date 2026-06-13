---
title: Development Guide
dir:
  order: 2
index: true
---

# MaaNTE Developer documentation

This directory contains the complete developer documentation for the MaaNTE project.

## Reading route

We recommend reading in the following order:

1. Create the environment, start it up, and complete the first change. PR → `getting-started.md`
2. Understand Pipeline Writing Specifications → `pipeline-guide.md`
3. View coding specifications → `coding-standards.md`
4. Need to write Python custom logic → `custom-action.md`
5. Understanding Scene Jump Mechanisms → `scene-manager.md`
6. Requires debugging of a single node. → `node-testing.md`

## File Index

### Tier 1 — Get started quickly

| Document | Instruction |
|------|------|
| [Quick Start](./getting-started.md) | Walk through the complete development process using real-world examples (#223 → #231) |

### Tier 2 — Reference Manual

| Document | Instruction |
|------|------|
| [Custom motion development](./custom-action.md) | Python CustomAction writing, Controller API, and Pipeline integration |
| [Node testing](./node-testing.md) | How to write and execute node tests to verify whether the identification is stable and hit-through. |
| [DMCA / Abuse Submission Template](./dmca-abuse-template.md) | One-click reusable reporting text for counterfeit/drug trafficking warehouses（AGPL-3.0） |
| [DeepWiki — MaaNTE](https://deepwiki.com/1bananachicken/MaaNTE) | Quickly view online project documents with AI. |
| [Pipeline Agreement](https://maafw.com/docs/3.1-PipelineProtocol/) |MaaFramework Official Pipeline Protocol Full Text |

### Tier 3 — Regulations and constraints

| Document | Instruction |
|------|------|
| [Coding Standards](./coding-standards.md) | Pipeline / Python Coding rules, pre-submission checks, common pitfalls |

## Pipeline Basic components

All Pipeline developers should query the most frequently used reusable nodes in their daily development for reuse.

| Document | Instruction | Path |
|------|------|------|
| [Scene Manager](./scene-manager.md) | Automatic navigation to the target scene from any interface | `Interface/Scene/` |
| [InScene scene recognition](./in-scene.md) | Determine the current scene in the video | `Interface/Scene/Status.json` |
| [Universal Button](./common-buttons.md) | Entrance buttons for each scene | `Common/Button/` |
| [Custom actions and recognition](./custom-action.md) | General Python tools: alt_click, etc. | `agent/custom/action/Common/` |

## Advanced Components Reference

Read as needed. Only read when using the corresponding component.

| Document | Instruction |
|------|------|
| Automatic battle | ⚠ Under development |
| Automatic navigation | ⚠ Under development |

## Task maintenance document

Reading is only required when performing the corresponding task.

| Document | Instruction |
|------|------|
| 待補充 | 待補充 |

## Quick jump

| What I want to do ? | Where should I look ? |
|-----------|---------|
| First time participating, starting from scratch. | [getting-started.md](./getting-started.md) |
| Modify Pipeline Nodes | [pipeline-guide.md](./pipeline-guide.md) |
| Writing Python Custom Logic | [custom-action.md](./custom-action.md) |
| Scene navigation/interface navigation | [scene-manager.md](./scene-manager.md) |
| Detect a single node | [node-testing.md](./node-testing.md) |
| View coding specifications | [coding-standards.md](./coding-standards.md) |

## Refer to

- [MaaFramework files](https://maafw.com/docs/1.1-QuickStarted)

## Communication

Join the developer QQ group：1092630280