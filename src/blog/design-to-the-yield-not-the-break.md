---
title: "Design to the yield, not to the break"
date: 2026-06-28
description: "Pull a steel rod to destruction and two strength numbers fall out of the curve. The bigger one is the headline. The smaller one is the one you design to."
topics: [Materials, Mechanical Design]
---

Pull a **6 mm** steel rod to destruction in a tensile machine and the stress–strain curve hands you
two numbers people love to confuse. The bar **yielded at about 389 MPa** — the point where it stops
springing back — and it didn't actually **fracture until about 571 MPa**. A roughly **47% gap**
between the stress it survives and the stress where it stops behaving. The tempting headline is the
bigger number. You design to the smaller one.

Here's why the gap is a trap rather than a bonus. Below yield, steel is elastic: load it, it
stretches; unload it, it returns. Above yield it's plastic — every bit of extra stress buys
permanent deformation you can't take back. The bar happily climbs all the way to 571 MPa, but
everything past 389 is the metal slowly failing while still holding load. The strain numbers make it
vivid: strain at yield was about **0.0036**, strain at fracture about **0.24** — the rod stretched
on the order of **sixty times more** getting from yield to break than it did reaching yield in the
first place. That huge "extra strength" is the material coming apart in slow motion.

The aluminium specimen I tested alongside it told the same story — elastic, then a long plastic
march to **~16% elongation** before it let go. Different metal, same shape of curve, same moral: the
ultimate tensile strength is what a coupon survives *once*, on the way to the scrap bin. It is not a
property you get to use.

So the lesson generalizes well past metal: **the failure load is not the design load.** The usable
limit of almost anything — a beam, a bolt, a bracket, even a schedule or a budget — is the point
where its behaviour turns *irreversible*, not the point where it finally breaks. Past yield the part
hasn't failed yet, but it's no longer the part you designed; it's a bent thing that happens to still
be in one piece. Keep your margins below the yield, and the worst case is a part that springs back.
