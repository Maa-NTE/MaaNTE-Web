---
title: 開發指南
dir:
  order: 2
index: true
---

# MaaNTE 開發者文檔

本目錄包含 MaaNTE 專案的完整開發者文件。

## 閱讀路線

建議按以下順序閱讀：

1. 搭環境、跑起來、完成第一次改變和 PR → `getting-started.md`
2. 了解 Pipeline 編寫規格 → `pipeline-guide.md`
3. 查閱編碼規格 → `coding-standards.md`
4. 需要寫 Python 自訂邏輯 → `custom-action.md`
5. 理解場景跳轉機制 → `scene-manager.md`
6. 需要偵錯單節點 → `node-testing.md`

## 文件索引

### Tier 1 — 快速上手

| 文檔 | 說明 |
|------|------|
| [快速開始](./getting-started.md) | 以真實案例（#223 → #231）走一遍完整開發流程 |

### Tier 2 — 參考手冊

| 文檔 | 說明 |
|------|------|
| [自訂動作開發](./custom-action.md) | Python CustomAction 編寫、Controller API、Pipeline 整合 |
| [節點測試](./node-testing.md) | 如何撰寫和執行節點測試，驗證識別是否穩定命中 |
| [DMCA / Abuse 提報範本](./dmca-abuse-template.md) | 仿冒/搬運/毒品倉庫的一鍵複用提報文案（AGPL-3.0） |
| [DeepWiki — MaaNTE](https://deepwiki.com/1bananachicken/MaaNTE) | 帶 AI 的線上專案文件快速瀏覽 |
| [Pipeline 協議](https://maafw.com/docs/3.1-PipelineProtocol/) | MaaFramework 官方 Pipeline 協議全文 |

### Tier 3 — 規範與約束

| 文檔 | 說明 |
|------|------|
| [編碼規格](./coding-standards.md) | Pipeline / Python 編碼規則、提交前檢查、常見坑 |

## Pipeline 基礎元件

日常開發最常用的可重複使用節點，建議所有 Pipeline 開發者查詢以便重複使用。

| 文檔 | 說明 | 路徑 |
|------|------|------|
| [場景管理器](./scene-manager.md) | 從任意介面自動導覽至目標場景 | `Interface/Scene/` |
| [InScene 場景辨識](./in-scene.md) | 判斷目前畫面所在場景 | `Interface/Scene/Status.json` |
| [通用按鈕](./common-buttons.md) | 各場景入口按鈕 | `Common/Button/` |
| [Custom 動作與辨識](./custom-action.md) | 通用 Python 工具：alt_click等 | `agent/custom/action/Common/` |

## 進階組件參考

按需查閱。僅在使用對應組件時需閱讀。

| 文檔 | 說明 |
|------|------|
| 自動戰鬥 | ⚠ 開發中 |
| 自動導航 | ⚠ 開發中 |

## 任務維護文檔

僅在維護對應任務時需要閱讀。

| 文檔 | 說明 |
|------|------|
| 待補充 | 待補充 |

## 快速跳轉

| 我想做什麼 | 該看哪裡 |
|-----------|---------|
| 第一次參與，從零開始 | [getting-started.md](./getting-started.md) |
| 改 Pipeline 節點 | [pipeline-guide.md](./pipeline-guide.md) |
| 寫 Python 自訂邏輯 | [custom-action.md](./custom-action.md) |
| 場景跳轉/介面導航 | [scene-manager.md](./scene-manager.md) |
| 偵錯單一節點 | [node-testing.md](./node-testing.md) |
| 查閱編碼規格 | [coding-standards.md](./coding-standards.md) |

## 參考

- [MaaFramework 文件](https://maafw.com/docs/1.1-QuickStarted)

## 交流

開發QQ群：1092630280