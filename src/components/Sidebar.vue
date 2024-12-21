<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Home, Bell, Settings, Menu, PlusCircle } from 'lucide-vue-next'

const router = useRouter()
const isExpanded = ref(false)

const navigation = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Reminders', path: '/reminders', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings }
]
</script>

<template>
  <div class="flex h-60 w-80 overflow-hidden bg-zinc-900 rounded-xl">
    <!-- Sidebar -->
    <aside :class="[
      'flex flex-col bg-zinc-800/50 border-r border-zinc-700/50 transition-all duration-300',
      isExpanded ? 'w-48' : 'w-14'
    ]">
      <!-- Toggle button -->
      <button
        @click="isExpanded = !isExpanded"
        class="p-3 m-1 hover:bg-indigo-500/10 text-zinc-400 hover:text-indigo-400 rounded-lg transition-all"
      >
        <Menu class="w-5 h-5" />
      </button>

      <!-- Navigation -->
      <nav class="flex-1 px-1 py-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center px-3 py-2 mb-1 rounded-lg transition-all',
            $route.path === item.path
              ? 'bg-indigo-500/20 text-indigo-400'
              : 'text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span v-if="isExpanded" class="ml-3 text-sm font-medium truncate">
            {{ item.name }}
          </span>
        </router-link>
      </nav>

      <!-- Add Button -->
      <div class="p-2">
        <button
          class="w-full flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg transition-all"
          :class="{ 'px-3': isExpanded }"
        >
          <PlusCircle class="w-4 h-4" />
          <span v-if="isExpanded" class="ml-2 text-xs font-medium">New</span>
        </button>
      </div>
    </aside>

    <!-- Content Area -->
    <main class="flex-1 p-4 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>
