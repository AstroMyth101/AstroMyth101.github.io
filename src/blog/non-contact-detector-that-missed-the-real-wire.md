---
title: "The voltage detector that only worked on bare wire"
date: 2026-06-30
description: "A non-contact AC voltage detector built three times, failing three different ways — and why the prototype that finally 'worked' still couldn't read the wire it was actually for."
topics: [Electronics, Hardware]
---

A non-contact AC voltage detector is the cheap pen-shaped tool an electrician waves near a wire to
check it's live without touching it. For an electric-circuits project I built one from scratch — an
antenna, three transistor gain stages, an LED, and a buzzer. The part worth writing down isn't the
schematic that's on every datasheet; it's that I built it **three times and it failed three
different ways.**

The principle is small. A live mains wire radiates a weak 50/60 Hz electric field, and an antenna
held near it picks up a tiny voltage by **capacitive coupling** — far too small to light anything.
So the signal runs into three **2N3904** transistors (β ≈ 100) in cascade, biased by a 100k/10k/1k
resistor chain, until it's big enough to drive the LED and a piezo buzzer off a **9 V** battery. I
sized the bias network in a **QUCS** simulation first, aiming at ordinary **220 V AC**.

**Prototype one** I soldered point-to-point. Dead. The current through the chain never got high
enough to trigger the indicators, and the likeliest culprit was the antenna — too short to couple
enough field in the first place. A detector that can't gather the signal can't amplify its way out
of the problem.

**Prototype two** went onto a PCB with copper traces, and failed in the exact opposite direction:
one transistor burned out from **excessive current.** So within two builds I'd hit both failure
modes of the same circuit — starved in one, cooked in the other — which is a blunt lesson in how
completely a three-stage amplifier rides on its bias being right *on the bench*, not just right in
the simulator.

**Prototype three** went on a breadboard, and it finally lit up. Held near a **bare, exposed
conductor**, it detected the AC cleanly. And then it failed the only test that mattered: held near a
**normal insulated wire** — the kind you'd actually be checking — it read nothing. The field that
leaks past insulation at a working distance was weaker than my gain chain could pull out of the
noise.

That's the one that stuck. The demo condition (bare wire, close, strong field) and the real
condition (insulated wire, everyday distance) were **different problems**, and passing the easy one
told me almost nothing about the hard one. A non-contact sensor lives or dies on its *weakest
realistic* signal, not its strongest convenient one — so the spec that matters was never "can it
detect AC," it's "can it detect AC through the insulation, at the distance, the job actually has."
Antenna length, bias, gain — everything upstream is just trying to earn that one margin.
