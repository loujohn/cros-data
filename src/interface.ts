export const actions = ["set", "get", "del", "clear"];
export type Action = "set" | "get" | "del" | "clear";

export interface Message {
  messageId: number;
  origin: string;
  data?: {
    key: string;
    val?: string;
  };
  action: Action;
}
export interface Res {
  messageId: number;
  data?: any;
  status: Boolean;
  error?: String;
}

export interface Permission {
  origin: RegExp;
  allow: Action[];
}
