import state from './_state.ts'
import { stop } from './stop.ts'

export function start() {
  if (!state.timerId && state.schedules.size) {
    state.timerId = setInterval(() => {
      const after1SecDate = new Date()
      after1SecDate.setSeconds(after1SecDate.getSeconds() + 1)
      after1SecDate.setMilliseconds(0)
      for (let [scheduleId, schedule] of state.schedules.entries()) {
        if (schedule.date < after1SecDate) {
          if (schedule.generator) {
            const nextDate = schedule.generator(new Date(), ...schedule.args)
            if (nextDate !== undefined) {
              schedule.date = new Date(nextDate)
            } else {
              state.schedules.delete(scheduleId)
              stop()
            }
          } else {
            state.schedules.delete(scheduleId)
            stop()
          }
          Promise.resolve().then(() => schedule.task(...schedule.args))
        }
      }
    }, 200)
  }
}