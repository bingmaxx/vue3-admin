<script setup lang="ts">
import { apiGetCaptcha } from '@/api/common'
const getCaptcha = async () => {
  try {
    const res = await apiGetCaptcha()
    console.log('[res]: ', res)
  } catch (error) {
    // console.log('[error]: ', error)
  }
}

getCaptcha()
</script>

<template>
  <p>login</p>
</template>
