# schedule

A task scheduler for Deno.
Provides `setSchedule` like `setTimeout` and `setInterval`.

## Usage

```ts
import { setSchedule, clearSchedule } from 'https://deno.land/x/schedule@1.0.0/mod.ts'

// Execute the task only once
setSchedule(() => {
  console.log(Date(), 'Task Start')
}, new Date('2023-03-16T01:15:00Z'))

// Execute the task every seconds
setSchedule(() => {
  console.log(Date(), 'Task Start')
}, date => date.setSeconds(date.getSeconds() + 1))

// If you want to stop the scheduler, use a clearSchedule function.
setTimeout(clearSchedule, 10 * 1000)
```

## Syntax

```js
setSchedule(task, date)
setSchedule(task, date, ...args)
setSchedule(task, generator)
setSchedule(task, generator, ...args)
```
<dl>
  <dt>task</dt>
  <dd>A task to be executed. It receive `args` as arguments.</dd>
  <dt>date</dt>
  <dd>A Date object to execute the task</dd>
  <dt>generator</dt>
  <dd>
    A function that generates a Date object to execute the task.
    This function takes the current Date as a first argument and returns the next Date.
    It receive `args` as other arguments.
  </dd>
  <dt>args</dt>
  <dd>Arguments to pass to the task and generator.</dd>
</dl>


## `generator`

Use your favorite library for `generator` creation. I recommend my [unit_date](https://deno.land/x/unit_date).


```ts
import { setSchedule, clearSchedule } from 'https://deno.land/x/schedule@1.0.0/mod.ts'
import { add, next } from 'https://deno.land/x/unit_date@0.1.1/mod.ts'

// Execute every 15 minutes from the current time
setSchedule(() => {
  console.log(Date(), 'Task Start')
}, add, { minutes: 15 })

// Execute at the end of every month
setSchedule(() => {
  console.log(Date(), 'Task Start')
}, next, { days: 31, hours: 9, minutes: 0 })
```

## Cancel schedule

```ts
// Get schedule id
let scheduleId = setSchedule(() => {}, new Date('2023-03-16T01:15:00Z'))

// Cancel one
clearSchedule(scheduleId)

// Cancel all
clearSchedule()
```