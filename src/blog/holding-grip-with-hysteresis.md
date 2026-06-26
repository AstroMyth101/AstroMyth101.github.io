---
title: "Holding a grip without a second control loop"
date: 2026-06-20
description: "Why the rehab-glove controller holds the open hand with bang-bang hysteresis instead of running PID on the vacuum pump."
topics: [Embedded, Control]
---

The rehab-glove controller runs a proper PID loop while it inflates a finger — error,
deadband, anti-windup, the whole thing. So the obvious instinct is to reach for a second PID
loop on the vacuum side to *hold* the hand open. I didn't, and the reason is worth writing down.

The hold state doesn't need precision; it needs to **stay put cheaply**. The vacuum pump is
switched by a relay, and a relay is a bad place to ask for fine, continuous modulation: it
can't really PWM, and rapidly toggling it just wears the contacts. A PID loop on top of a
relay would chatter — constantly nudging an actuator that only has "on" and "off" to give.

So the open-hand hold (`HOLD_VAC` in the state machine) uses **bang-bang hysteresis** instead.
The pump stays off until leakage drifts the flex reading past a tolerance band (~±100 ADC
counts around the open-hand target); then it bumps on just long enough to pull the hand back,
and switches off again. One comparison, a tolerance band, done.

The payoff is more than simplicity. There's no integral term to wind up while the system sits
idle at setpoint, the relay clicks a handful of times instead of thousands, and the controller
spends most of the hold drawing almost no power. It's a small decision, but it's the kind that
separates control logic that survives the bench from control logic that only works in
simulation: **match the controller to the actuator you actually have.**
