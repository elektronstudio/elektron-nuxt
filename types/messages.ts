export type MessageType = "CHAT" | "COMMAND" | string;

export type Message = {
  channel: string;
  datetime?: Date;
  id?: string;
  store?: boolean;
  userId: string;
  userName: string;
  value: any;
  type: MessageType;
  // [key: string]: any;
};

export type DraggableChatUser = {
  userId: string;
  userName: string;
  x: number;
  y: number;
  chat: string;
  datetime: Date;
  idle?: number | undefined;
  opacity?: number | undefined;
};
