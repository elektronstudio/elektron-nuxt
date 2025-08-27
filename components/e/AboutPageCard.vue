<script setup lang="ts">
type Props = {
  layout?: "columns1" | "columns1-5" | "columns2" | "columns3" | "columns4";
  title?: string;
  content?: string;
};

const { layout, title, content } = withDefaults(defineProps<Props>(), {
  layout: "columns1",
});
</script>
<template>
  <!-- TODO: minimum aspect ratio is probably needed -->
  <EBox :class="layout">
    <ETitle v-if="title" el="h3" size="lg">
      {{ title }}
    </ETitle>
    <EContent v-if="content" :content="parseMarkdown(content)" />
  </EBox>
</template>

<style scoped>
.EBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.EBox h3 {
  margin-bottom: var(--m-8);
}
</style>
