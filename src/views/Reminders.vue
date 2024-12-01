<script setup lang="ts">
import { ref } from 'vue'
import { useReminderStore } from '../store/reminder'

const store = useReminderStore()
const title = ref('')
const description = ref('')
const dueDate = ref('')

async function createReminder() {
  await store.addReminder({
    title: title.value,
    description: description.value,
    due_date: dueDate.value
  })
  title.value = ''
  description.value = ''
  dueDate.value = ''
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      Reminders
    </h1>

    <!-- Create Reminder Form -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Create New Reminder
      </h2>
      <form @submit.prevent="createReminder" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            v-model="title"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            v-model="description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <input
            v-model="dueDate"
            type="datetime-local"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Reminder
        </button>
      </form>
    </div>

    <!-- Reminders List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li
          v-for="reminder in store.reminders"
          :key="reminder.id"
          class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div class="flex justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-800 dark:text-white">
                {{ reminder.title }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                {{ reminder.description }}
              </p>
            </div>
            <time class="text-sm text-gray-500 dark:text-gray-400">
              {{ new Date(reminder.due_date).toLocaleString() }}
            </time>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
