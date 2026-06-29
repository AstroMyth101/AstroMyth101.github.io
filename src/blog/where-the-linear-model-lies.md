---
title: "Where the linear model quietly lies"
date: 2026-06-29
description: "Modeling an aeropendulum three ways — nonlinear, linearized, and the real step response — to find exactly where the convenient second-order model stops telling the truth."
topics: [Control, Simulation]
---

An aeropendulum is about the simplest system that still has something to teach: a rod on a pivot
with a propeller on the free end, an Arduino reading the rod angle off a potentiometer and pushing
the motor with PWM. Spin the prop, the rod lifts. One equation runs the whole thing:

> `J·θ̈ + c·θ̇ + m·g·d·sin(θ) = T`

and the entire story lives in that `sin(θ)`.

To get a transfer function you have to make the gravity term behave, so you linearize around the
hanging equilibrium with `sin(θ) ≈ θ`. That turns the model into a clean second-order system,
`θ(s)/T(s) = 1 / (J·s² + c·s + m·g·d)`. From a measured step response you read off the percent
overshoot and the peak time, back out the damping ratio ζ and the natural frequency ωₙ (ζ from the
overshoot, ωₙ from the peak time), and now you have a tidy model you can actually design a
controller against. With a rig this small — a ~70 g pendulum, a 0.3 m rod — the numbers fall out
in an afternoon.

The point of the exercise was to *not* stop there. I put three curves on the same axes: the
**experimental** step response from the real rig, the **linearized** second-order model, and the
**full nonlinear** equation integrated with `ode45` — and scored each against the measured data
with an RMSE. That comparison is the whole experiment; the transfer function is just one of the
three contestants.

Where they agree is reassuring and unsurprising: for small swings near equilibrium, `sin(θ) ≈ θ`
genuinely holds, and all three curves lie almost on top of each other. Where they split is the
useful part. Push to larger angles and the real pendulum — and the nonlinear model tracking it —
feel *less* restoring torque than the linear model assumes, because `sin(θ)` is genuinely smaller
than `θ` out there. The linearized model quietly **overstates the stiffness**: it predicts a
slightly higher frequency and a slightly different overshoot than the hardware actually delivers.
It isn't wrong, exactly. It's **local**, and it goes wrong in a direction you can predict.

That's the lesson I took away, and it generalizes well past propellers on sticks. A linear model is
a loan against the nonlinearity, taken out at one operating point. Fit it, design with it, ship it —
but know the band where it's honest, and keep the nonlinear model on the bench as the thing that
tells you where that band ends. The cheapest way to get burned in control is to trust a linear
model **outside the neighborhood where you fit it.**
