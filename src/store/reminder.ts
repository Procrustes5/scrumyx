import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

export const useReminderStore = defineStore('reminder', () => {
  const reminders = ref([])

  async function fetchReminders() {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
    if (data) reminders.value = data
  }

  async function addReminder(reminder) {
    const { data, error } = await supabase
      .from('reminders')
      .insert([reminder])
    if (data) await fetchReminders()
  }

  return {
    reminders,
    fetchReminders,
    addReminder
  }
})
