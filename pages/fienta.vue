<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const code = ref<string>((route.query.code as string) || "");
const { lang } = useLang();

const onValidate = async () => {
  if (code.value) {
    const event = await validateTicket(code.value);
    if (event?.eventLiveLink) {
      router.push(event.eventLiveLink);
    }
    // @TODO: Handle invalid ticket code
  }
};
</script>

<template>
  <div class="wrapper">
    <ETitle>{{ ["Validate your ticket", "Piletikontroll"][lang] }}</ETitle>
    <EContent
      :content="
        parseMarkdown(
          [
            `There is a **ticket code** in your Fienta email, just below big blue button. Copy-paste the code into the box below:`,
            `Fienta piletil on piletikood emaili lõpus, sinise sisenemisnupu all. Kopeeri see kood siia:`,
          ][lang],
        )
      "
    />
    <EFormTextarea v-model="code" placeholder="Code" class="w-[12ch]" />
    <EButton color="accent" size="sm" @click="onValidate">
      {{ ["Submit ticket code", "Kontrolli pileti koodi"][lang] }}
    </EButton>
  </div>
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
  margin-bottom: 1rem;
}
.EContent {
  max-width: 40ch;
  margin-bottom: 1rem;
}
</style>
