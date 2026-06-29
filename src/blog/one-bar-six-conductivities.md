---
title: "One brass bar, six different conductivities"
date: 2026-06-27
description: "Measuring the thermal conductivity of a single uniform brass bar should give one number. I got six — and the spread, not the average, is the part worth reading."
topics: [Heat Transfer, Measurement]
---

The setup is about as clean as an experiment gets: a **25 mm** brass bar heated at one end and
water-cooled at the other, with **eight thermocouples** spaced **15 mm** apart reading the
temperature falling along it. Fourier's law, `Q̇ = k·A·ΔT/Δx`, rearranges to hand you the thermal
conductivity `k` from the heater power and the temperature slope. One uniform bar, one material —
so it should give one `k`.

It gave six. Splitting each run into a hot, intermediate, and cold section and doing two power
levels (**14.4 W** at 120 V, then **28.9 W** at 170 V), the computed conductivities came out
**151.7, 169.3, 166.0** and **156.3, 176.7, 154.9 W/m·K** — averaging to **162.1**, a respectable
brass number. The tidy thing to do is report that average and move on. The honest thing is to look
at the **~16% spread** and ask why one bar disagrees with itself.

The spread isn't random noise you average away — it's the model leaking. `Q̇ = k·A·ΔT/Δx` quietly
assumes *all* the heater power flows one-dimensionally straight down the bar, with no heat escaping
the sides, perfect thermal contact at the bolted joints, and a true steady state. None of those is
exactly true. Heat bleeds off the surface, so less power reaches the cold section than the hot one.
The joints between sections add contact resistance — an extra temperature drop that isn't
conduction through brass at all, but gets blamed on it. "Steady state" is a judgment call about when
the readings stopped drifting. Each violated assumption pushes a different section's `k` a different
way, and the scatter is the sum of those pushes.

Notice what doubling the power did: it roughly doubled the temperature gradient — clean, linear,
reassuring — but it did **not** collapse the spread between sections. That's the tell. Random error
would have shuffled; a structural error stays. The disagreement is built into the assumptions, not
the instruments.

So the lesson I took away is about what to do with a quantity that's supposed to be single-valued
and isn't: **the spread is the real error bar.** Averaging six conductivities to 162.1 produces a
number that looks more certain than the experiment earned, and throws away the one thing the data
was actually telling me — which of my idealizations I'd just spent. The average is the answer; the
scatter is the truth.
