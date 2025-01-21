import ReconnectingWebSocket from "reconnecting-websocket";
import type { Message } from "~~/types";

export const useMessages = () => {
  const messages = ref<Message[]>([]);
  const sendMessage = ref((_: any) => {});
  const ws = ref<ReconnectingWebSocket | null>(null);

  onMounted(() => {
    const config = useRuntimeConfig();
    const websocket = new ReconnectingWebSocket(config.public.wsUrl);

    websocket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      console.log("message", message);
      messages.value.push(message);
    });

    ws.value = websocket;
    sendMessage.value = (message: any) =>
      websocket.send(
        JSON.stringify({
          id: randomString(),
          datetime: new Date().toISOString(),
          ...message,
        }),
      );
  });
  return { messages, sendMessage, ws };
};
