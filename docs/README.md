---
home: true
actionText: 开始使用 →
actionLink: /readme
footer: ISC Licensed | Copyright © 2019-present LouJohn
features:
  - title: TypeScript
    details: TypeScript编写
  - title: Promise支持
    details: promise
  - title: 支持权限配置
    details: 支持权限配置
---

跨域共享 LocalStorage，采用 TypeScript 编写，支持权限控制、Promise 化接口。

### 概览

cros-data 是共享 cookie 的替代方法。与 cookie 不同，您的客户端数据不再限于 4KB，您可以获取大约 5M 数据内容（根据不同的浏览器大小不同）。对于客户端数据量较大的应用程序，可以避免使用 cookie，可以减小请求头的大小。这一切都要归功于 LocalStorage，它可以在 IE 8 +，FF 3.5 +，Chrome 4+和大多数移动浏览器中使用。有关兼容浏览器的列表，请参见 [caniuse](https://caniuse.com/#feat=namevalue-storage)。

该库分为两种类型的组件：数据中心 和 客户端。该库分为两种类型的组件：数据中心嵌入到每个页面，并直接与 LocalStorage API 交互。然后，客户端将这数据中心通过 iframe 的方式嵌入并发布消息，以请求存储，检索和删除数据。这允许多个客户端访问和共享位于单个存储中的数据。

应该注意相互通信的起源。在初始化数据中心时应该传递一组权限对象，使其来自与不信任来源的消息及不被允许的方法被忽略。但是需要注意的是，用户依然可以完全控制本地数据，因为数据来源与本地存储，该库只是在应用程序上控制访问。

#### 数据中心

```javascript
let hub = new crosData.Hub([
  {
    origin: /.*localhost:1000\d$/,
    allow: ["get", "set", "del"]
  }
]);
```

#### 客户端

```javascript
let client = new crosData.Client("http://localhost:10002/hub.html");
client.set("token", 1234).then(res => {
  console.log(res);
});
```

### 安装

```bash
# 安装
npm install -s cros-data 或者 yarn add -s cros-data
```