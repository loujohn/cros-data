import { Action, Message, Res } from "./interface";
export class Client {
  parent: Window;
  origin: string;
  sendQueue: Function[];
  messageId: number;
  cbs: any;
  child: Window | null;
  constructor(iframeUrl: string) {
    this.parent = window;
    this.origin = new URL(iframeUrl).origin;
    this.sendQueue = [];
    this.messageId = 0;
    this.cbs = {};
    this.child = null;
    this.createIframe(iframeUrl);
    window.addEventListener("message", (evt: MessageEvent) => {
      if (typeof evt.data !== "string" || evt.data === "") {
        return;
      }
      const res: Res = JSON.parse(evt.data);
      if (res.status) {
        if (evt.origin === this.origin) {
          this.cbs[res.messageId].reslove(res.data);
          delete this.cbs[res.messageId];
        }
      } else {
        this.cbs[res.messageId].reject(res.error);
        delete this.cbs[res.messageId];
      }
    });
  }
  createIframe(url: string) {
    let frame = document.createElement("iframe");
    frame.style.cssText =
      "width:1px;height:1px;border:0;position:absolute;left:-9999px;top:-9999px;";
    frame.setAttribute("src", url);
    document.body.appendChild(frame);
    frame.onload = () => {
      this.child = frame.contentWindow;
      this.sendQueue.forEach(item => item());
    };
  }
  postHanle(action: Action, key?: string, val?: string) {
    const message: Message = {
      messageId: this.messageId,
      action: action,
      origin: new URL(location.href).origin,
      data: key ? { key: key, val: val } : undefined
    };
    if (this.child) {
      this.child.postMessage(JSON.stringify(message), this.origin);
    } else {
      this.sendQueue.push(() => {
        this.child!.postMessage(JSON.stringify(message), this.origin);
      });
    }
    return new Promise((reslove, reject) => {
      this.cbs[this.messageId] = {
        reslove,
        reject
      };
      this.messageId++;
    });
  }
  set(key: string, val: string) {
    return this.postHanle("set", key, val);
  }
  get(key: string, val: string) {
    return this.postHanle("get", key, val);
  }
  del(key: string, val: string) {
    return this.postHanle("del", key, val);
  }
  clear() {
    return this.postHanle("clear");
  }
}
