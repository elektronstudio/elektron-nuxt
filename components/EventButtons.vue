<script setup lang="ts">
const { lang } = useLang()

// @TODO: Type this
type Props = {
  event: any;
};

const { event } = defineProps<Props>();
</script>

<template>
  <router-link :to="event.route">
    <EButton size="xs" el="a" color="transparent">
      <Icon name="radix-icons:arrow-right" />
      {{ ["Read more", "Loe lähemalt"][lang] }}
    </EButton>
  </router-link>
  <EButton
    v-if="event.userCanBuyTicket"
    el="a"
    size="xs"
    color="accent"
    target="_blank"
    :href="event.ticketUrl"
  >
   <Icon name="radix-icons:arrow-right" />
    {{ ["Get a ticket", "Osta pilet"][lang] }}
  </EButton>
</template>
