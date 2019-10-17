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
