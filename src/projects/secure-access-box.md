---
layout: case-study.njk
order: 4
hasCaseStudy: true
domain: Embedded
cardTitle: "Secure Access Box with Automated Locking"
thumbnail: "./src/_images/projects/secure-access-box/bench-build.jpg"
title: "Secure Access Box with Automated Locking | Rashid Al-Ma'awali"
caseTitle: "Secure Access Box with Automated Locking"
description: "A bare-metal ATmega8 access-control box in C — keypad PIN and RFID authentication, a servo-driven lock, ultrasonic proximity warning, and a vibration tamper alarm. Designed and simulated in Proteus, then built and tested on the bench."
kicker: "Embedded Systems · ECCE4227 · Fall 2025"
summary: "Bare-metal ATmega8 access control in C — keypad PIN + RFID, a servo lock, and proximity/tamper sensing. Simulated in Proteus, then built on the bench."
tags: [AVR, ATmega8, "C", RFID, Proteus, "Bare-Metal"]
cardTags: [AVR, "C", RFID, Proteus]
heroTags: [ATmega8, "C", RFID, "Servo Lock", Proteus]
facts:
  - term: Course
    detail: "ECCE4227 Embedded Systems (Fall 2025)."
  - term: Platform
    detail: "ATmega8 8-bit AVR, programmed in bare-metal C."
  - term: Build
    detail: "Proteus schematic + circuit simulation, then a working breadboard prototype."
  - term: I/O
    detail: "4×4 keypad + RC522 RFID · servo lock · HC-SR04 + vibration sensor · 16×2 LCD · status LEDs & buzzer."
sections:
  - eyebrow: Brief
    heading: "Let the right person in — and notice when someone tampers."
    body: |
      The box grants access two ways — a **keypad PIN** or an **RFID card** — and on a valid
      credential drives a **servo lock** open, with clear success/failure feedback on a 16×2
      LCD and status LEDs. On top of authentication it *watches its surroundings*: an
      **ultrasonic** sensor flags someone getting too close, and a **vibration** sensor raises
      a tamper alarm. A small box, but a complete embedded loop: sense → decide → actuate →
      signal.
  - eyebrow: Firmware
    heading: "Bare-metal C on an 8-bit AVR."
    body: |
      The control logic runs directly on an **ATmega8** in C — scanning the keypad, reading the
      **RC522 RFID** reader over SPI, comparing credentials against the stored code, driving the
      servo lock, and sequencing the LCD, LEDs, and buzzer. No operating system and no
      framework: just registers, ports, timers, and interrupts, which is exactly where embedded
      fundamentals live.
  - eyebrow: Sensing & Feedback
    heading: "Proximity warnings and a tamper alarm, not just a lock."
    body: |
      An **HC-SR04** ultrasonic sensor measures distance and warns on close approach; a
      **vibration** sensor triggers a tamper alarm through the buzzer. State is reported three
      ways — the LCD prompts (`ENTER PIN`, `ACCESS GRANTED`), red/green LEDs for locked/unlocked,
      and a serial log (`System Ready`, `Warning: Proximity!`, `ALARM: Vibration!`,
      `Wrong PIN`) — so the box's behaviour is observable while it runs.
  - eyebrow: Schematic & Simulation
    heading: "Designed and proven in Proteus."
    image: "./src/_images/projects/secure-access-box/proteus-simulation.png"
    imageAlt: "Proteus schematic of the access box: an ATmega8 wired to a 4×4 keypad, 16×2 LCD showing ENTER PIN, HC-SR04 ultrasonic sensor, vibration sensor, buzzer, RFID reader, and red/green status LEDs, with a virtual terminal logging system events."
    caption: "Proteus capture & simulation — ATmega8 driving the keypad, LCD, ultrasonic and vibration sensors, RFID, buzzer, and status LEDs, validated before any wiring."
    body: |
      The full system was **schematic-captured in Proteus** and **simulated** end to end —
      keypad entry, the `ENTER PIN` → `ACCESS GRANTED` flow, proximity warnings, and the
      vibration alarm — so the firmware and wiring were verified on virtual hardware before
      committing to physical parts.
  - eyebrow: Bench Build
    heading: "Then built and tested for real."
    image: "./src/_images/projects/secure-access-box/bench-build.jpg"
    imageAlt: "Breadboard prototype of the access box on the lab bench: ATmega8 with an AVR programmer, a 4×4 keypad, a 16×2 LCD, an HC-SR04 ultrasonic sensor, jumper wiring, and a servo-actuated cardboard enclosure standing in for the locked box."
    caption: "The breadboard prototype on the bench — ATmega8, keypad, LCD, ultrasonic sensor, and a servo-actuated enclosure, matching the simulated design."
    body: |
      The design didn't stop at simulation. It was **wired up on a breadboard** and run on real
      hardware — keypad, LCD, ultrasonic and vibration sensors, and a servo actuating a physical
      enclosure — closing the loop from a Proteus schematic to a working prototype.
  - eyebrow: Value
    heading: "The embedded basics that everything else builds on."
    body: |
      Port I/O, SPI, timing, interrupts, and actuator control on a constrained 8-bit
      microcontroller — taken all the way from schematic to a tested bench prototype. This is
      the groundwork the later ESP32 glove controller scales up from.
---
