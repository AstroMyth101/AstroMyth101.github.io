---
layout: case-study.njk
order: 11
hasCaseStudy: true
domain: Software
cardTitle: "Soft-Glove Engineering Dashboard"
title: "Soft-Glove Engineering Dashboard | Rashid Al-Ma'awali"
caseTitle: "Soft-Glove Engineering Dashboard"
description: "An interactive React/Vite dashboard built from the soft robotic rehabilitation glove design report — requirements ranking, concept trade-off selection, system architecture, and a live motion-tracking demo."
kicker: "Software · MCTE5255 · Spring 2026"
summary: "A React/Vite single-page app that turns the rehabilitation-glove design report into an interactive engineering brief — requirements, concept trade-offs, architecture, and a live demo."
tags: [React, Vite, JavaScript, Recharts, "Framer Motion", "Data Viz", "UI/UX"]
cardTags: [React, Vite, Recharts, "Data Viz"]
actions:
  - label: "Soft glove controller →"
    url: "/projects/soft-robotic-glove/"
facts:
  - term: Course
    detail: "MCTE5255 Mechatronics Engineering Design (Spring 2026)."
  - term: Stack
    detail: "React + Vite, Recharts, Framer Motion, shadcn/ui, Lucide icons."
  - term: Role
    detail: "Designed and built the single-page app and its data model."
  - term: Companion to
    detail: "The Soft Robotic Rehabilitation Glove controller project."
sections:
  - eyebrow: Brief
    heading: "Turn a dense design report into something you can click through."
    body: |
      The soft-glove design report carries a lot of decisions — customer requirements, a QFD
      ranking, weighted concept selection, and a final architecture. This project distils that
      report into an **interactive single-page dashboard** so a reviewer can explore the
      reasoning instead of reading thirty pages of tables.
  - eyebrow: What It Shows
    heading: "Requirements, trade-offs, architecture, and a live demo."
    body: |
      The app is organised into four views:

      - **Requirements** — the prioritised customer needs and the measurable engineering
        metrics they map to, taken straight from the QFD.
      - **Architecture** — clickable concept cards for the **control**, **communication**, and
        **pneumatic** subsystems, each with its strengths, trade-offs, and a score; selecting a
        concept updates the chosen system architecture.
      - **Demo dashboard** — sliders for target flexion, assist level, and EMG threshold drive a
        live **Recharts** plot of target vs. measured finger angle, alongside a system-state and
        safety-checklist readout.
      - **Overview** — the project facts, joint motion targets, and the open → flex → hold →
        release assist cycle at a glance.
  - eyebrow: Engineering
    heading: "A small, honest front-end built around the report's data."
    body: |
      Built with **React + Vite**, charts with **Recharts**, motion with **Framer Motion**, and
      a component kit (shadcn/ui + Lucide). The interactive plot is driven by a **semi-empirical
      model**, not live hardware telemetry — the goal is to communicate the design and let a
      reviewer feel the trade-offs, not to claim a real-time link to the glove. It is the
      front-end companion to the [embedded controller](/projects/soft-robotic-glove/).
  - eyebrow: Value
    heading: "The portfolio's clearest piece of software engineering."
    body: |
      Most of my projects are hardware-first; this one is the opposite — interface design,
      state management, and data visualisation. It also doubles as a presentation tool for the
      glove work, which is exactly what a design review needs.
---
