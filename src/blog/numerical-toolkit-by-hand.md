---
title: "Writing the numerical toolkit by hand"
date: 2026-07-05
description: "Implementing root-finders, linear solvers, regression, interpolation, and integration from their definitions instead of calling a built-in — and what that makes visible."
topics: [Computational, MATLAB]
---

For a [numerical-methods project](/projects/numerical-methods/) the rule was the interesting part:
**implement the methods, don't call the solver.** No `fzero`, no backslash operator, no `polyfit` —
write each algorithm from its definition in MATLAB, run it on real data, and check the answer
against a reference. It sounds like reinventing the wheel, and it is, right up until the wheel
teaches you how it rolls.

Take root-finding. The same cubic — `4x³ − 11x² + 15x − 5` — solved four ways: **bisection**,
**false position**, **fixed-point iteration**, and the **secant** method. Calling one black-box
root-finder, they'd all look identical: a number comes out. Implementing them, the differences
become physical. Bisection *cannot* fail to converge if you bracket a sign change, but it crawls,
halving the interval each step. The secant method needs no derivative and races by comparison — and
will happily fly off to nowhere if the function misbehaves. "Guaranteed but slow" versus "fast but
fragile" stops being a sentence in a textbook and becomes a thing you watch happen in an iteration
counter.

The linear-systems work made the same point louder. Solving `Ax = b` with **Gauss elimination**, I
had to add **partial pivoting** myself — and the row swap isn't bookkeeping, it's the line between a
clean answer and dividing by a near-zero pivot and watching the solution detonate. Then **LU
decomposition** (reusing the factors to also build a full inverse) and the iterative
**Gauss–Seidel** method, which converges only if the system cooperates. You learn what "the system
cooperates" means by writing the loop that does or doesn't settle.

The rest filled in the corners: a **multiple linear regression** through the normal equations
(`B = (XᵀX)⁻¹XᵀY`), reporting coefficients and residuals; a **third-order Lagrange interpolation**
pulling a thermistor's resistance at **33 °C** out of a four-point calibration table; and
definite integrals by the **composite Simpson's 1/3 rule**, where the only real decision is how many
intervals buy enough accuracy without wasted effort.

The takeaway is small and it stuck: a built-in solver hides exactly the things that bite you —
pivoting, convergence, step size, the bracket you forgot to check. Writing the method by hand
doesn't make you faster than the library; it makes the library's **failure modes** concrete, so the
next time `Ax = b` returns garbage you know which of your assumptions just broke.
