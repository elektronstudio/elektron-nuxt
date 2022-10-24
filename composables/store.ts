import { useStorage } from "@vueuse/core";

export const useNewMessages = () => useStorage<number>("new_messages", 0);
