<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string;
}>()

const iconName = computed<string>(() => `/spritemap.svg#${props.name}`);
</script>

<template>
  <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
</style>
