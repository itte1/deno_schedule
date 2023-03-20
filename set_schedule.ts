import type { Generator } from './type.ts'
import state from './_state.ts'
import { start } from './start.ts'

export function setSchedule(
  task: () => void,
  date: Date | Generator,
  ...args: any[]
): number {
  if (date instanceof Date) {
    let scheduleId = state.scheduleId++
    state.schedules.set(scheduleId, { date: new Date(date), task, args })
    start()
    return scheduleId
  } else {
    const nextDate = date(new Date(), ...args)
    if (nextDate !== undefined) {
      let scheduleId = state.scheduleId++
      state.schedules.set(scheduleId, { date: new Date(nextDate), task, generator: date, args })
      start()
      return scheduleId
    } else {
      return 0
    }
  }
}