---
title: "The shaft that passes a strength check and still breaks"
date: 2026-06-26
description: "Designing the drivetrain between a gasoline engine and an air compressor — why the shaft has to be sized for fatigue, and why every element drags the others along."
topics: [Mechanical, Design]
---

The [project](/projects/speed-reduction-gearbox/) was a portable rig: a **2.4 hp gasoline engine**
spinning at **3800 rpm** driving a single-cylinder **air compressor** that wants about
**1500 rpm**. So a gearbox sits in between — about a **2.53:1** reduction — with shafts, a gear
set, bearings, couplings, and the cap screws that hold the compressor head on. The thing I want to
flag is the trap hiding in the word *strength*.

The compressor torque is not constant. Over a single crank revolution the cylinder pressure
climbs from near-atmospheric to a peak and collapses again, so the torque the output shaft sees is
a **pulse train**, not a steady load. A shaft sized to survive the *peak* torque treated as a
static load can still crack after a few million of those pulses, because the failure mode isn't
yielding — it's **fatigue**. So the output shaft gets designed against a fatigue criterion (a
**Goodman** line that trades off the alternating stress against the mean stress) rather than a
single static factor of safety. "It doesn't yield" is the wrong question; "how many cycles before
a crack grows" is the right one.

A small detail that catches people: the *output* shaft is the one to worry about, not the input.
It turns slower, and for the same transmitted power, slower means **more torque**. The high-speed
input shaft is comparatively lightly loaded.

The other half of the lesson is that you can't design any one element in isolation. You can't size
the shaft until you know the gear diameters, because the gears set the bending loads on it — and
you can't finish the gears until you've picked bearings, and the bearing bore pushes back on the
shaft diameter. It's circular on purpose. You break the loop by *assuming*: take the gears at, say,
4″ and 10″ with a 20° pressure angle, size the shaft against the fatigue load, then come back and
refine once the gears and bearings are real. The gear set itself is **AGMA** full-depth teeth,
hardened steel, sized against that same cyclic load; the head bolts get an infinite-life design
because the head force cycles from **0 to ~1000 lb every revolution**, and
even the gasket choice (confined vs. unconfined) is really a *stiffness* decision about how that
fluctuating load splits between the bolts and the joint.

None of those pieces is hard on its own. What the project actually teaches is the bookkeeping:
**every machine element is a boundary condition for the next one**, and "design" is mostly
iterating the interactions until the numbers stop moving — then designing for the load that
repeats, not the load that's largest once.
