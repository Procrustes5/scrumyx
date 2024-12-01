<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar />
    <main class="flex-1 overflow-y-auto p-8">
      <RouterView />
    </main>
  </div>
</template>
