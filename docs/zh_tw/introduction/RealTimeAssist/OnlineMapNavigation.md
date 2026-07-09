---
title: 線上地圖即時定位與尋路
---

## 簡介

線上地圖即時定位與尋路會啟動雙向 Navi WebSocket，向線上地圖廣播目前位置與方向，並接收路徑點後依序尋路。

::: info 控制器

- [x] 桌面端-預設
- [x] 桌面端-前台
- [x] 桌面端-後台

:::

::: steps 即時定位與尋路設定

1. 監聽地址

    預設為 `0.0.0.0`，一般情況不需要變更。

2. 監聽連接埠

    即時定位使用的連接埠，與地圖站設定中的連接埠保持一致即可。

3. 抵達容差

    判定已抵達路徑點的容差，一般不需要變更。

4. 取樣間隔

    每次截圖定位之間的最小間隔，最低會限制為 0.05 秒。

    調低會提升定位刷新速度，但也會增加效能占用與穩定性下降的風險。

5. 方向推理後端

    選擇方向模型使用的推理後端，一般情況不需要變更。

6. 除錯模式

    不知道用途時請不要調整。
:::

## 地圖站相關介面

::: warning 注意

本段文檔可能更新不及時。

:::

::: info

地圖站座標已改用遊戲座標。下方文檔尚未完全更新。

:::

線上地圖透過 WebSocket 與導航服務通訊，預設地址為 `ws://127.0.0.1:14514`。地圖站只會在開啟「即時定位」後建立連線，異常斷線時每 2 秒自動重連。

所有訊息都是 UTF-8 編碼的 JSON 文字，每個 WebSocket 文字幀包含一個 JSON 物件。

### 座標系

使用像素座標，原點位於圖片左上角，`pixelX` 向右遞增，`pixelY` 向下遞增。目前使用 `11264 × 11264` 定位座標系。

### 地圖站傳送的訊息

| 訊息類型 | 用途 |
| --- | --- |
| `navi-route-set` | 設定路線（包含路徑點列表），可指定是否立即開始 |
| `navi-route-start` | 開始或繼續目前路線 |
| `navi-route-stop` | 暫停目前路線 |
| `navi-route-clear` | 清空目前路線 |

#### `navi-route-set`

```json
{
  "type": "navi-route-set",
  "sourceWidth": 11264,
  "sourceHeight": 11264,
  "start": true,
  "waypoints": [
    { "pixelX": 5700.125, "pixelY": 8800.5 },
    { "pixelX": 5800, "pixelY": 9000 }
  ]
}
```

| 欄位 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `sourceWidth` | number | 是 | 座標來源寬度 |
| `sourceHeight` | number | 是 | 座標來源高度 |
| `start` | boolean | 是 | `true` 表示設定後立即開始，`false` 表示只設定路線 |
| `waypoints` | array | 是 | 路徑點列表，至少一個元素 |

傳送前會自動移除相鄰重複路徑點，座標最多保留 3 位小數。

其餘三個命令只需要 `type` 欄位，無額外參數。

### 服務端傳送的訊息

| 訊息類型 | 用途 |
| --- | --- |
| `navi-state` | 推送即時位置、朝向與路線狀態 |
| `navi-route-ack` | 確認路線命令並返回路線狀態 |
| `navi-error` | 返回業務錯誤 |

#### `navi-state`

```json
{
  "type": "navi-state",
  "version": 1,
  "position": { "pixelX": 5788, "pixelY": 8902, "sourceWidth": 11264, "sourceHeight": 11264 },
  "angle": 123.4,
  "route": { "status": "running", "currentIndex": 2, "waypoints": [...] }
}
```

| 欄位 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `position` | object/null | 否 | 目前定位；為 `null` 時隱藏定位箭頭 |
| `position.pixelX` | number | 是 | X 像素座標 |
| `position.pixelY` | number | 是 | Y 像素座標 |
| `position.sourceWidth` | number | 建議 | 座標來源寬度；缺失時回退為底圖寬度 |
| `position.sourceHeight` | number | 建議 | 座標來源高度；缺失時回退為底圖高度 |
| `angle` | number/null | 否 | 朝向角度（度） |
| `route` | object/null | 否 | 路線狀態；缺省時保留上次狀態 |

地圖站只處理 `version` 為 `1` 的訊息，未知版本會被忽略。

#### `navi-route-ack`

```json
{
  "type": "navi-route-ack",
  "message": "路線已設定",
  "route": { "status": "running", "currentIndex": 1, "waypoints": [...] }
}
```

`message` 欄位會直接顯示給使用者。`route.status` 建議使用以下值：

| 狀態 | 含義 |
| --- | --- |
| `idle` | 無路線 |
| `ready` | 路線已設定，尚未開始 |
| `running` | 正在導航 |
| `stopped` | 已暫停 |
| `completed` | 已完成 |
| `error` | 執行異常 |

#### `navi-error`

```json
{
  "type": "navi-error",
  "message": "路徑點為空",
  "code": "EMPTY_WAYPOINTS"
}
```

`message` 會顯示給使用者，`code` 是機器可讀錯誤碼（目前地圖站不讀取）。

### 典型互動流程

```text
地圖站 → 服務端：navi-route-set（設定路線並開始）
服務端 → 地圖站：navi-route-ack（status = running）
服務端 → 地圖站：navi-state（持續推送位置與路線進度）
地圖站 → 服務端：navi-route-stop
服務端 → 地圖站：navi-route-ack（status = stopped）
地圖站 → 服務端：navi-route-start
服務端 → 地圖站：navi-route-ack（status = running）
地圖站 → 服務端：navi-route-clear
服務端 → 地圖站：navi-route-ack（status = idle）
```

服務端應忽略無法識別的附加欄位。地圖站會忽略無法解析的 JSON 和未知訊息類型，不會主動關閉連線。

## 第三方位置資訊介面

`nte_coordinate_api` 提供被動讀取 NTE 角色世界座標的介面，可用於基於外部座標的導航方案。接入方透過監聽網路流量取得原始三維座標，不需要依賴 MaaNTE 內建截圖定位。

### 匯入

```python
from nte_coordinate_api import CoordinateCapture
```

模組只公開 `CoordinateCapture` 一個類別。

### `CoordinateCapture`

```python
CoordinateCapture(
    interface: str | None = None,
    packet_filter: str = "tcp port 30031 or udp",
)
```

建立座標擷取實例。建構實例不會啟動擷取，需要隨後呼叫 `start()`。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `interface` | `str \| None` | `None` | 擷取封包的網卡名稱。傳入 `None` 使用系統預設網卡；傳入字串則使用指定網卡。網卡名稱無效時 `start()` 可能拋出例外。 |
| `packet_filter` | `str` | `"tcp port 30031 or udp"` | BPF 過濾表達式。過濾範圍越大，傳入座標解析器的封包越多。除非明確知道遊戲使用的協議和連接埠，否則建議保留預設值。 |

```python
capture = CoordinateCapture(interface="Ethernet")
capture = CoordinateCapture(packet_filter="udp")
```

### 方法

#### `start()`

```python
start() -> None
```

啟動背景網路擷取。呼叫成功後，實例會持續解析網路資料並保存最近一次有效的角色世界座標。

- 非阻塞，可重複呼叫；
- 已啟動時再次呼叫不會建立新的擷取執行緒；
- 擷取會在背景執行，直到呼叫 `close()` 前都會持續更新座標。

可能拋出的例外：

| 例外 | 說明 |
| --- | --- |
| `RuntimeError` | 缺少必要的 Python 擷取封包依賴。 |
| `OSError` | 網卡、擷取封包驅動或 BPF 過濾器初始化失敗。 |
| 其他底層例外 | 由網路擷取實作拋出。 |

建議在業務入口捕獲例外：

```python
try:
    capture.start()
except Exception as exc:
    logger.error("無法啟動座標擷取：%s", exc)
```

#### `read()`

```python
read(
    max_age: float = 1.0,
) -> tuple[float, float, float] | None
```

返回最近一次有效座標。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `max_age` | `float` | `1.0` | 允許返回的座標最大快取時間（秒）。最近一次座標的擷取時間距今不超過該值時返回座標，否則返回 `None`。傳入 `0` 或負數通常不會返回快取座標。 |

常見 `max_age` 取值：

| 值 | 用途 |
| --- | --- |
| `0.2` | 對座標即時性要求較高。 |
| `1.0` | 預設值，適合一般導航。 |
| `2.0` | 容忍較短的網路資料間隔。 |

返回值：有有效座標時返回 `(x, y, z)`，三個值皆為 `float`。

| 索引 | 名稱 | 說明 |
| --- | --- | --- |
| `0` | `x` | 原始世界座標 X。 |
| `1` | `y` | 原始世界座標 Y。 |
| `2` | `z` | 原始世界座標 Z，通常表示高度。 |

這些值是遊戲網路資料中的原始三維座標。API 不會對座標進行平移、旋轉、縮放、投影或地圖標定。

以下情況返回 `None`：

- 尚未呼叫 `start()`；
- 啟動後尚未收到有效座標；
- 最近一次座標超過 `max_age`；
- 角色傳送或切換實例時移動資料暫時中斷；
- 網路流發生變化，新的移動流尚未確認；
- 目前資料包中沒有可識別的座標。

`read()` 是非阻塞方法。返回 `None` 不代表實例已停止，也不一定表示發生錯誤。

```python
coordinate = capture.read(max_age=0.5)

if coordinate is None:
    return

x, y, z = coordinate
```

#### `close()`

```python
close() -> None
```

停止背景擷取並釋放相關資源。

- 可重複呼叫，未啟動時呼叫也是安全的；
- 已啟動時會停止並等待背景擷取結束；
- 呼叫後實例不再接收新的座標。

`close()` 不會主動清除最近一次快取座標，在快取過期前呼叫 `read()` 仍可能取得關閉前的最後一筆座標。

應使用 `try/finally` 確保資源被釋放：

```python
capture = CoordinateCapture()

try:
    capture.start()
    # 使用座標
finally:
    capture.close()
```

### 完整範例

```python
import time

from nte_coordinate_api import CoordinateCapture


capture = CoordinateCapture(
    interface=None,
    packet_filter="tcp port 30031 or udp",
)

try:
    capture.start()

    while True:
        coordinate = capture.read(max_age=1.0)
        if coordinate is not None:
            x, y, z = coordinate
            print(f"x={x:.2f}, y={y:.2f}, z={z:.2f}")

        time.sleep(0.1)
finally:
    capture.close()
```

### 狀態與生命週期

實例沒有公開狀態屬性。呼叫方應根據方法結果判斷目前狀態：

| 操作結果 | 含義 |
| --- | --- |
| `start()` 正常返回 | 背景擷取已啟動，或此前已經啟動。 |
| `start()` 拋出例外 | 擷取未能正常啟動。 |
| `read()` 返回座標 | 目前存在未過期的有效座標。 |
| `read()` 返回 `None` | 目前沒有滿足即時性要求的有效座標。 |
| `close()` 正常返回 | 擷取資源已經釋放。 |

建議生命週期：

```text
建立實例 → start() → 多次 read() → close()
```

### 執行緒安全

- 背景擷取執行緒負責更新最新座標；
- `read()` 可以從其他執行緒呼叫；
- 對最新座標的讀取與更新具有同步保護；
- 不建議多個執行緒同時呼叫 `start()` 或 `close()`；
- 一個實例只應由一個業務元件管理生命週期。

### 座標連續性

正常移動時，座標會隨角色位置持續更新。

以下操作可能導致短暫返回 `None`：

- 傳送；
- 切換地圖或實例；
- 切換角色；
- 網路重連；
- 遊戲移動時間戳重置；
- 遊戲切換到新的網路流。

介面會嘗試重新識別有效移動流。呼叫方不應因一次 `None` 就立即銷毀並重建實例，而應根據業務需要等待後續座標恢復。

### 使用限制

- 此介面只讀取網路流量，不傳送或修改封包；
- 呼叫方需要具備存取指定網卡的系統權限；
- 系統需要提供可用的擷取封包驅動；
- 返回的是原始世界座標，不保證能直接對應任何地圖像素座標系；
- 座標轉換與標定應由呼叫方實作。
