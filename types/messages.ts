export type MessageType = "CHAT" | string;

export type Message = {
  channel: string;
  type: MessageType;
  [key: string]: any;
};
