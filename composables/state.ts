import { ref } from "vue";
import { Breadcrumb } from "~~/types";

export const newMessages = ref<number>(0);
export const draggableChatState = ref<boolean>(false);
export const breadcrumbs = ref<Breadcrumb[]>([]);
export const isLive = ref<boolean>(false);
