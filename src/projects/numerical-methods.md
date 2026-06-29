---
layout: case-study.njk
order: 10
hasCaseStudy: true
domain: Computational
chip: MATLAB
cardTitle: "Numerical Methods for Engineers"
title: "Numerical Methods for Engineers | Rashid Al-Ma'awali"
caseTitle: "Numerical Methods for Engineers"
description: "A MATLAB suite implementing the core numerical toolkit from scratch — root-finding, direct and iterative linear solvers, regression, interpolation, and integration — built for MEIE4183 (Fall 2024)."
kicker: "Numerical Methods · MEIE4183 · Fall 2024"
summary: "From-scratch MATLAB implementations of the core numerical toolkit: root-finding, direct and iterative linear solvers, regression, interpolation, and numerical integration."
tags: [MATLAB, "Numerical Methods", "Root-Finding", "Linear Systems", Regression, Integration]
cardTags: [MATLAB, "Numerical Methods", "Linear Systems"]
facts:
  - term: Course
    detail: "MEIE4183 Numerical Methods (Fall 2024)."
  - term: Team
    detail: "Five-person project; methods implemented and verified collaboratively."
  - term: Approach
    detail: "Each algorithm coded from its definition in MATLAB — no black-box solvers."
  - term: Coverage
    detail: "Root-finding, linear systems, regression, interpolation, integration."
sections:
  - eyebrow: Brief
    heading: "Build the numerical toolkit by hand, not by calling a solver."
    body: |
      The point of the project was to *implement* the methods, not to lean on MATLAB's built-in
      solvers: write each algorithm from its definition, run it on engineering data, and check
      the result against a known answer. The work spans seven problems covering the four
      pillars of a numerical-methods course — root-finding, linear systems, curve fitting, and
      integration.
  - eyebrow: Root-Finding
    heading: "Bracketing and open methods on nonlinear equations."
    body: |
      Nonlinear roots are solved several ways and compared for convergence: the **bisection**
      method (guaranteed but slow), **fixed-point iteration**, and the **secant** method
      (faster, and no derivative required). Each routine tracks its own iteration count and
      approximate relative error down to a set tolerance.
  - eyebrow: Linear Systems
    heading: "Direct and iterative solvers for Ax = b."
    body: |
      Systems of equations are solved with **Gauss elimination with partial pivoting**, **LU
      decomposition**, and the iterative **Gauss–Seidel** method, plus a routine that uses the
      LU factors to form a full **matrix inverse**. Pivoting and iteration behaviour are checked
      against MATLAB's reference results.
  - eyebrow: Fitting & Interpolation
    heading: "Regression and Lagrange interpolation on measured data."
    body: |
      A **multiple linear regression** routine fits a response to two predictors through the
      normal equations (`B = (XᵀX)⁻¹ XᵀY`) and reports the coefficients, predictions, and
      residuals. A **third-order Lagrange interpolation** estimates a thermistor's resistance
      between calibration points — for example, the resistance at 33 °C from a four-point
      resistance–temperature table.
  - eyebrow: Integration
    heading: "Composite Simpson's 1/3 rule."
    body: |
      Definite integrals are evaluated with the **composite Simpson's 1/3 rule**, choosing the
      number of intervals to balance truncation error against effort.
  - eyebrow: Value
    heading: "A reusable, verified reference for later engineering work."
    body: |
      The result is a small library of trustworthy, well-understood routines — the same methods
      that sit underneath the control, signal-processing, and modelling work elsewhere in this
      portfolio. Implementing them from first principles turns their failure modes — pivoting,
      convergence, step size — into something concrete rather than abstract.
---
