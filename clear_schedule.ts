import state from './_state.ts'
import { stop } from './stop.ts'

export function clearSchedule(scheduleId?: number) {
  if (scheduleId) {
    if (state.schedules.has(scheduleId)) {
      state.schedules.delete(scheduleId)
      stop()
    }
  } else {
    state.schedules.clear()
    stop()
  }
}