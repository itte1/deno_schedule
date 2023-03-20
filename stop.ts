import state from './_state.ts'

export function stop() {
  if (state.timerId && !state.schedules.size) {
    clearInterval(state.timerId)
    state.timerId = 0
  }
}