---
layout: case-study.njk
order: 2
hasCaseStudy: true
domain: Mechanical
cardTitle: "Speed Reduction Gearbox Design"
thumbnail: "./src/_images/projects/gearbox/schematic.png"
title: "Speed Reduction Gearbox Design | Rashid Al-Ma'awali"
caseTitle: "Speed Reduction Gearbox Design"
description: "A 2.53:1 reduction gearbox linking a 3800 rpm gasoline engine to a reciprocating air compressor — shafts, gears, bearings, and head bolts sized for infinite life using DE-Goodman fatigue and AGMA methods."
kicker: "Machine Design · MCTE4102 · Fall 2025"
summary: "A 2.53:1 reduction gearbox coupling a 3800 rpm engine to a reciprocating air compressor — shafts, gears, bearings, and head bolts each sized for infinite life."
tags: [SOLIDWORKS, "Fusion 360", "DE-Goodman", AGMA, Fatigue, Bearings]
cardTags: [SOLIDWORKS, "DE-Goodman", AGMA, Bearings]
heroTags: ["DE-Goodman", AGMA, "SAE 1020", "AISI 4140", SOLIDWORKS]
facts:
  - term: Course
    detail: "MCTE4102 Machine Design for Mechatronics (Fall 2025)."
  - term: Team
    detail: "Three-person project; contributions shared evenly across shafts, gears, bearings, and fasteners."
  - term: Methods
    detail: "DE-Goodman fatigue criterion, AGMA 2001-D04 gear strength, Shigley's design data."
  - term: Tools
    detail: "Hand calculations, SOLIDWORKS and Fusion 360 modelling."
sections:
  - eyebrow: Brief
    heading: "Couple a 2.4 hp engine at 3800 rpm to a 1.6 hp compressor at 1500 rpm."
    image: "./src/_images/projects/gearbox/schematic.png"
    imageAlt: "Gearbox schematic: engine couples to the input shaft and pinion (Gear 1), which meshes with the larger output gear (Gear 2) on the output shaft to the compressor, both shafts carried on ball bearings in a mounted housing."
    caption: "System layout — engine → input shaft & pinion → output gear & shaft → compressor, on ball bearings in a mounted housing."
    body: |
      The compressor sets the load, so the gearbox is a **2.53:1** reduction (3800 → 1500 rpm).
      The project sizes the full drivetrain — two **shafts**, a **spur-gear set**, the
      **bearings**, and the compressor **head bolts** — as one coherent machine rather than
      four disconnected homework problems, and every component targets a design factor of
      safety of **2.5** for infinite life.
  - eyebrow: The Load
    heading: "A reciprocating compressor delivers a brutal, fluctuating torque."
    image: "./src/_images/projects/gearbox/torque-cycle.png"
    imageAlt: "Compressor torque versus crank angle for one cycle: a large positive peak near 575 lb-in, a negative dip near -175 lb-in, and a smaller secondary peak."
    caption: "Compressor torque over one cycle — the alternating load that drives the fatigue design (Tmax 585, Tmin −175 lb-in)."
    body: |
      The torque cycle (max **585**, min **−175 lb-in**) gives a mean of 205 and an
      alternating component of 380 lb-in. That alternating load — not the peak — is what
      governs fatigue, so the shafts are sized against **fully reversed bending plus
      fluctuating torsion**, not a single static worst case.
  - eyebrow: Shafts
    heading: "DE-Goodman fatigue sizing in SAE 1020 cold-drawn steel."
    body: |
      Each shaft is modelled as a simply supported beam with the gear load at mid-span, then
      sized with the **DE-Goodman** criterion using Marin-corrected endurance limits
      (surface, size, and 99.9% reliability factors). A second iteration adds the real
      shoulder-fillet stress-concentration factors and shaft self-weight.

      | Shaft | Diameter | Method | Resulting FOS |
      | --- | --- | --- | --- |
      | Input (engine side) | 1.125 in | DE-Goodman | ≈ 4.6 |
      | Output (compressor side) | 1.1875 in | DE-Goodman | ≈ 4.4 |
  - eyebrow: Gears
    heading: "AGMA bending and contact checks on a 32 : 81 spur set."
    body: |
      A **Pd 8**, 20° spur set (32-tooth pinion, 81-tooth gear, 1.25 in face) in **AISI 4140**
      nitrided steel (230 HB) gives the 2.53 ratio while clearing interference. Both members
      are checked for AGMA **bending** and **contact (pitting)** strength at a ~3980 ft/min
      pitch-line velocity, Quality Index 10.

      | Member | Teeth | Bending SF | Contact SF |
      | --- | --- | --- | --- |
      | Pinion | 32 | ≈ 5.4 | ≈ 2.1 |
      | Gear | 81 | ≈ 6.7 | ≈ 3.3 |
  - eyebrow: Bearings & Fasteners
    heading: "Standardized bearings and a fatigue-safe head-bolt joint."
    body: |
      - **Bearings** — single-row deep-groove **02-35** ball bearings on both shafts (sized
        for a 20,000-hour life with an application factor); standardizing on one bearing
        simplifies spares and assembly.
      - **Head bolts** — six **1/4"-20 UNC Grade 5** screws clamp the compressor head with a
        **confined gasket** to keep joint stiffness high; a 75%-proof preload (~2027 lb) gives
        a fatigue factor of ≈ 1.68 and a separation factor of ≈ 20 against the 0–1000 lb
        pressure load.
  - eyebrow: Outcome
    heading: "An integrated drivetrain, every component above the 2.5 target."
    body: |
      The result is a complete, manufacturable gearbox: standard shaft and bearing sizes,
      a single well-characterized gear pair, and a sealed compressor joint — each verified
      against the same infinite-life design factor. The components were modelled in SOLIDWORKS
      and Fusion 360 to confirm fit and assembly.
---
