---
title: "Controlling a motor's speed with a 555 and no code"
date: 2026-07-08
description: "A pure-analog DC-motor speed controller — a 555 timer making PWM, a potentiometer setting the duty cycle, and BJT switches passing the current — and why the hard parts move from firmware to the switching edge."
topics: [Electronics, Hardware]
---

Most of my motor work runs on a microcontroller: read a sensor, compute, write a PWM register. This
project was a deliberate step in the other direction — vary a DC motor's speed with **no processor
and no code at all**, just a **555 timer**, a **potentiometer**, and a couple of **BJT switches** on
a breadboard. It's worth doing once, because stripping out the firmware shows you exactly which
problems were never software problems.

The idea is **pulse-width modulation** the analog way. Wire the 555 as an astable oscillator and it
free-runs, producing a square wave; arrange the timing network so the **potentiometer sets the duty
cycle** — the fraction of each cycle the output is high — while the frequency stays roughly fixed.
High duty most of the time means the motor sees most of the supply and spins fast; low duty means it
sees little and crawls. The pot is the throttle, and the 555 is doing continuously, in hardware, the
job a `analogWrite()` does in a chip.

The 555 can't drive a motor itself, so its output gates **BJT switches** that carry the actual motor
current. And that's where the real engineering moved. With code gone, the design questions are all
on the **switching edge**: pick a switching frequency high enough to be smooth but not so high the
transistors waste themselves in transitions; size the duty range; and — the one you cannot skip —
protect against the motor's **inductance.** Every time the switch opens, the motor's coil tries to
keep its current flowing and kicks back a voltage spike that will punch through a transistor. A
**freewheeling diode** gives that current somewhere to go. Switching transients and the BJTs' own
heat round out the list.

So the honest takeaway isn't "you don't need a microcontroller" — it's that the **microcontroller
was never doing the hard part.** The hard part is the power stage: the inductive kick, the thermal
budget, the switching losses. A 555 and a pot make a complete, reproducible speed controller, and
they make it obvious that the difficulty in driving a motor lives in the amps and the edges, not in
the logic deciding the duty cycle. (The natural next move is the same one every power stage wants:
swap the BJTs for a low-`R_DS(on)` MOSFET and let the edges get cleaner.)
