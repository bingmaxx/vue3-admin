<script setup lang="ts">
import { apiGetCaptcha } from '@/api/common'
import { ref } from 'vue';
const svg_url = ref('');
const getCaptcha = async () => {
  try {
    const res = await apiGetCaptcha()
    console.log('[res]: ', res)
    svg_url.value = res.data.data;
  } catch (error) {
    // console.log('[error]: ', error)
  }
}

getCaptcha()
</script>

<template>
  <a-button type="primary">Primary Button</a-button>
  <div class="svg" v-html="svg_url"></div>
</template>
