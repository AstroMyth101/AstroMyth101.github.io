---
layout: case-study.njk
order: 3
hasCaseStudy: true
domain: Instrumentation
cardTitle: "AC-Bridge Displacement Sensor (NCDT)"
title: "AC-Bridge Displacement Sensor (NCDT) | Rashid Al-Ma'awali"
caseTitle: "AC-Bridge Displacement Sensor (NCDT)"
description: "An instrumentation design that turns a non-contact displacement transducer's tiny inductance change into a clean 0–100 mV DC reading — through a mixed L–C AC bridge, a quantified linearity-error budget, and a full signal-conditioning chain."
kicker: "Instrumentation & Measurements · MCTE4145 · Fall 2025"
summary: "Turning a non-contact displacement transducer's tiny inductance change into a clean 0–100 mV DC reading — via an L–C AC bridge, a linearity-error budget, and full signal conditioning."
tags: [Instrumentation, "AC Bridge", "Signal Conditioning", Calibration, "Error Analysis"]
cardTags: [Instrumentation, "AC Bridge", "Signal Conditioning"]
heroTags: [NCDT, "AC Bridge", "Signal Conditioning", "Error Analysis"]
facts:
  - term: Course
    detail: "MCTE4145 Instrumentation & Measurements (Fall 2025)."
  - term: Sensor
    detail: "Non-contact displacement transducer (NCDT), inductance L(x) = L₀(1 + kx)."
  - term: Spec
    detail: "0–100 mV DC output, displacement-proportional, total linearity error ≈ 1.5% FS."
  - term: Methods
    detail: "AC-bridge analysis, linearity-error budget, analog signal-conditioning design."
sections:
  - eyebrow: Brief
    heading: "A voltage is not a measurement until you design the whole chain."
    body: |
      The task was to take a **non-contact displacement transducer (NCDT)** — whose inductance
      shifts only slightly as a target moves — and design the full instrumentation path that
      turns that shift into a **stable, low-noise DC voltage** fit for measurement. The
      requirements set the bar: a single inductive sensing element, an output **proportional to
      displacement**, a fixed **0–100 mV** range, minimised noise, **quantified** linearity
      error, and complete signal conditioning.
  - eyebrow: The Sensor
    heading: "Inductance that tracks displacement."
    body: |
      The NCDT is modelled as `L(x) = L₀(1 + kx)`, where `L₀` is the null-position inductance
      and `k` the sensitivity. Deliberately, **only one** inductive element is placed in the
      bridge — trading a little sensitivity for far less magnetic noise, permeability drift, and
      inductive-mismatch error than a multi-coil arrangement.
  - eyebrow: The Bridge
    heading: "A mixed L–C AC bridge converts inductance to voltage."
    body: |
      The sensor sits in a **mixed L–C AC bridge** — the variable inductance `L(x)`, a fixed
      `L₀`, a precision NP0/C0G capacitor `C`, and a precision resistor `R` — excited by a
      sinusoidal source. The differential output works out to `V₀ = Vₛ · kx / (1 − (kx)²)`,
      which for small displacement collapses to the clean linear law **`V₀ ≈ Vₛ · kx`**.
  - eyebrow: Error Budget
    heading: "Quantify the nonlinearity instead of hand-waving it."
    body: |
      Linearity is treated as a number, not an adjective. The small-displacement approximation
      contributes ≈ **1.01%** error at `kx = 0.1`; air-gap reluctance adds a magnetic
      nonlinearity of ≈ **0.5% FS**; together the design carries a **total linearity error of
      ≈ 1.5% of full scale** — stated honestly so the measurement's trustworthiness is known up
      front.
  - eyebrow: Signal Conditioning
    heading: "Rectify, scale, and filter to a clean 0–100 mV."
    body: |
      The AC bridge output is conditioned in three stages:

      - a **precision full-wave rectifier** (super-diode) recovers magnitude without the diode
        forward-voltage error a passive rectifier would add;
      - a **difference amplifier (G = 15)** scales the rectified signal so full-scale
        displacement maps to the target **100 mV**;
      - a **2nd-order active low-pass filter (f_c = 20 Hz)** strips the AC carrier ripple and
        high-frequency noise, leaving a steady DC reading.
  - eyebrow: Value
    heading: "Measurement fundamentals, done properly."
    body: |
      Sensor modelling, bridge analysis, an explicit error budget, and a complete
      conditioning chain — the unglamorous core of instrumentation, and the difference between
      *reading* a sensor and actually *measuring* something with it.
---
