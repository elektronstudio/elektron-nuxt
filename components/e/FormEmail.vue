<script setup lang="ts">
import { computed } from "vue";

type Props = {
  placeholder?: string;
  label?: string;
  modelValue?: string | number;
  name?: string;
  disabled?: boolean;
};

const {
  modelValue = "",
  placeholder,
  label,
  name,
  disabled,
} = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <EInput
    v-model="inputValue"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    type="email"
  />
</template>
