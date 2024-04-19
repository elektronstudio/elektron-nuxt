<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const code = ref<string>((route.query.code as string) || "");

onMounted(() => {
  onValidate();
});

const onValidate = async () => {
  if (code.value) {
    const event = await validateTicket(code.value);
    if (event?.eventLiveLink) {
      router.push(event.eventLiveLink);
    }
    // TODO: Handle invalid ticket code
  }
};
</script>

<template>
  <ETitle>{{ $t("validate_your_ticket") }}</ETitle>
  <EContent :content="parseMarkdown($t('fienta_copy'))" />
  <ETextArea class="ETextarea" v-model="code" placeholder="Code" />
  <EButton color="accent" size="sm" @click="onValidate">
    {{ $t("submit_ticket_code") }}
  </EButton>
</template>

<style scoped>
.wrapper {
  display: grid;
  place-content: center;
  place-items: center;
  height: 100%;
  padding: var(--p-8);
  text-align: center;
}
.ETitle {
  margin-bottom: var(--m-4);
}
.EContent {
  max-width: 40ch;
  margin-bottom: var(--m-4);
}
</style>
