export type ContentType = "chat" | "text" | "image" | "video" | "event";

export type InitialDraggable = {
  titles?: string[];
  contentType?: ContentType;
  initialX: number;
  initialY: number;
  tilesWidth?: number;
  tilesHeight?: number;
  maximisable?: boolean;
  docked?: boolean;
  maximised?: boolean;
  hideTitleBarOnIdle?: boolean;
};

export type DraggableProps = InitialDraggable & {
  id: string;
  x: Ref<number>;
  y: Ref<number>;
  updateXY: Function;
  getDocked: Function;
  setDocked: Function;
  setDockedSilent: Function;
  getIndex: Function;
  getMaximised: Function;
  toggleMaximised: Function;
  updateIndex: Function;
  getTop: Function;
};

export type InitialDraggablesList = {
  [key: string]: InitialDraggable;
};

export type DraggablesList = {
  [key: string]: DraggableProps;
};
