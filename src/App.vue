<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layout/DefaultLayout.vue'

const route = useRoute()
// 如果当前路由的 meta.fullPage 为 true，则不包裹 DefaultLayout
const layout = computed(() => (route.meta.fullPage ? 'div' : DefaultLayout))
</script>