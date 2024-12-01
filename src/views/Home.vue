<script setup lang="ts">
import { useReminderStore } from '../store/reminder'
const store = useReminderStore()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
      Today's Reminders
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Today's Reminders -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Upcoming
        </h2>
        <ul class="space-y-4">
          <li v-for="reminder in store.reminders" :key="reminder.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="font-medium text-gray-800 dark:text-white">{{ reminder.title }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(reminder.due_date).toLocaleString() }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Quick Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Overview
        </h2>
        <div class="space-y-4">
          <div class="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p class="text-sm text-blue-600 dark:text-blue-200">Total Reminders</p>
            <p class="text-2xl font-bold text-blue-700 dark:text-blue-100">
              {{ store.reminders.length }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
