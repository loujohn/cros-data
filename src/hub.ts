import { Action, Message, Res, Permission } from "./interface";

export class Hub {
  Permissions: Permission[] = [];
  constructor(Permissions: Permission[]) {
    this.Permissions = Permissions;
    window.addEventListener("message", (evt: MessageEvent) => {
      if (typeof evt.data !== "string" || evt.data === "") {
        return;
      }
      const message: Message = JSON.parse(evt.data);
      if (message.origin === evt.origin) {
        const { data, action } = message;
        if (!this.permitted(message)) {
          let res: Res = {
            messageId: message.messageId,
            data: {},
            status: false,
            error: "没有权限"
          };
          window.top.postMessage(JSON.stringify(res), evt.origin);
        } else {
          let res = this[action].apply(this, [message]);
          window.top.postMessage(JSON.stringify(res), evt.origin);
        }
      }
    });
  }
  permitted(message: Message): Boolean {
    for (let index = 0; index < this.Permissions.length; index++) {
      const item = this.Permissions[index];
      if (item.origin.test(message.origin)) {
        return item.allow.indexOf(message.action) > -1;
      }
    }
    return false;
  }
  set(message: Message): Res {
    window.localStorage.setItem(message.data!.key, message.data!.val!);
    return {
      messageId: message.messageId,
      data: {
        [message.data!.key]: message.data!.val
      },
      status: true
    };
  }
  get(message: Message): Res {
    window.localStorage.getItem(message.data!.key);
    return {
      messageId: message.messageId,
      data: {
        [message.data!.key]: message.data!.val
      },
      status: true
    };
  }
  del(message: Message): Res {
    window.localStorage.removeItem(message.data!.key);
    return {
      messageId: message.messageId,
      data: {
        [message.data!.key]: message.data!.val
      },
      status: true
    };
  }
  clear(message: Message): Res {
    window.localStorage.clear();
    return {
      messageId: message.messageId,
      status: true
    };
  }
}
