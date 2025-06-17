<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style scoped>
.hello {
  margin-top: 20px;
  color: #42b983;
}
</style>