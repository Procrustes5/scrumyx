import { onMounted, onUnmounted } from 'vue'
import { useReminderStore } from '../store/reminder'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'

export function useNotification() {
  const store = useReminderStore()
  let intervalId: number | null = null

  async function checkAndSendNotifications() {
    const now = new Date()

    const dueReminders = store.reminders.filter(reminder => {
      const dueDate = new Date(reminder.due_date)
      return !reminder.completed &&
        dueDate.getTime() <= now.getTime()
    })

    for (const reminder of dueReminders) {
      try {
        let permissionGranted = await isPermissionGranted()

        if (!permissionGranted) {
          const permission = await requestPermission()
          permissionGranted = permission === 'granted'
        }

        if (permissionGranted) {
          sendNotification({
            title: 'Reminder Due',
            body: reminder.title,
            icon: 'clock',
          })
        }
      } catch (error) {
        console.error('Failed to send notification:', error)
      }
    }
  }

  onMounted(async () => {
    try {
      const permission = await requestPermission()
      if (permission === 'granted') {
        console.log('Notification permission granted')
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    }

    intervalId = window.setInterval(checkAndSendNotifications, 60000)
    await checkAndSendNotifications()
  })

  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  })

  return {
    checkAndSendNotifications
  }
}
