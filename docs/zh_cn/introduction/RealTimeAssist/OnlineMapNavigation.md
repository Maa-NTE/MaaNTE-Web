---
title: 在线地图实时定位&寻路
---

## 简介

在线地图实时定位&寻路。

启动双向 Navi WebSocket，向在线地图广播实时位置和方向，并接收路径点按顺序寻路。

::: info 控制器

- [x] 桌面端-默认
- [x] 桌面端-前台
- [x] 桌面端-后台

:::

::: steps 实时定位&寻路设置

1. 监听地址

    默认为`0.0.0.0`，一般情况下不要更改。

2. 监听端口

    实时定位使用的端口，与地图站设置中的端口保持一致即可。

3. 到达容差

    到达容差，一般不需要更改。

4. 采样间隔

    每次截图定位之间的最小间隔，最低会限制为 0.05 秒。

    调低会增加定位的刷新速度，但是会导致性能占用增加、稳定性下降的风险。

5. 方向推理后端

    选择方向模型使用的推理后端，一般情况下不需要更改。

6. 调试模式

    不知道是什么就不要动。
:::

## 地图站相关接口

::: warning 注意

此部分文档可能更新不及时。

:::

::: info

地图站坐标已改用游戏坐标。下面的文档并没有更新。

:::

在线地图通过 WebSocket 与导航服务通信，默认地址为 `ws://127.0.0.1:14514`。地图站仅在开启"实时定位"后建立连接，异常断开时每 2 秒自动重连。

所有消息均为 UTF-8 编码的 JSON 文本，每个 WebSocket 文本帧包含一个 JSON 对象。

### 坐标系

使用像素坐标，原点位于图片左上角，`pixelX` 向右递增，`pixelY` 向下递增。当前使用 `11264 × 11264` 定位坐标系。

### 地图站发送的消息

| 消息类型 | 用途 |
| --- | --- |
| `navi-route-set` | 设置路线（含路径点列表），可指定是否立即开始 |
| `navi-route-start` | 开始或继续当前路线 |
| `navi-route-stop` | 暂停当前路线 |
| `navi-route-clear` | 清空当前路线 |

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

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sourceWidth` | number | 是 | 坐标源宽度 |
| `sourceHeight` | number | 是 | 坐标源高度 |
| `start` | boolean | 是 | `true` 设置后立即开始，`false` 仅设置路线 |
| `waypoints` | array | 是 | 路径点列表，至少一个元素 |

发送前会自动移除相邻重复路径点，坐标最多保留 3 位小数。

其余三个命令仅需 `type` 字段，无额外参数。

### 服务端发送的消息

| 消息类型 | 用途 |
| --- | --- |
| `navi-state` | 推送实时位置、朝向和路线状态 |
| `navi-route-ack` | 确认路线命令并返回路线状态 |
| `navi-error` | 返回业务错误 |

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

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `position` | object/null | 否 | 当前定位；为 `null` 时隐藏定位箭头 |
| `position.pixelX` | number | 是 | X 像素坐标 |
| `position.pixelY` | number | 是 | Y 像素坐标 |
| `position.sourceWidth` | number | 建议 | 坐标源宽度；缺失时回退为底图宽度 |
| `position.sourceHeight` | number | 建议 | 坐标源高度；缺失时回退为底图高度 |
| `angle` | number/null | 否 | 朝向角度（度） |
| `route` | object/null | 否 | 路线状态；缺省时保留上次状态 |

地图站仅处理 `version` 为 `1` 的消息，未知版本将被忽略。

#### `navi-route-ack`

```json
{
  "type": "navi-route-ack",
  "message": "路线已设置",
  "route": { "status": "running", "currentIndex": 1, "waypoints": [...] }
}
```

`message` 字段会直接展示给用户。`route.status` 建议使用以下值：

| 状态 | 含义 |
| --- | --- |
| `idle` | 无路线 |
| `ready` | 路线已设置，未开始 |
| `running` | 正在导航 |
| `stopped` | 已暂停 |
| `completed` | 已完成 |
| `error` | 执行异常 |

#### `navi-error`

```json
{
  "type": "navi-error",
  "message": "路径点为空",
  "code": "EMPTY_WAYPOINTS"
}
```

`message` 会展示给用户，`code` 为机器可读错误码（当前地图站不读取）。

### 典型交互流程

```text
地图站 → 服务端：navi-route-set（设置路线并开始）
服务端 → 地图站：navi-route-ack（status = running）
服务端 → 地图站：navi-state（持续推送位置和路线进度）
地图站 → 服务端：navi-route-stop
服务端 → 地图站：navi-route-ack（status = stopped）
地图站 → 服务端：navi-route-start
服务端 → 地图站：navi-route-ack（status = running）
地图站 → 服务端：navi-route-clear
服务端 → 地图站：navi-route-ack（status = idle）
```

服务端应忽略无法识别的附加字段，地图站会忽略无法解析的 JSON 和未知消息类型，不会主动关闭连接。

## 第三方位置信息接口

`nte_coordinate_api` 提供被动读取 NTE 角色世界坐标的接口，可用于基于外部坐标的导航方案。接入方通过监听网络流量获取原始三维坐标，无需依赖 MaaNTE 内置的截图定位。

### 导入

```python
from nte_coordinate_api import CoordinateCapture
```

模块仅公开 `CoordinateCapture` 一个类。

### `CoordinateCapture`

```python
CoordinateCapture(
    interface: str | None = None,
    packet_filter: str = "tcp port 30031 or udp",
)
```

创建一个坐标捕获实例。构造实例不会启动捕获，需要随后调用 `start()`。

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `interface` | `str \| None` | `None` | 抓包网卡名称。传入 `None` 使用系统默认网卡；传入字符串使用对应网卡。网卡名称无效时 `start()` 可能抛出异常。 |
| `packet_filter` | `str` | `"tcp port 30031 or udp"` | BPF 过滤表达式。过滤范围越大，传入坐标解析器的数据包越多。除非明确知道游戏使用的协议和端口，否则建议保留默认值。 |

```python
capture = CoordinateCapture(interface="Ethernet")
capture = CoordinateCapture(packet_filter="udp")
```

### 方法

#### `start()`

```python
start() -> None
```

启动后台网络捕获。调用成功后，实例会持续解析网络数据，并保存最近一次有效的角色世界坐标。

- 非阻塞，可重复调用；
- 已启动时再次调用不会创建新的捕获线程；
- 捕获在后台运行，调用 `close()` 前持续更新坐标。

可能抛出的异常：

| 异常 | 说明 |
| --- | --- |
| `RuntimeError` | 缺少必要的 Python 抓包依赖。 |
| `OSError` | 网卡、抓包驱动或 BPF 过滤器初始化失败。 |
| 其他底层异常 | 由网络捕获实现抛出。 |

建议在业务入口捕获异常：

```python
try:
    capture.start()
except Exception as exc:
    logger.error("无法启动坐标捕获：%s", exc)
```

#### `read()`

```python
read(
    max_age: float = 1.0,
) -> tuple[float, float, float] | None
```

返回最近一次有效坐标。

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `max_age` | `float` | `1.0` | 允许返回的坐标最大缓存时间（秒）。最近一次坐标的捕获时间距今不超过该值时返回坐标，否则返回 `None`。传入 `0` 或负数通常不会返回缓存坐标。 |

常见 `max_age` 取值：

| 值 | 用途 |
| --- | --- |
| `0.2` | 对坐标实时性要求较高。 |
| `1.0` | 默认值，适合一般导航。 |
| `2.0` | 容忍较短的网络数据间隔。 |

返回值：有有效坐标时返回 `(x, y, z)`，均为 `float` 类型。

| 索引 | 名称 | 说明 |
| --- | --- | --- |
| `0` | `x` | 原始世界坐标 X。 |
| `1` | `y` | 原始世界坐标 Y。 |
| `2` | `z` | 原始世界坐标 Z，通常表示高度。 |

这些值是游戏网络数据中的原始三维坐标。API 不会对坐标进行平移、旋转、缩放、投影或地图标定。

以下情况返回 `None`：

- 尚未调用 `start()`；
- 启动后尚未收到有效坐标；
- 最近一次坐标超过 `max_age`；
- 角色传送或切换实例时移动数据暂时中断；
- 网络流发生变化，新的移动流尚未确认；
- 当前数据包中没有可识别的坐标。

`read()` 是非阻塞方法。返回 `None` 不代表实例已停止，也不一定代表发生错误。

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

停止后台捕获并释放相关资源。

- 可重复调用，未启动时调用是安全的；
- 已启动时会停止并等待后台捕获结束；
- 调用后实例不再接收新的坐标。

`close()` 不会主动清除最近一次缓存坐标，在缓存过期前调用 `read()` 仍可能取得关闭前的最后一个坐标。

应使用 `try/finally` 确保资源被释放：

```python
capture = CoordinateCapture()

try:
    capture.start()
    # 使用坐标
finally:
    capture.close()
```

### 完整示例

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

### 状态与生命周期

实例没有公开状态属性。调用方应根据方法结果判断当前状态：

| 操作结果 | 含义 |
| --- | --- |
| `start()` 正常返回 | 后台捕获已启动或此前已经启动。 |
| `start()` 抛出异常 | 捕获未能正常启动。 |
| `read()` 返回坐标 | 当前存在未过期的有效坐标。 |
| `read()` 返回 `None` | 当前没有满足实时性要求的有效坐标。 |
| `close()` 正常返回 | 捕获资源已经释放。 |

推荐生命周期：

```text
创建实例 → start() → 多次 read() → close()
```

### 线程安全

- 后台捕获线程负责更新最新坐标；
- `read()` 可以从其他线程调用；
- 对最新坐标的读取和更新具有同步保护；
- 不建议多个线程同时调用 `start()` 或 `close()`；
- 一个实例只应由一个业务组件管理生命周期。

### 坐标连续性

正常移动时，坐标会随角色位置持续更新。

以下操作可能导致短暂返回 `None`：

- 传送；
- 切换地图或实例；
- 切换角色；
- 网络重连；
- 游戏移动时间戳重置；
- 游戏切换到新的网络流。

接口会尝试重新识别有效移动流。调用方不应因为一次 `None` 立即销毁并重建实例，而应根据业务需要等待后续坐标恢复。

### 使用限制

- 该接口只读取网络流量，不发送或修改数据包；
- 调用方需要具备访问指定网卡的系统权限；
- 系统需要提供可用的抓包驱动；
- 返回的是原始世界坐标，不保证与任何地图像素坐标系直接一致；
- 坐标转换和标定应由调用方实现。
