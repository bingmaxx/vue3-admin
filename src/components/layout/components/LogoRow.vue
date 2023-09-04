<script setup lang="ts">
</script>

<template>
  <div class="logo-row">
    <img src="@/assets/logo.png" alt="">
    <h3>admin</h3>
  </div>
</template>

<style lang="scss" scoped>
.logo-row {
  @include flex-row(flex-start, center);
  padding: 20px;
  img {
    $s: 40px;
    width: $s;
    height: $s;
    margin-right: 16px;
  }
  h3 {
    color: white;
  }
}
</style>