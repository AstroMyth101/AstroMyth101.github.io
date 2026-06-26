---
layout: case-study.njk
order: 7
hasCaseStudy: true
domain: Controls
cardTitle: "Half-Car Suspension Modeling & Simulation"
thumbnail: "./src/_images/projects/half-car-suspension/ride-response.png"
title: "Half-Car Suspension Modeling & Simulation | Rashid Al-Ma'awali"
caseTitle: "Half-Car Suspension Modeling & Simulation"
description: "State-space modelling and Simulink simulation of a half-car suspension — capturing body bounce and pitch, and the ride felt at the driver's seat over a road bump."
kicker: "Modeling & Simulation · MCTE4150 · Fall 2025"
summary: "State-space modelling and Simulink simulation of a half-car suspension, evaluating the ride at the driver's seat over a single road bump."
tags: [MATLAB, Simulink, "State-Space", "Vehicle Dynamics"]
cardTags: [MATLAB, Simulink, "State-Space"]
heroTags: [MATLAB, Simulink, "State-Space", "Vehicle Dynamics"]
facts:
  - term: Course
    detail: "MCTE4150 Modeling & Simulation (Fall 2025)."
  - term: Approach
    detail: "Equations of motion → state-space → Simulink time-domain simulation."
  - term: Tools
    detail: "MATLAB and Simulink."
sections:
  - eyebrow: Brief
    heading: "How does a road bump feel at the driver's seat?"
    body: |
      A half-car model captures what a quarter-car can't: not just **bounce** (the body
      heaving up and down) but **pitch** (the body rocking front-to-back), plus the
      independent hop of the front and rear wheels. The goal was to model that behaviour and
      evaluate the ride a driver actually experiences over a road disturbance.
  - eyebrow: The Model
    heading: "Equations of motion, cast into state space."
    body: |
      The sprung body and the front/rear unsprung masses, coupled by suspension
      springs/dampers and tyre stiffness, give a set of coupled second-order equations of
      motion. These are assembled into a **state-space** representation so the whole system
      can be simulated and analysed with standard linear tools.
  - eyebrow: Simulation
    heading: "A single bump, and the ride that follows."
    image: "./src/_images/projects/half-car-suspension/ride-response.png"
    imageAlt: "Simulated driver/seat time response to a single road bump: displacement rings up and then decays over several seconds while velocity stays small."
    caption: "Driver/seat response to a single bump — the displacement oscillates and decays as the suspension dissipates the disturbance."
    body: |
      Driving the model with a single road bump and watching the **driver/seat displacement
      and velocity** shows the suspension doing its job: an initial deflection that rings down
      and settles, rather than a harsh single jolt. The state-space form makes it easy to swap
      in different spring/damper values and compare the resulting ride.
  - eyebrow: Value
    heading: "From equations on paper to a model you can tune."
    body: |
      The project connects derivation, linear-systems theory, and simulation into one
      workflow — a model you can actually push road inputs through and read ride comfort off
      of, which is the point of modelling a suspension in the first place.
---
