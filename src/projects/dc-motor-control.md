---
layout: case-study.njk
order: 8
hasCaseStudy: true
domain: Controls
cardTitle: "DC-Motor Modeling & Speed Control"
thumbnail: "./src/_images/projects/dc-motor-control/closed-loop.jpg"
title: "DC-Motor Modeling & Speed Control | Rashid Al-Ma'awali"
caseTitle: "DC-Motor Modeling & Speed Control"
description: "Hardware system identification and closed-loop speed control of a DC servo motor — measured with NI-DAQ, modelled as a first-order transfer function, and documented as an IEEE-format paper."
kicker: "Control Systems · MCTE4450 · Spring 2026"
summary: "Hardware system-ID and closed-loop speed control of a DC servo motor — identified from NI-DAQ step tests and validated on the rig, written up as an IEEE paper."
tags: ["Control Systems", "System Identification", "NI-DAQ", LabVIEW, MATLAB]
cardTags: ["Control Systems", "System ID", "NI-DAQ"]
heroTags: ["Control Systems", "System ID", "NI-DAQ", "Transfer Functions"]
facts:
  - term: Course
    detail: "MCTE4450 Control Systems Engineering (Spring 2026), Dr. Faical Mnif."
  - term: Team
    detail: "Three-person project; work shared across identification, control, and write-up."
  - term: Methods
    detail: "Step-response identification, first-order transfer-function modelling, Final Value Theorem, Routh-Hurwitz stability."
  - term: Tools
    detail: "NI-DAQ acquisition, LabVIEW control rig, MATLAB analysis."
sections:
  - eyebrow: Brief
    heading: "Identify a real DC motor, then close the loop on its speed."
    body: |
      Rather than simulate an idealized motor, this project is **grounded entirely in
      hardware measurements**: identify the motor from a real step test, build a model from
      the data, then design and validate a speed controller on the same rig — and report only
      numbers that came off the bench.
  - eyebrow: System Identification
    heading: "A 0.1 V step gives a clean first-order plant."
    body: |
      A 0.1 V step drives the motor while the tacho-generator output is logged through
      **NI-DAQ at 100 samples/s**. The response is first-order, so the plant reduces to a
      single gain and time constant.

      | Quantity | Value |
      | --- | --- |
      | DC gain, K | 36.52 (tacho-V / input-V) |
      | Time constant, τ | 0.070 s |
      | Open-loop pole | −14.3 rad/s |
      | Identified model | G(s) = 36.52 / (0.070 s + 1) |
  - eyebrow: Closed-Loop Control
    heading: "Proportional feedback makes the motor ~3.5× faster."
    image: "./src/_images/projects/dc-motor-control/closed-loop.jpg"
    imageAlt: "LabVIEW front panel showing the closed-loop speed rig tracking a square-wave reference: the motor output follows the commanded steps each period."
    caption: "Closed-loop rig tracking a square-wave speed reference in LabVIEW — output follows each commanded step."
    body: |
      Driving the closed loop with a **1.979 V square-wave** reference (2 s period), the
      controlled motor tracks each step. Feedback collapses the time constant and tightens
      the response:

      | Metric | Open loop | Closed loop |
      | --- | --- | --- |
      | Time constant | 0.070 s | 0.020 s |
      | Rise time (10–90%) | — | 0.030 s |
      | Speed regulation | — | 20–28% under load |
  - eyebrow: Analysis & Write-up
    heading: "Theory applied to measured parameters, reported IEEE-style."
    body: |
      The **Final Value Theorem** predicts the steady-state output and the **Routh-Hurwitz**
      criterion confirms closed-loop stability — both applied to the *identified* parameters
      rather than textbook values. The full study is documented as an IEEE-format paper, with
      every figure traceable to a hardware experiment.
---
