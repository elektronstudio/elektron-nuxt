<script setup lang="ts">
type ModelValue = string | number;

type Props = {
  modelValue?: ModelValue;
  name?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  id?: string;
};

const {
  modelValue = "",
  name,
  placeholder,
  label,
  disabled,
} = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: ModelValue): void;
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <textarea
    class="ETextArea"
    v-model="inputValue"
    :placeholder="placeholder"
    :name="name"
    :id="id"
    :disabled="disabled"
    ref="textarea"
  />
</template>

<style scoped>
.ETextArea {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--m-4);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  border: 1px solid var(--gray-300);
  background-color: var(--bg);
  padding: var(--p-1) var(--p-2);
}
.ETextarea::placeholder {
  color: var(--gray-300);
}
.ETextarea:focus {
  outline: none;
  border-color: var(--fg);
}
.ETextarea:not(:disabled):hover {
  background-color: rgba(250, 250, 250, 0.1);
}
.ETextarea:disabled {
  border-color: var(--gray-500);
  color: var(--gray-500);
  cursor: not-allowed;
}
.ETextarea:disabled::placeholder {
  color: var(--gray-500);
}
</style>
