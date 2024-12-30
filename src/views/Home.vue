<script setup lang="ts">
import { useReminderStore } from '../store/reminder'
import { Clock, CheckCircle2 } from 'lucide-vue-next'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'

const store = useReminderStore()
// setInterval(() => {
//   sendNotification({title: 'hello', body: 'aa'})
// }, 10_000)
</script>

<template>
  <div class="h-full text-zinc-200">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm font-medium">Reminders</h2>
      <div class="flex space-x-1">
        <button class="p-1.5 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 transition-colors">
          <Clock class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Reminders List -->
    <div class="space-y-2 mb-4">
      <div
        v-for="reminder in store.reminders"
        :key="reminder.id"
        class="group flex items-center p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-all"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center">
            <div :class="[
              'w-1.5 h-1.5 rounded-full mr-2',
              reminder.priority === 'high' ? 'bg-rose-500' :
              reminder.priority === 'medium' ? 'bg-amber-500' :
              'bg-emerald-500'
            ]"
            />
            <p class="font-medium truncate">{{ reminder.title }}</p>
          </div>
          <p class="text-xs text-zinc-400 mt-0.5">
            {{ new Date(reminder.due_date).toLocaleString() }}
          </p>
        </div>
        <button class="p-1.5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-indigo-400 rounded-lg transition-all">
          <CheckCircle2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-zinc-800/50 rounded-lg">
        <p class="text-xs text-zinc-400">Total</p>
        <p class="text-lg font-semibold text-indigo-400">
          {{ store.reminders.length }}
        </p>
      </div>
      <div class="p-3 bg-zinc-800/50 rounded-lg">
        <p class="text-xs text-zinc-400">Today</p>
        <p class="text-lg font-semibold text-emerald-400">
          {{ store.reminders.filter(r => r.completed).length }}
        </p>
      </div>
    </div>
  </div>
</template>
