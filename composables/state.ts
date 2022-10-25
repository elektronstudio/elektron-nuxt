import { ref } from "vue";

export const newMessages = ref<number>(0);
export const useDraggableChatState = () => ref<boolean>(false);
