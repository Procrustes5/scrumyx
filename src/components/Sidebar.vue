<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navigation = [
  { name: 'Home', path: '/', icon: 'HomeIcon' },
  { name: 'Reminders', path: '/reminders', icon: 'BellIcon' },
  { name: 'Settings', path: '/settings', icon: 'CogIcon' }
]
</script>

<template>
  <aside class="w-64 bg-white dark:bg-gray-800 shadow-lg">
    <div class="px-6 py-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">Scrumyx</h2>
    </div>
    <nav class="mt-6">
      <div v-for="item in navigation" :key="item.name">
        <router-link
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </aside>
</template>
