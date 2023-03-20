import type { Schedule } from './type.ts'

export default {
  schedules: new Map<number, Schedule>(),
  timerId: 0,
  scheduleId: 1,
}