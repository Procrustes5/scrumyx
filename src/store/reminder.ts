import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Reminder {
  id: string
  title: string
  due_date: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
}

export const useReminderStore = defineStore('reminder', () => {
  const reminders = ref<Reminder[]>([])

  // 新しいリマインダーを追加
  function addReminder(reminder: Omit<Reminder, 'id' | 'completed'>) {
    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      completed: false,
      ...reminder
    }
    reminders.value.push(newReminder)
    saveToStorage()
  }

  // リマインダーを更新
  function updateReminder(id: string, updates: Partial<Reminder>) {
    const index = reminders.value.findIndex(r => r.id === id)
    if (index !== -1) {
      reminders.value[index] = {
        ...reminders.value[index],
        ...updates
      }
      saveToStorage()
    }
  }

  // リマインダーを削除
  function deleteReminder(id: string) {
    const index = reminders.value.findIndex(r => r.id === id)
    if (index !== -1) {
      reminders.value.splice(index, 1)
      saveToStorage()
    }
  }

  // リマインダーを完了済みにする
  function completeReminder(id: string) {
    const reminder = reminders.value.find(r => r.id === id)
    if (reminder) {
      reminder.completed = true
      saveToStorage()
    }
  }

  // 未完了のリマインダーを取得
  const uncompletedReminders = computed(() =>
    reminders.value.filter(r => !r.completed)
  )

  // 今日期限のリマインダーを取得
  const todayReminders = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return reminders.value.filter(reminder => {
      const dueDate = new Date(reminder.due_date)
      return dueDate >= today && dueDate < tomorrow
    })
  })

  // ローカルストレージに保存
  function saveToStorage() {
    localStorage.setItem('reminders', JSON.stringify(reminders.value))
  }

  // ローカルストレージから読み込み
  function loadFromStorage() {
    const stored = localStorage.getItem('reminders')
    if (stored) {
      reminders.value = JSON.parse(stored)
    }
  }

  // 初期化時にデータを読み込む
  loadFromStorage()

  return {
    reminders,
    uncompletedReminders,
    todayReminders,
    addReminder,
    updateReminder,
    deleteReminder,
    completeReminder,
  }
})
