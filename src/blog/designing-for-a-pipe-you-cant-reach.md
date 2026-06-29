---
title: "Designing for a pipe you can't reach"
date: 2026-07-02
description: "The mechanical design of a pipe-inspection robot — why it's split into sealed modules and braced by an articulated linkage instead of built to a single fixed diameter."
topics: [Mechanical, CAD]
---

Some machines are defined entirely by where they have to go. A
[pipe-inspection robot](/projects/pipe-inspection-robot/) has to travel down the inside of a pipe,
carry a camera to whatever's wrong in there, and come back out — in a space no hand and no eye can
reach directly. I modelled the mechanical design of one as a full **SolidWorks assembly**, and
almost every decision is a reaction to the same constraint: *you can't get in there to fix it.*

The robot is built as **discrete modules** rather than one carved body — a camera module up front,
left and right sealed electronics-and-sensor compartments forming the trunk, a cylindrical body
tying them together, and the linkage frame. The reason is serviceability: a part you can swap on the
bench is worth far more than a clever monolith you have to scrap when one feature cracks.

The electronics live in **sealed compartments**, and that isn't tidiness. A pipe is a hostile place
— moisture, debris, whatever the line was carrying — and that grime is the enemy of every board and
sensor on the robot. So the design's whole job there is to keep the environment and the electronics
on opposite sides of a wall, because once the robot is metres down a pipe, nothing inside it can be
protected by hand.

The piece I'd defend hardest is the **articulated linkage arms.** Pipes aren't one diameter, and a
robot sized to exactly one bore is useless in the next pipe and rattling loose in a slightly bigger
one. The linkage lets the arms push out against the wall and **brace** — keeping the body centred
and the camera pointed straight down the axis — while still folding to adapt as the bore changes.
One body covers a *family* of pipes because the mechanism absorbs the variation instead of the spec
sheet pretending it away. The camera itself sits behind a protective **dome and lens holder**: the
one part that has to see is also the one part most exposed, a small contradiction you resolve in
geometry.

The thread through all of it: when you can't reach a machine while it's working, design shifts from
"make it function" to "make it **survive and adapt unattended.**" Modularity, sealing, and a
mechanism that fits a range of pipes instead of a single number — none of those make the robot do
more. They make it keep doing it somewhere you can't follow.
