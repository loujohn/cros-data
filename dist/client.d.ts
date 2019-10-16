import { Action } from "./interface";
export declare class Client {
    parent: Window;
    origin: string;
    sendQueue: Function[];
    messageId: number;
    cbs: any;
    child: Window | null;
    constructor(iframeUrl: string);
    createIframe(url: string): void;
    postHanle(action: Action, key?: string, val?: string): Promise<unknown>;
    set(key: string, val: string): Promise<unknown>;
    get(key: string, val: string): Promise<unknown>;
    del(key: string, val: string): Promise<unknown>;
    clear(): Promise<unknown>;
}
