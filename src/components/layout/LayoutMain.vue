<script setup lang="ts">
import LayoutLeft from './LayoutLeft.vue';
import LayoutRight from './LayoutRight.vue';
</script>

<template>
  <div class="layout-main">
    <LayoutLeft></LayoutLeft>
    <LayoutRight></LayoutRight>
  </div>
</template>

<style lang="scss" scoped>
@import './css/index.scss';
</style>