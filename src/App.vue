<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import { useNotification } from './composables/useNotification.ts'

useNotification();
</script>

<template>
  <div class="flex h-70 w-90 bg-transparent">
    <Sidebar />
  </div>
</template>
