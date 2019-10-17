# 快速上手
## 安装

使用 npm 或者 yarn 安装
```bash
# 安装
npm install -s cros-data 或者 yarn add -s cros-data
```

```javascript
// 使用
// 引入cros-data
import { Client,Hub } from "cros-data";
// 创建客户端
const client = new Client("http://localhost:8082/#/hub");
// set数据
let res = await client.set("token", 1234);
// 创建数据中心
new Hub({
  origin: /.*\d$/,
  allow: ["get", "set", "del"]
});
```

script标签引入

```html
// 引入cros-data
<script src="./cros-data.umd.js"></script>
// 创建客户端
<script>
  let client = new crosData.Client("http://localhost:10002/hub.html");
  client.set("token", 1234).then(res => {
    console.log(res);
  });
  client.get("token").then(res => {
    console.log(res);
  });
  client.del("token").then(res => {
    console.log(res);
  });
  client.clear().then(res => {
    console.log(res);
  });
</script>
// 创建数据中心
<script>
  let hub = new crosData.Hub([
    {
      origin: /.*localhost:1000\d$/,
      allow: ["get", "set", "del", "clear"]
    }
  ]);
</script>
```

## 示例

### 创建一个公共的数据中心

```html
// localhost:10002/hub.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>hub</title>
  </head>

  <body>
    <p>hub</p>
  </body>
  <script src="./cros-data.umd.js"></script>
  <script>
    let hub = new crosData.Hub([
      {
        origin: /.*localhost:1000\d$/,
        allow: ["get", "set", "del", "clear"]
      }
    ]);
  </script>
</html>
```

### 客户端

```html
// localhost:10002/client.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>client</title>
  </head>

  <body>
    <p>client</p>
  </body>
  <script src="./cros-data.umd.js"></script>
  <script>
    let client = new crosData.Client("http://localhost:10002/hub.html");
    // 向数据中心写数据
    client.set("token", 1234).then(res => {
      console.log(res);
    });
    // 向数据中心获取数据
    client.get("token").then(res => {
      console.log(res);
    });
    // 删除某项数据
    client.del("token").then(res => {
      console.log(res);
    });
    // 删除所有数据
    client.clear().then(res => {
      console.log(res);
    });
  </script>
</html>
```
