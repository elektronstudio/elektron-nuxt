<script setup lang="ts">
// type Breadcrumb = {
//   title: string;
//   link: string;
// };

// type Props = {
//   breadcrumbs: Breadcrumb[];
// };

// const { breadcrumbs } = defineProps<Props>();

const router = useRouter();

// const breadcrumbs = [
//   {
//     title: "Projects",
//     link: "/projects",
//   },
//   {
//     title: "Something Great",
//     link: "/projects/great",
//   },
//   {
//     title: "Something Greater",
//     link: "/projects/great/greater",
//   },
// ];
</script>

<template>
  <nav class="Breadcrumbs">
    <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <NuxtLink
        v-if="breadcrumb.link"
        :to="breadcrumb.link"
        class="breadcrumbItem"
      >
        {{ breadcrumb.title }}
      </NuxtLink>
      <span v-else class="breadcrumbItem">
        {{ breadcrumb.title }}
      </span>
    </template>
  </nav>
</template>

<style scoped>
.Breadcrumbs {
  position: fixed;
  top: calc(var(--h-9) - 1px);
  display: flex;
  font-size: var(--text-sm);
  background-color: var(--bg);
}

.breadcrumbItem {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--gray-300);
  border: var(--border-DEFAULT) solid var(--gray-500);
  line-height: 1;
  text-transform: uppercase;
  padding: var(--p-1) var(--p-2);
  height: var(--h-6);
}

.breadcrumbItem:not(:first-child) {
  margin-right: calc(var(--border-DEFAULT) * -1);
}

@media only screen and (min-width: 600px) {
  .breadcrumbItem:is(span),
  .breadcrumbItem:hover {
    border-image: url("/images/bg-texture-xs.gif") 1;
    z-index: 2;
  }
}
</style>
