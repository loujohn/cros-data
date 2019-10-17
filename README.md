# cros-data

跨域共享 LocalStorage，采用 TypeScript 编写，支持权限控制、Promise 化接口。

## 概览

cros-data 是共享 cookie 的替代方法。与 cookie 不同，您的客户端数据不再限于 4KB，您可以获取大约 5M 数据内容（根据不同的浏览器大小不同）。对于客户端数据量较大的应用程序，可以避免使用 cookie，可以减小请求头的大小。这一切都要归功于 LocalStorage，它可以在 IE 8 +，FF 3.5 +，Chrome 4+和大多数移动浏览器中使用。有关兼容浏览器的列表，请参见 [caniuse](https://caniuse.com/#feat=namevalue-storage)。

该库分为两种类型的组件：数据中心 和 客户端。该库分为两种类型的组件：数据中心嵌入到每个页面，并直接与 LocalStorage API 交互。然后，客户端将这数据中心通过 iframe 的方式嵌入并发布消息，以请求存储，检索和删除数据。这允许多个客户端访问和共享位于单个存储中的数据。

应该注意相互通信的起源。在初始化数据中心时应该传递一组权限对象，使其来自与不信任来源的消息及不被允许的方法被忽略。但是需要注意的是，用户依然可以完全控制本地数据，因为数据来源与本地存储，该库只是在应用程序上控制访问。

### 数据中心

```javascript
let hub = new crosData.Hub([
  {
    origin: /.*localhost:1000\d$/,
    allow: ["get", "set", "del"]
  }
]);
```

### 客户端

```javascript
let client = new crosData.Client("http://localhost:10002/hub.html");
client.set("token", 1234).then(res => {
  console.log(res);
});
```

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

# API

## 客户端

### new Client(hub_url)

- 参数

  - {String} hub_url

- 返回一个客户端实例
- 用法

```javascript
const client = new Client("http://localhost:8080/hub.html");
```

### set(key,val)

- 参数
  - {String} key
  - {String} val
- 返回一个 Promise
- 用法

```javascript
const client = new Client("http://localhost:8080/hub.html");
client.set("token", 123).then(res => {
  console.log(res);
});
```

### get(key)

- 参数
  - {String} key
- 返回一个 Promise
- 用法

```javascript
const client = new Client("http://localhost:8080/hub.html");
client.get("token").then(res => {
  console.log(res);
});
```

### del(key)

- 参数
  - {String} key
- 返回一个 Promise
- 用法

```javascript
const client = new Client("http://localhost:8080/hub.html");
client.del("token").then(res => {
  console.log(res);
});
```

### clear()

- 参数
- 返回一个 Promise
- 用法

```javascript
const client = new Client("http://localhost:8080/hub.html");
client.del("token").then(res => {
  console.log(res);
});
```

## 数据中心

### new Hub(domain_Array)

- 参数
  - {Array} domain_Array
- 返回一个数据中心实例
- 用法
  - 接受一个对象数组，对象包含 origin 和 allow 字段。origin 是一个正则表达式，用于匹配消息来源的 origin ，allow 是一个数组，表示允许操作的权限。
  ```javascript
  let hub = new crosData.Hub([
    {
      origin: /.*localhost:1000\d$/,
      allow: ["get", "set", "del", "clear"]
    }
  ]);
  ```

