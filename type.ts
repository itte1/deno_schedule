// deno-lint-ignore-file
export type Generator = (date: Date, ...args: any[]) => void | Date | number

export type Schedule = {
  date: Date
  task: (...args: any[]) => void | Promise<void>
  generator?: Generator
  args: any[]
}
