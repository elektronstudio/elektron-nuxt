import { Ref } from "vue";

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

export type Draggable = InitialDraggable & {
  // New draggable functions
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

export type InitialDraggables = {
  [key: string]: InitialDraggable;
};

export type Draggables = {
  [key: string]: Draggable;
};

export const useDraggables = (initialDraggables: InitialDraggables) => {
  const keys = Object.keys(initialDraggables);
  const indexes = ref(keys);
  const draggables = keys.map((key, index) => {
    const x = ref(initialDraggables[key].initialX);
    const y = ref(initialDraggables[key].initialY);
    const updateIndex = () =>
      (indexes.value = unique([...indexes.value, key].reverse()).reverse());
    const updateXY = ({ x: newX, y: newY }: { x: number; y: number }) => {
      x.value = newX;
      y.value = newY;
      updateIndex();
    };
    const docked = ref(initialDraggables[key].docked || false);
    const maximised = ref(initialDraggables[key].maximised || false);
    const setDocked = () => {
      docked.value = !docked.value;
      updateIndex();
    };
    const setDockedSilent = (state: boolean) => {
      docked.value = state;
    };
    const toggleMaximised = () => {
      maximised.value = !maximised.value;
      updateIndex();
    };
    const getIndex = () => {
      const index = indexes.value.findIndex((index) => index === key);
      return index > -1 ? index + 1 : "";
    };
    const getTop = () => {
      return indexes.value[indexes.value.length - 1] === key;
    };
    const getDocked = () => docked.value;
    const getMaximised = () => maximised.value;
    const titles = initialDraggables[key].titles
      ? initialDraggables[key].titles
      : [key, key];

    return {
      ...initialDraggables[key],
      titles,
      x,
      y,
      id: key,
      updateXY,
      setDocked,
      setDockedSilent,
      getDocked,
      getTop,
      toggleMaximised,
      getMaximised,
      getIndex,
      updateIndex,
    };
  });

  return Object.fromEntries(
    keys.map((key, i) => [key, draggables[i]]),
  ) as Draggables;
};
