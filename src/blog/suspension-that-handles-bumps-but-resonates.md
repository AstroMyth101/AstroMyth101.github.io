---
title: "A suspension that aces the bump and still resonates"
date: 2026-07-06
description: "Modeling a half-car suspension as a 4-DOF state-space system — where a single speed bump looks perfectly damped, but sweeping the road frequency exposes a pitch resonance hiding underneath."
topics: [Control, Simulation]
---

A [half-car suspension model](/projects/half-car-suspension/) is the smallest one that tells the
truth about ride. A quarter-car only knows **bounce** — the body heaving straight up and down. Add
the second axle and you get **pitch**, the body rocking front-to-back, plus the front and rear
wheels hopping on their own. That's **four degrees of freedom**, and the whole project lives in the
gap between what a single test shows and what the system can actually do.

I derived the equations of motion with the **Lagrange formulation** — generalized coordinates,
kinetic and potential energy, dissipation for the dampers — and assembled them into a
**state-space** model in MATLAB. (As a sanity check on the derivation, the same physics went into a
**bond graph** in 20-sim; when two different formalisms agree, you start trusting the equations.)
Then you drive it with road inputs and read the ride off the chassis.

Input one: a **single speed bump.** The model behaves beautifully. The chassis deflects, rings down
through a couple of damped oscillations, and settles — exactly what a suspension is for, turning a
sharp shock into a soft, decaying wobble. If I'd stopped there, the conclusion would have been "it
works," and it would have been wrong.

Input two: a **continuous sinusoidal road**, swept across frequencies. Here the pleasant picture
breaks. At specific excitation frequencies the **pitch** motion blows up — large angular
oscillations the transient bump test never hinted at, because that test simply never excited those
frequencies. The suspension that perfectly absorbs one isolated shock has a resonance sitting in its
frequency response, waiting for a road that happens to ring it.

That's the lesson worth keeping, and it generalizes far past cars: **a time-domain test can pass
while a frequency-domain failure hides behind it.** A single input excites a single slice of a
system's behavior. The half-car only confessed its pitch resonance when I stopped poking it once and
started sweeping it — which is the entire reason you build a model you can sweep instead of just a
rig you can bump.
