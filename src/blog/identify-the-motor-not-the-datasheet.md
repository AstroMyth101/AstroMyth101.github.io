---
title: "Identify the motor, don't trust the datasheet"
date: 2026-07-01
description: "Modeling a DC servo motor from a real step response instead of nameplate values — why a second-order plant collapses to first order, and what closing the loop does to its time constant."
topics: [Control, "System ID"]
---

For a [control-systems project](/projects/dc-motor-control/) the brief was to model a DC servo motor
and then control its speed. The tempting shortcut is to look up the motor's constants — armature
resistance, inertia, back-EMF — and assemble the textbook transfer function. I did the opposite: I
let the motor tell me what it is.

On paper a DC motor is **second-order.** Kirchhoff on the armature gives one equation
(`Va = Ra·ia + La·dia/dt + Kb·ω`), Newton on the rotor gives another (`Kt·ia = J·dω/dt + B·ω`), and
eliminating the current leaves a transfer function with two time constants — an **electrical** one
(`La/Ra`) and a **mechanical** one (`J/B`). Whether the electrical dynamics actually matter isn't
something to assume; it's something the hardware gets to decide.

So: a **0.1 V step** into the motor, the tacho-generator output logged through an **NI-DAQ at 100
samples/s** — 401 points over four seconds. The response is a clean monotonic rise. First order. The
fast electrical pole is invisible at this timescale, so the whole plant collapses to a single gain
and time constant:

| Quantity | Value |
| --- | --- |
| DC gain, K | 36.52 (tacho-V / input-V) |
| Time constant, τ | 0.070 s |
| Open-loop pole | −14.3 rad/s |
| Identified model | G(s) = 36.52 / (0.070 s + 1) |

Open-loop *position* has an integrator pole at `s = 0` — a constant voltage just winds the shaft
angle up forever — so speed has to be closed-loop. Driving the loop with a **1.979 V square-wave**
reference (2 s period) under proportional feedback, the motor tracks each step and the dynamics
tighten hard:

| Metric | Open loop | Closed loop |
| --- | --- | --- |
| Time constant | 0.070 s | 0.020 s |
| Rise time (10–90%) | — | 0.030 s |
| Speed regulation under load | — | 20–28% |

Feedback cut the time constant by about **3.5×**, which is the entire reason you wrap a loop around a
plant. The textbook tools still showed up — the **Final Value Theorem** for steady-state, the
**Routh–Hurwitz** criterion to confirm stability — but applied to the *identified* parameters, not
assumed ones. Every figure traces back to a file off the bench, which is why it was natural to write
it up as an IEEE-format paper: each number is a measurement, not a claim.

The reframe worth keeping: a model isn't the equations, it's the equations *plus the numbers*, and
the numbers belong to this motor on this rig — not to its datasheet. Start from a real step response
and the structure itself tells you what to keep (one pole) and what to throw away (the other),
instead of hauling around a second-order model you can't justify.
