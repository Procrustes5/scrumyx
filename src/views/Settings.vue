<script setup lang="ts">
import { ref } from 'vue'

const notifications = ref(true)
const darkMode = ref(false)
const soundEnabled = ref(true)

const saveSettings = () => {
  // 設定を保存する処理
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Settings</h1>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="space-y-6">
        <!-- Notifications -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">Notifications</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Enable or disable notifications</p>
          </div>
          <button
            @click="notifications = !notifications"
            :class="[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors',
              notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            ]"
          >
            <span
              :class="[
                'inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 transition-transform',
                notifications ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>

        <!-- Dark Mode -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">Dark Mode</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode theme</p>
          </div>
          <button
            @click="darkMode = !darkMode"
            :class="[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors',
              darkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            ]"
          >
            <span
              :class="[
                'inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 transition-transform',
                darkMode ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>

        <!-- Sound Effects -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">Sound Effects</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Enable or disable sound effects</p>
          </div>
          <button
            @click="soundEnabled = !soundEnabled"
            :class="[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors',
              soundEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            ]"
          >
            <span
              :class="[
                'inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 transition-transform',
                soundEnabled ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>
      </div>

      <div class="mt-6">
        <button
          @click="saveSettings"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>
