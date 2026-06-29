---
title: "A mutex is a promise, not a suggestion"
date: 2026-06-26
description: "Two tasks on one microcontroller, sharing a CPU and a serial port. Both bugs that followed — a starved task and garbled output — were the same bug: a shared thing nobody was forced to take turns with."
topics: [Embedded, Concurrency]
---

The exercise was small: run two tasks at once on a dual-core microcontroller under **FreeRTOS** —
one blinking an LED at **1 Hz**, the other flashing a second LED at **10 Hz** — both pinned to the
same core. At equal priority they take turns and both run fine. The interesting part is everything
that breaks the moment they *don't* take turns.

First break: I raised one task's priority above the other, and left it spinning in a busy-wait delay
— a `while (millis() - t < ms);` loop that holds the CPU the whole time it "waits." The
higher-priority task now never lets go, and the lower one simply **starves** — its LED stops. The
fix is one function: swap the busy-wait for `vTaskDelay()`, which moves the task into a *blocked*
state instead of a spinning one, handing the CPU to whatever else is ready. Same logic, but now the
waiting task is genuinely waiting instead of selfishly idling.

Second break: I had both tasks print to the **one** serial port. Each prints fine alone; together
their output interleaves into garbage, because a print isn't atomic — one task gets swapped out
mid-line and the other stamps its characters into the gap. The fix is a **mutex**: create it once,
then each task must `xSemaphoreTake()` it before printing and `xSemaphoreGive()` it after. Only the
holder may touch the port. The interleaving can't happen, because the second task is made to *wait*
until the first has finished its line.

Both failures are the same shape. The CPU and the serial port are both **shared resources**, and in
each case the trouble started when one task used a shared thing without being forced to take turns.
A busy-wait hogs the processor; an unguarded print corrupts the output. The mutex — and the blocking
delay — are just the rule "one at a time" made *mandatory* instead of hoped-for.

That's the lesson worth keeping, and it's the same instinct behind designing a controller to
[fail loud, not clever](/blog/fail-loud-not-clever/): a rule you enforce by convention is one a
mis-scheduled task can break, but a rule the scheduler enforces can't be skipped. "The tasks should
take turns" is a race waiting to happen. "Only the task holding the lock may proceed" is a promise.
Write the second one.
