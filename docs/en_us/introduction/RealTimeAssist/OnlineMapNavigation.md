---
title: Online Map Real-time Positioning and Navigation
---

## Overview

Online map real-time positioning and navigation starts a bidirectional Navi WebSocket. It broadcasts the current position and direction to the online map, receives route waypoints, and navigates through them in order.

::: info Controller

- [x] Win32 - Default
- [x] Win32 - Front
- [x] Win32 - Background

:::

::: steps Real-time positioning and navigation settings

1. Listen address

    Defaults to `0.0.0.0`. In most cases, do not change it.

2. Listen port

    The port used for real-time positioning. Keep it the same as the port configured on the map site.

3. Arrival tolerance

    The tolerance used to decide whether a waypoint has been reached. Usually no change is needed.

4. Sampling interval

    The minimum interval between screenshot-based positioning samples. The minimum is limited to 0.05 seconds.

    Lower values increase refresh speed but also increase performance cost and instability risk.

5. Direction inference backend

    Selects the inference backend used by the direction model. Usually no change is needed.

6. Debug mode

    Do not change this if you do not know what it does.
:::

## Map Site Interface

::: warning Note

This section may not always be up to date.

:::

::: info

The map site has switched to game coordinates. The documentation below has not been fully updated.

:::

The online map communicates with the navigation service through WebSocket. The default address is `ws://127.0.0.1:14514`. The map site only connects after "Real-time positioning" is enabled, and automatically reconnects every 2 seconds after an abnormal disconnection.

All messages are UTF-8 encoded JSON text. Each WebSocket text frame contains one JSON object.

### Coordinate System

The coordinate system uses pixel coordinates. The origin is the top-left corner of the image, `pixelX` increases to the right, and `pixelY` increases downward. The current positioning coordinate system is `11264 × 11264`.

### Messages Sent by the Map Site

| Message type | Purpose |
| --- | --- |
| `navi-route-set` | Set a route with waypoints and optionally start it immediately |
| `navi-route-start` | Start or resume the current route |
| `navi-route-stop` | Pause the current route |
| `navi-route-clear` | Clear the current route |

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

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `sourceWidth` | number | Yes | Coordinate source width |
| `sourceHeight` | number | Yes | Coordinate source height |
| `start` | boolean | Yes | `true` starts immediately after setting the route; `false` only stores the route |
| `waypoints` | array | Yes | Waypoint list, with at least one item |

Adjacent duplicate waypoints are removed automatically before sending. Coordinates are kept to at most 3 decimal places.

The other three commands only need the `type` field and have no additional parameters.

### Messages Sent by the Server

| Message type | Purpose |
| --- | --- |
| `navi-state` | Push real-time position, direction, and route status |
| `navi-route-ack` | Acknowledge a route command and return route status |
| `navi-error` | Return a business-level error |

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

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `position` | object/null | No | Current position; `null` hides the position arrow |
| `position.pixelX` | number | Yes | X pixel coordinate |
| `position.pixelY` | number | Yes | Y pixel coordinate |
| `position.sourceWidth` | number | Recommended | Coordinate source width; falls back to map image width if missing |
| `position.sourceHeight` | number | Recommended | Coordinate source height; falls back to map image height if missing |
| `angle` | number/null | No | Direction angle in degrees |
| `route` | object/null | No | Route status; if omitted, the previous status is kept |

The map site only processes messages with `version` set to `1`. Unknown versions are ignored.

#### `navi-route-ack`

```json
{
  "type": "navi-route-ack",
  "message": "Route set",
  "route": { "status": "running", "currentIndex": 1, "waypoints": [...] }
}
```

The `message` field is shown directly to the user. Recommended `route.status` values:

| Status | Meaning |
| --- | --- |
| `idle` | No route |
| `ready` | Route is set but not started |
| `running` | Navigation is running |
| `stopped` | Navigation is paused |
| `completed` | Navigation is complete |
| `error` | Execution error |

#### `navi-error`

```json
{
  "type": "navi-error",
  "message": "Waypoint list is empty",
  "code": "EMPTY_WAYPOINTS"
}
```

`message` is shown to the user. `code` is a machine-readable error code; the map site does not currently read it.

### Typical Interaction Flow

```text
Map site -> Server: navi-route-set (set and start route)
Server -> Map site: navi-route-ack (status = running)
Server -> Map site: navi-state (continuously push position and route progress)
Map site -> Server: navi-route-stop
Server -> Map site: navi-route-ack (status = stopped)
Map site -> Server: navi-route-start
Server -> Map site: navi-route-ack (status = running)
Map site -> Server: navi-route-clear
Server -> Map site: navi-route-ack (status = idle)
```

The server should ignore unrecognized extra fields. The map site ignores JSON it cannot parse and unknown message types, and it will not actively close the connection for those cases.

## Third-party Position Interface

`nte_coordinate_api` provides a passive interface for reading NTE character world coordinates. It can be used for navigation solutions based on external coordinates. Integrations obtain raw 3D coordinates by listening to network traffic and do not need to rely on MaaNTE's built-in screenshot positioning.

### Import

```python
from nte_coordinate_api import CoordinateCapture
```

The module only exposes the `CoordinateCapture` class.

### `CoordinateCapture`

```python
CoordinateCapture(
    interface: str | None = None,
    packet_filter: str = "tcp port 30031 or udp",
)
```

Creates a coordinate capture instance. Creating the instance does not start capture; call `start()` afterwards.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `interface` | `str \| None` | `None` | Network interface name for packet capture. Pass `None` to use the system default interface, or pass a string to use a specific interface. An invalid interface may cause `start()` to raise an exception. |
| `packet_filter` | `str` | `"tcp port 30031 or udp"` | BPF filter expression. A broader filter sends more packets into the coordinate parser. Keep the default unless you know the game's protocol and ports. |

```python
capture = CoordinateCapture(interface="Ethernet")
capture = CoordinateCapture(packet_filter="udp")
```

### Methods

#### `start()`

```python
start() -> None
```

Starts background network capture. After a successful call, the instance continuously parses network data and stores the latest valid character world coordinate.

- Non-blocking and safe to call repeatedly.
- Calling it again after startup does not create another capture thread.
- Capture runs in the background and keeps updating coordinates until `close()` is called.

Possible exceptions:

| Exception | Description |
| --- | --- |
| `RuntimeError` | Required Python packet-capture dependencies are missing. |
| `OSError` | Network interface, capture driver, or BPF filter initialization failed. |
| Other lower-level exceptions | Raised by the network capture implementation. |

Catch startup errors at the business entry point:

```python
try:
    capture.start()
except Exception as exc:
    logger.error("Failed to start coordinate capture: %s", exc)
```

#### `read()`

```python
read(
    max_age: float = 1.0,
) -> tuple[float, float, float] | None
```

Returns the latest valid coordinate.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `max_age` | `float` | `1.0` | Maximum allowed coordinate cache age in seconds. If the latest coordinate was captured within this age, it is returned; otherwise `None` is returned. Passing `0` or a negative value usually prevents cached coordinates from being returned. |

Common `max_age` values:

| Value | Use case |
| --- | --- |
| `0.2` | Higher real-time requirements |
| `1.0` | Default, suitable for normal navigation |
| `2.0` | Tolerates short gaps in network data |

When a valid coordinate exists, the return value is `(x, y, z)`, all `float`.

| Index | Name | Description |
| --- | --- | --- |
| `0` | `x` | Raw world coordinate X |
| `1` | `y` | Raw world coordinate Y |
| `2` | `z` | Raw world coordinate Z, usually height |

These values are raw 3D coordinates from game network data. The API does not translate, rotate, scale, project, or calibrate them to any map.

`None` may be returned in the following cases:

- `start()` has not been called.
- No valid coordinate has been received after startup.
- The latest coordinate is older than `max_age`.
- Movement data is temporarily interrupted during teleporting or instance changes.
- The network stream changes and the new movement stream has not been confirmed.
- The current packet contains no recognizable coordinate.

`read()` is non-blocking. Returning `None` does not mean the instance has stopped and does not necessarily mean an error occurred.

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

Stops background capture and releases related resources.

- Safe to call repeatedly, even before startup.
- Stops and waits for background capture when already running.
- After it is called, the instance no longer receives new coordinates.

`close()` does not proactively clear the latest cached coordinate. Before the cache expires, `read()` may still return the last coordinate captured before closing.

Use `try/finally` to ensure resources are released:

```python
capture = CoordinateCapture()

try:
    capture.start()
    # use coordinates
finally:
    capture.close()
```

### Complete Example

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

### Status and Lifecycle

The instance has no public status property. Callers should determine its current status from method results:

| Operation result | Meaning |
| --- | --- |
| `start()` returns normally | Background capture has started or was already started. |
| `start()` raises an exception | Capture failed to start. |
| `read()` returns coordinates | A valid, unexpired coordinate is currently available. |
| `read()` returns `None` | No valid coordinate satisfying the real-time requirement is currently available. |
| `close()` returns normally | Capture resources have been released. |

The recommended lifecycle is:

```text
create instance -> start() -> read() repeatedly -> close()
```

### Thread Safety

- The background capture thread updates the latest coordinate.
- `read()` can be called from other threads.
- Reading and updating the latest coordinate are synchronized.
- Calling `start()` or `close()` from multiple threads at the same time is not recommended.
- One instance should have its lifecycle managed by a single business component.

### Coordinate Continuity

During normal movement, coordinates continue to update with the character's position.

The following operations may cause `read()` to briefly return `None`:

- Teleporting.
- Switching maps or instances.
- Switching characters.
- Network reconnection.
- Game movement timestamp reset.
- The game switching to a new network stream.

The interface tries to rediscover a valid movement stream. Callers should wait for recovery according to their own business needs instead of destroying and recreating the instance after a single `None`.

### Limitations

- This interface only reads network traffic; it does not send or modify packets.
- The caller needs system permission to access the selected network interface.
- The system must provide an available packet-capture driver.
- Returned coordinates are raw world coordinates and are not guaranteed to directly match any map pixel coordinate system.
- Coordinate transformation and calibration should be implemented by the caller.
