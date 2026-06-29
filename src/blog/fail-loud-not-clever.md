---
title: "Designing the glove controller to fail loud, not clever"
date: 2026-06-22
description: "On a benchtop rehabilitation-glove rig, the controller's first job isn't precision — it's to stay inside hard limits, refuse to fight itself, and show its work."
topics: [Embedded, Safety]
---

The [rehab-glove controller](/projects/soft-robotic-glove/) already runs a real PID loop while it
inflates a finger and a [bang-bang hold](/blog/holding-grip-with-hysteresis/) to keep the hand
open. Those are the parts that look like "control." But the parts I'd defend hardest aren't the
control law at all — they're the scaffolding wrapped around it so a pneumatic rig is safe to run on
a bench, near a hand. Three habits do most of that work.

**A hard ceiling, checked every loop.** A safety watchdog cuts pump power the instant the flex
reading overshoots or crosses a fixed ADC ceiling (**3500**). The important thing is *where* it
lives: outside the controller, with the authority to override it. The PID loop is allowed to be
wrong — it's a tuned approximation chasing a moving target. The watchdog is the thing that
isn't allowed to be wrong, so it doesn't get to be clever, it just gets to be fast and final.

**Make the dangerous state structurally impossible, not merely unlikely.** Pressure and vacuum
share one air path through a single **3/2 solenoid valve**, so "inflate" and "extend" are physically
the same plumbing pointed two ways. The finite-state machine is built so that pressure and vacuum
can **never** drive against each other — not because a conditional politely checks for it each
cycle, but because there is no reachable state where both are commanded. A rule you enforce in code
can be skipped by a bug; a state that doesn't exist can't be entered.

**Show your work, continuously.** The rig streams a structured telemetry line — sensor value,
current state, pump PWM, relay — over serial at **115200 baud** the entire time it runs. That
sounds like a logging nicety and it's actually a safety feature: at any moment you can see which
state the machine *thinks* it's in versus what the hardware is doing, so a disagreement is visible
in the first second instead of discovered after something pops. A controller you can't observe is
one you're trusting on faith.

None of this is exotic, and that's the point. This is a **bench-validated research platform — not
a clinical device, not patient-ready, not human-tested** — and the discipline exists precisely
because of that gap. The honest version of "someday this might assist a real hand" isn't a cleverer
control law. It's a controller that, when it's wrong, **fails in a way you can see and survive.**
