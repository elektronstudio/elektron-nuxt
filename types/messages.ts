export type MessageType = "CHAT" | string;

export type Message = {
  channel: string;
  type: MessageType;
  [key: string]: any;
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
