---
title: "Measuring a gap you're not allowed to touch"
date: 2026-06-28
description: "How inductive, non-contact displacement sensors read position through oil, dust, and metal chips — and why they have to run on AC instead of a DC voltage divider."
topics: [Instrumentation, Sensors]
---

Some of the most useful measurements in a machine are ones you're not allowed to make by
touching the thing. The clearance between a spinning tool and the workpiece. The radial wobble of
a turbine shaft in its bearing. The position of a hydraulic spool buried in oil. Put a contacting
probe there and you change the very thing you're measuring — or it gets torn off. This is the home
turf of the **inductive (eddy-current) displacement sensor**, and I spent
[a study](/projects/data-acquisition/) digging into why it's built the way it is.

The principle is small. Drive an alternating current through a coil and it sets up a magnetic
field; bring a conductive target close and that field induces **eddy currents** in the target,
which react back on the coil and change its effective inductance. Inductance becomes a stand-in for
distance. Move the target a few microns and the coil's inductance shifts measurably — with nothing
mechanical crossing the gap.

Here's the part that's easy to skip past: you **can't read that with a DC voltage divider.** A
coil's "signal" is its inductance, which is a *reactance* — it only does anything when the current
is changing. So the sensor has to be excited with AC, and the inductance change is teased out as an
**impedance** measurement, classically by sitting the coil in a **bridge** circuit. A balanced
bridge turns a tiny inductance imbalance into a clean differential voltage you can amplify, instead
of trying to spot a fractional-ohm change against the coil's own ~200 Ω resistance. The choice of
AC excitation isn't an implementation detail; it's forced by what you're sensing.

What you buy with all that is robustness. The probe sees a magnetic effect, so oil films, dust, and
metal swarf are basically invisible to it — the same grime that blinds an optical sensor. That's
exactly why these show up in machine-tool clearance monitoring, turbomachinery vibration and
eccentricity, valve and spool position, and automotive suspension-height sensing — dirty,
sealed, high-reliability spots. (Commercial eddy-current systems aren't cheap, either: a new
industrial unit runs well over a thousand dollars, which tells you where they earn their keep.)

The trade-offs are the flip side of the principle: the target has to be conductive metal, and the
useful range is short, because the eddy-current coupling falls off fast with distance.

The takeaway that stuck with me is a small reframe. The moment you're not allowed to touch the
target, you stop thinking in **volts** and start thinking in **impedance** — and a surprising amount
of instrumentation is exactly that move: pick a physical effect that crosses the gap on its own,
then build the whole signal chain around reading it.
