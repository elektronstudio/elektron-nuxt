import { Ref } from "vue";

export type ContentType = "chat" | "text" | "image" | "video" | "event";

export interface MinimalDraggable {
  title?: string;
  draggableId: string;
  isMinimised?: boolean;
  isMaximised?: boolean;
  order: number;
}

export type Draggable = MinimalDraggable & {
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMaximisable?: boolean;
  isAnchored?: boolean;
  contentType?: ContentType;
  data?: any;
  hideTitleBarOnIdle?: boolean;
};

export function useLive(data: MinimalDraggable[]) {
  const draggablesState = ref(data);
  const updateDraggablesMobile = (draggable: Draggable) => {
    if (!draggable) {
      return;
    }
    const { draggableId } = draggable;

    // When minimising draggable
    if (draggable.isMinimised) {
      draggablesState.value = draggablesState.value.map((item) => {
        return {
          ...item,
          isMinimised: true,
        };
      });
    } else {
      // When maximising draggable
      draggablesState.value = draggablesState.value.map((item) => {
        return {
          ...item,
          // Minimise all other draggables
          isMinimised: item.draggableId === draggableId ? false : true,
        };
      });
    }

    return;
  };

  const updateDraggablesDesktop = (draggable: Draggable) => {
    if (!draggable) {
      return;
    }

    console.log("updateDraggablesDesktop", draggable);
    const { draggableId, order, isMinimised } = draggable;

    // Iterate through draggables and set the active draggable top in order
    draggablesState.value = draggablesState.value.map((item) => {
      let newOrder;
      if (isMinimised) {
        newOrder = item.order < order ? item.order + 1 : item.order;
      } else {
        newOrder = item.order > order ? item.order - 1 : item.order;
      }

      if (item.draggableId === draggableId) {
        return {
          ...draggable,
          order: isMinimised ? 0 : draggablesState.value.length,
        };
      } else {
        return {
          ...item,
          order: newOrder,
        };
      }
    });
  };

  const handleResize = () => {
    if (mobile.value) {
      draggablesState.value = draggablesState.value.map((item, index) => {
        return {
          ...item,
          isMinimised: index === 0 ? false : true,
        };
      });
    }
  };

  onMounted(() => {
    const initialStates = [] as Draggable[];
    // @TODO: Decide if to keep local stage or not
    data.forEach((draggable) => {
      const { draggableId } = draggable;
      const localDraggable = draggablesState.value?.find(
        (m: Draggable) => m.draggableId === draggableId,
      );
      const mergedDraggable = localDraggable
        ? {
            ...draggable,
            gridPosX: localDraggable.gridPosX,
            gridPosY: localDraggable.gridPosY,
            isMinimised: localDraggable.isMinimised,
          }
        : { ...draggable };

      if (mergedDraggable.order === undefined) {
        mergedDraggable.order = 1;
      }
      initialStates.push(mergedDraggable);
    });
    draggablesState.value = initialStates;

    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    updateDraggablesMobile,
    updateDraggablesDesktop,
    draggablesState,
  };
}
