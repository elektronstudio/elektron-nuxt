import type { Ref } from "vue";
import type { InitialDraggablesList, DraggablesList } from "~~/types";

export const useDraggables = (initialDraggables: InitialDraggablesList) => {
  const keys = Object.keys(initialDraggables);
  const indexes: Ref<string[]> = ref(keys);
  const draggables = keys.map((key, index) => {
    const x: Ref<number> = ref(initialDraggables[key].initialX);
    const y: Ref<number> = ref(initialDraggables[key].initialY);
    const updateIndex = () =>
      (indexes.value = unique([...indexes.value, key].reverse()).reverse());
    const updateXY = ({ x: newX, y: newY }: { x: number; y: number }) => {
      x.value = newX;
      y.value = newY;
      updateIndex();
    };
    const docked: Ref<boolean> = ref(initialDraggables[key].docked || false);
    const maximised: Ref<boolean> = ref(
      initialDraggables[key].maximised || false,
    );
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
  ) as DraggablesList;
};
