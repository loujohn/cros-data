import { Message, Res, Permission } from "./interface";
export declare class Hub {
    Permissions: Permission[];
    constructor(Permissions: Permission[]);
    permitted(message: Message): Boolean;
    set(message: Message): Res;
    get(message: Message): Res;
    del(message: Message): Res;
    clear(message: Message): Res;
}
