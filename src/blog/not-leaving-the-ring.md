---
title: "The sumo robot's real job is staying in the ring"
date: 2026-06-25
description: "A mini-sumo robot has two jobs that sound symmetric and aren't — pushing the opponent out, and not getting pushed out yourself. The second one is the whole design."
topics: [Robotics, Mechanical Design]
---

A [mini-sumo robot](/projects/sumo-robot/) has two jobs that sound like mirror images and aren't:
shove the other robot out of the ring, and don't get shoved out yourself. Spend an afternoon with
the rules and it's obvious which one drives the design. *Finding* the opponent is easy — a pair of
forward infrared sensors handles it. Staying planted while you push something exactly as motivated
as you are is the hard part, and it's a mechanical problem, not a clever one.

So the robot is built to be hard to move. It's a low, panel-built box — a ground plate, a roof, and
four walls, modelled in **Fusion 360** and drawn to dimension in **AutoCAD** — about
**200 × 200 mm** (the mini-sumo size class) with **~60 mm** sides, assembled onto an aluminium base.
Low and boxy isn't an aesthetic. A low center of gravity is what keeps your leading edge from
tipping up when an opponent wedges under it, and a closed, rigid box is what stops the chassis from
flexing and giving up traction at the exact moment you're leaning into a push. Every mechanical
choice is answering the same question: *how do I make myself expensive to move?*

The sensing is deliberately the simple half. Forward **infrared proximity sensors** spot a robot
ahead and the drive turns toward it and pushes — sense, steer, shove, a tight closed loop instead of
a pre-programmed routine. That's enough. The sensors don't have to be brilliant, because the
contest isn't won by the smarter searcher; it's won by the body that's still in the ring when the
shoving stops. I spent my effort accordingly: a sturdy panel chassis I could cut and bolt to a
consistent spec, and just enough sensing to point it at the target.

That's the lesson I took off this one, and it travels well past plywood-and-IR robots: when a
contest is defined by a line you must not cross, the winning move is **defensive**. Figure out what
loses the game — here, leaving the ring — and pour the design into not doing that, before you spend a
single gram on doing the flashy thing better. The robot that wins sumo isn't the one that pushes
hardest. It's the one that's hardest to push.
