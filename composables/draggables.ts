export const useDraggables = (initialDraggables: any) => {
  const keys = Object.keys(initialDraggables);
  const indexes = ref(keys);
  const draggables = keys.map((key, index) => {
    const x = ref(initialDraggables[key].x);
    const y = ref(initialDraggables[key].y);
    const updateIndex = () =>
      (indexes.value = unique([...indexes.value, key].reverse()).reverse());
    const updateXY = ({ x: newX, y: newY }) => {
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
      updateXY,
      setDocked,
      getDocked,
      getTop,
      toggleMaximised,
      getMaximised,
      getIndex,
      updateIndex,
    };
  });

  return Object.fromEntries(keys.map((key, i) => [key, draggables[i]]));
};
