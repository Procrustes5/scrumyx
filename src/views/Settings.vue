<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { Clock } from 'lucide-vue-next'

// 24時間形式で時刻を保存
const leavingTime = useStorage('leavingTime', '18:00')
</script>

<template>
  <div class="h-full text-zinc-200">
    <div class="flex items-center mb-6">
      <h2 class="text-lg font-medium">設定</h2>
    </div>

    <div class="space-y-6">
      <div class="bg-zinc-800/50 rounded-lg p-4">
        <div class="flex items-center mb-3">
          <Clock class="w-5 h-5 text-indigo-400 mr-2" />
          <h3 class="font-medium">退勤時刻設定</h3>
        </div>

        <div class="flex items-center space-x-4">
          <input
            type="time"
            v-model="leavingTime"
            class="bg-zinc-700 text-zinc-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <span class="text-sm text-zinc-400">
            現在の設定: {{ leavingTime }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
