---
layout: case-study.njk
order: 1
featured: true
hasCaseStudy: true
domain: Robotics
cardTitle: "Soft Robotic Rehabilitation Glove Controller"
repo: "https://github.com/AstroMyth101/Soft-Robotic-Glove-Portfolio"
thumbnail: "./src/_images/projects/soft-robotic-glove/system-diagram.png"
title: "Soft Robotic Rehabilitation Glove Controller | Rashid Al-Ma'awali"
caseTitle: "Soft Robotic Rehabilitation Glove Controller"
description: "A bench-validated electropneumatic controller for a soft robotic rehabilitation glove (ESP32, PID + finite-state machine, flex-sensor feedback) — built as an MCTE5255 course project and expanded as funded research."
kicker: "Flagship · Course Project → Funded Research · 2026"
summary: "Portable electropneumatic controller (ESP32, PID + finite-state machine, flex-sensor feedback) for assisted finger motion — built for a course, then expanded as a Research Assistant."
tags: [ESP32, "C++", PID, FSM, Electropneumatics, Flex Sensors, "ROS 2", micro-ROS]
cardTags: [ESP32, "C++", PID, Electropneumatics, "ROS 2"]
heroTags: [ESP32, "C++", Electropneumatics, "Flex Sensors", PID, FSM]
actions:
  - label: "Public portfolio repository"
    url: "https://github.com/AstroMyth101/Soft-Robotic-Glove-Portfolio"
    external: true
  - label: "Contact"
    url: "/#contact"
facts:
  - term: Role
    detail: "Led the detailed control-system design in a four-person team; now sole Research Assistant expanding it."
  - term: Course → Research
    detail: "MCTE5255 Mechatronics Engineering Design (Spring 2026) → Research Assistant, College of Engineering."
  - term: Platform
    detail: "ESP32 (LOLin D32), pressure + vacuum pumps, 3/2 solenoid valve, 4.5\" flex sensor."
  - term: Status
    detail: "Bench-validated research platform. Not clinically approved and not human-tested."
sections:
  - eyebrow: Context
    heading: "A course project that earned its way into funded research."
    body: |
      This started as the **MCTE5255 Mechatronics Engineering Design** project — a four-person
      team building a controller for a *provided* soft robotic rehabilitation glove. I led the
      detailed control-system design. After the course, I was recruited as a **Research
      Assistant** in the College of Engineering to take the controller further under a funded
      grant on soft robotic actuators for tele-rehabilitation.

      The brief was narrow on purpose: don't redesign the glove, design the controller that
      makes it move *safely, repeatably, and observably* — and prove it on the bench before
      anyone talks about a patient.
  - eyebrow: Problem
    heading: "Pneumatic soft actuators are nonlinear; open-loop timing can't be trusted."
    body: |
      Air is compressible and the glove's pressure-to-motion response has delay and hysteresis,
      so a fixed inflation time does not give a repeatable finger posture. The controller has to
      *close the loop* on finger bending, sequence inflation and vacuum-assisted extension
      without ever fighting itself, and stay inside hard safety limits — all on a compact,
      battery-powered, well-documented platform.
  - eyebrow: System Architecture
    heading: "Embedded controller → drivers → pumps & valve → soft glove → flex-sensor feedback."
    image: "./src/_images/projects/soft-robotic-glove/system-diagram.png"
    imageAlt: "Block diagram of the final controller: Host PC and ROS 2 link to an ESP32 running PID, which drives a MOSFET stage to the pressure and vacuum pumps, through a 3/2 solenoid valve and air-distribution manifold to the soft glove, with flex-sensor feedback."
    caption: "Final control architecture — one pump, one vacuum source, and a single 3/2 solenoid valve, with flex-sensor feedback closing the loop."
    body: |
      A centralized ESP32 coordinates sensing, control, actuation, and telemetry. Low-power
      logic is electrically isolated from the higher-current pneumatic loads.

      | Subsystem | Component | Role |
      | --- | --- | --- |
      | Controller | ESP32 (LOLin D32) | FSM, PID, 12-bit ADC, telemetry |
      | Pressure | 12 V diaphragm pump | Inflation / flexion |
      | Vacuum | 6 V mini pump (370A) | Active extension |
      | Driver | Cytron MDD10A | 20 kHz PWM pump drive |
      | Routing | 3/2 solenoid valve + 1-ch relay | Pressure ↔ vacuum switching |
      | Feedback | 4.5" flex sensor | Finger-bend estimate (ADC) |

      The whole control unit comes in **under 750 g** and **within the 50 OMR budget**
      (~41 OMR of commercial parts).
  - eyebrow: Control Logic
    heading: "A four-state machine with closed-loop inflation and hysteresis-held extension."
    body: |
      Firmware (C++ / Arduino-ESP32) runs a ~50 Hz loop with 5-sample sensor averaging and a
      four-state cycle:

      - **INFLATING** — unidirectional PID (`Kp 4.0 · Ki 0.1 · Kd 1.5`) drives the pressure
        pump toward the flexion target (≈ 2800 ADC), with anti-windup and a deadband so it
        doesn't hum near setpoint.
      - **HOLD_FLEX** — a low maintenance PWM counters slow leakage to hold the posture.
      - **VACUUMING** — pressure off, vacuum on to return toward the open hand (≈ 1850 ADC).
      - **HOLD_VAC** — bang-bang hysteresis (±100 ADC) keeps the hand open.

      A safety watchdog cuts pump power immediately on overshoot or above an **ADC ceiling of
      3500**, and the state machine structurally prevents pressure and vacuum from ever driving
      against each other.
  - eyebrow: Bench Results
    heading: "The full rehabilitation cycle ran repeatably under instrumentation."
    body: |
      Tests were run on the physical prototype in the SQU Mechatronics lab and streamed over
      serial telemetry (sensor · state · PWM · relay) at 115200 baud.

      | Test | Target | Result |
      | --- | --- | --- |
      | Flex-sensor calibration | ADC ≈ 1850 / 2800 | Met |
      | PID inflation | Smooth rise, no overshoot | Met |
      | Vacuum extension | Returns to open-hand target | Met |
      | Full cycle ×3 | Consistent completion | Met |
      | Safety cutoff | PWM → 0 at ADC ≥ 3500 | Met |
      | Budget & mass | ≤ 50 OMR, < 750 g | Met |
  - eyebrow: Research Extension
    heading: "What the Research Assistant phase adds."
    body: |
      The funded work extends the validated controller toward:

      - **ROS 2 / micro-ROS** integration for motion-pattern adjustment and real-time logging.
      - **EMG** intention detection (as a supervisory enable) and **IMU** posture sensing.
      - **Five-finger** independent channels and an **ADC-to-joint-angle** calibration curve.
      - **Hardware safety** — physical emergency stop and pressure-relief — required before any
        human-subject testing.
  - eyebrow: Limitations
    heading: "Honest boundaries."
    body: |
      This is a research and bench-validation platform — not a clinically approved device,
      not patient-ready, and not human-tested. In the course phase, EMG intention detection,
      full five-finger control, and ROS 2 were scoped as future work rather than delivered.
      The value here is a working, documented controller and the test data that backs it up.
---
