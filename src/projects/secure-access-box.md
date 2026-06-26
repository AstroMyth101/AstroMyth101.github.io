---
layout: case-study.njk
order: 4
hasCaseStudy: true
domain: Embedded
cardTitle: "Secure Access Box with Automated Locking"
title: "Secure Access Box with Automated Locking | Rashid Al-Ma'awali"
caseTitle: "Secure Access Box with Automated Locking"
description: "An ATmega8 access-control box written in bare-metal C — it validates user input against a stored code, drives an automated lock, and was schematic-captured and simulated in Proteus."
kicker: "Embedded Systems · ECCE4227 · Fall 2025"
summary: "Bare-metal ATmega8 access control in C — validate a user code, drive an automated lock, captured and simulated in Proteus."
tags: [AVR, ATmega8, "C", Proteus, "Bare-Metal"]
cardTags: [AVR, "C", Proteus]
heroTags: [ATmega8, "C", Proteus, "Embedded"]
facts:
  - term: Course
    detail: "ECCE4227 Embedded Systems (Fall 2025)."
  - term: Platform
    detail: "ATmega8 8-bit AVR, programmed in C."
  - term: Tools
    detail: "Proteus schematic capture and circuit simulation."
sections:
  - eyebrow: Brief
    heading: "Let the right person in, keep everyone else out."
    body: |
      The project is a self-contained access box: take **user input**, check it against a
      stored code, and drive an **automated lock** accordingly — with clear feedback for
      success and failure. Small in scope, but a complete embedded loop from input to actuation.
  - eyebrow: Firmware
    heading: "Bare-metal C on an 8-bit AVR."
    body: |
      The control logic runs directly on an **ATmega8** in C — reading input on the I/O ports,
      comparing it against the stored code, driving the lock output, and signalling state. No
      operating system and no framework: just registers, ports, and timing, which is exactly
      where embedded fundamentals live.
  - eyebrow: Schematic & Simulation
    heading: "Designed and proven in Proteus."
    body: |
      The hardware was schematic-captured in **Proteus**, wiring the microcontroller to the
      input, status indicators, and the locking actuator, then **simulated** to validate the
      access-control behaviour before committing to physical parts.
  - eyebrow: Value
    heading: "The embedded basics that everything else builds on."
    body: |
      Port I/O, program flow, and actuator control on a constrained 8-bit microcontroller —
      the groundwork that later projects (like the ESP32 glove controller) scale up from.
---
