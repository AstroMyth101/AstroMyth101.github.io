---
title: "Dimming AC the cheap way, and paying for it in harmonics"
date: 2026-07-04
description: "A two-thyristor AC voltage regulator controls power by delaying the firing angle — no DC conversion needed — but the bill comes due as waveform distortion, and the load type decides how steep it is."
topics: ["Power Electronics", Hardware]
---

There's a beautifully cheap way to control AC power: don't convert it to DC at all, just chop a
piece out of every half-cycle. A single-phase **AC voltage regulator** does exactly that with two
**thyristors wired inverse-parallel** — one for the positive half-cycle, one for the negative — and
the only control knob is *when*, within each half-cycle, you let them start conducting. I tested one
on a **240 V RMS** supply, sweeping the firing angle from **0° to 180°.**

The idea is the firing angle, **α**. Fire the thyristor early (small α) and it conducts for almost
the whole half-cycle — high output. Delay it (large α) and it conducts only the tail end — low
output. You're not scaling the voltage, you're **deleting the front of each half-wave** and keeping
the rest. With a purely **resistive** load that's clean enough: voltage and current stay in phase,
both just shrink as α grows, and output power falls with them.

But "delete the front of every half-cycle" is the same thing as "introduce sharp edges into a sine
wave," and sharp edges are **harmonics.** The more I delayed firing, the more chopped the waveform
got and the higher its total harmonic distortion climbed. The power control is real, but it isn't
free — you're trading a clean sinusoid for a controllable but dirty one, and that distortion is
current your supply and transformer carry without it doing any useful work.

An **inductive** load — a motor, which is the realistic case — makes it stranger. The current
**lags** the voltage, and because an inductor stores energy, current keeps flowing *after* the
supply voltage has already crossed zero. So the thyristor doesn't turn off when you'd expect;
conduction stretches past the zero-crossing, the waveform shape changes again, and the active power
delivered drops relative to what the voltage alone would suggest. The load isn't a spectator to the
regulator — it rewrites the regulator's behavior.

So phase-angle control is a bargain with a fine-print clause. It's cheap, direct, and needs no DC
link — which is why it runs lamp dimmers, heaters, fan speeds, and soft-starters — but every degree
of control you buy by delaying the firing is **paid for in harmonic distortion**, and an inductive
load changes the exchange rate. "It controls the power" was never the whole question. "What does it
do to the waveform, on *this* load" is the rest of it.
