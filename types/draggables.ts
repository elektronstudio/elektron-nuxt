export type ContentType = "chat" | "text" | "image" | "video" | "event";

export type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
  isMaximised?: boolean;
  isMaximisable?: boolean;
  isAnchored?: boolean;
  order: number;
  contentType?: ContentType;
  data?: any;
  chatMessages?: number;
  hideTitleBarOnIdle?: boolean;
};
