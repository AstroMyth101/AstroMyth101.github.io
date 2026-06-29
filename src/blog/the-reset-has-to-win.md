---
title: "The reset has to win"
date: 2026-07-03
description: "Designing the pneumatic control sequence for a plastic-sheet welder — two cylinders, a timed dwell, and a return button that has to override the timer the instant it's pressed."
topics: [Mechatronics, Control]
---

The project was the control sequence for a plastic-sheet welding machine: two double-acting
pneumatic cylinders that press a heated bar onto the sheet, hold, and lift. Press **Start** and both
cylinders extend together at a controlled speed, **dwell 3 seconds** at full extension to make the
weld, then retract on their own. Simple — until you add the one requirement that reorganizes
everything: a **Reset** button that pulls both cylinders back *instantly, at any point, bypassing
the timer.*

The two cylinders have to move **together and at a regulated speed**, not slam — uneven or sudden
pressure makes a bad weld or a cracked sheet — so the piston forces are pressure-regulated for
consistent welding pressure and the extend stroke is speed-controlled. That part, the
`1A1+ 1A2+ / 1A1− 1A2−` march through extend, wait, retract, is the easy half.

The Reset is the hard half, and it's the same problem I keep meeting in embedded code: **a timed
step you can't interrupt is a window where the operator has no authority.** If "wait 3 seconds" is
built as a state the machine *sits inside*, then for those three seconds the return button does
nothing — and three seconds is plenty of time to need the hot bar off the sheet *now*. So the dwell
can't be a wall. It has to be a step you're allowed to leave early.

I designed it as a **function chart** — an initial step, a simultaneous-extend step, a timed dwell
step, and a return step — and built it electropneumatically in **FluidSIM** with relay logic and
solenoid valves. The trick is the return condition: it's the logical **OR** of "timer elapsed" and
"Reset pressed," wired so Reset takes priority. The machine isn't counting down and *then* checking
the button; the button is live in every state, and pressing it forces the transition to the return
step regardless of where the timer is.

Worth saying plainly, because it reads identically in air and in firmware: the dangerous version
isn't wrong on the happy path — it welds fine in the demo. It's wrong about **who's in charge during
the wait.** Build the sequence so the override is a transition that's *always enabled*, not a
courtesy the timer grants once it's finished, and "stop now" actually means now.
