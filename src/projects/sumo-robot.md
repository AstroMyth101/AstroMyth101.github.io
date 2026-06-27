---
layout: case-study.njk
order: 6
hasCaseStudy: true
domain: Robotics
cardTitle: "Sumo Robot"
thumbnail: "./src/_images/projects/sumo-robot/robot-built.jpg"
title: "Sumo Robot | Rashid Al-Ma'awali"
caseTitle: "Sumo Robot"
description: "A panel-built mini-sumo competition robot — designed in Fusion 360 and AutoCAD as a ~200 mm box chassis with an infrared sensor aperture, then built on an aluminium base with proximity sensors to find and push its opponent."
kicker: "Robotics · Sumo Competition"
summary: "A panel-built mini-sumo robot designed in Fusion 360 + AutoCAD and built on an aluminium base with infrared proximity sensors to find and shove its opponent out of the ring."
tags: ["Fusion 360", AutoCAD, Robotics, "Sensor Feedback", CAD]
cardTags: ["Fusion 360", AutoCAD, Robotics]
heroTags: ["Fusion 360", AutoCAD, Robotics, "IR Sensing"]
facts:
  - term: Context
    detail: "Mini-sumo robot built for a robotics competition."
  - term: Tools
    detail: "Fusion 360 (3D model) and AutoCAD (panel drawings) — \"finalSumo_uMAX\"."
  - term: Chassis
    detail: "Panel-built box, ~200 × 200 mm footprint with ~60 mm walls."
  - term: Sensing
    detail: "Infrared proximity sensors for opponent detection (closed-loop)."
sections:
  - eyebrow: Brief
    heading: "Find the opponent, and shove it out of the ring."
    body: |
      A sumo robot has one job: detect the other robot and push it out of the ring without
      driving itself out. That makes it a tight little **mechatronics** problem — a low, sturdy
      chassis, enough traction to push, and **sensors** to know where the opponent is. This is
      the design and build of that robot.
  - eyebrow: The Design
    heading: "A ~200 mm box chassis, modelled panel by panel."
    image: "./src/_images/projects/sumo-robot/front-panel.png"
    imageAlt: "AutoCAD drawing of the robot's front panel: a 200 by 60 mm plate with a 110 mm rounded slot (the aperture for the infrared sensors) and a small notch at the bottom centre."
    caption: "Front panel (AutoCAD) — the 200 × 60 mm face, with the rounded aperture cut for the forward-looking IR sensors."
    body: |
      The robot was modelled in **Fusion 360** and detailed as flat panels in **AutoCAD** — a
      ground plate, roof, and four walls that assemble into a **~200 × 200 mm** box (the
      mini-sumo size class) with **~60 mm** sides. The front face carries a rounded **sensor
      aperture** so the infrared sensors can see straight ahead, and the base is cut to seat the
      drive and walls. Drawing each panel to dimension means the body could be cut and assembled
      to a consistent spec.
  - eyebrow: Sensing
    heading: "Infrared eyes on the opponent."
    body: |
      Forward-facing **infrared proximity sensors** let the robot detect an opponent in front of
      it and drive toward it — a simple **closed-loop** behaviour (sense → steer → push) rather
      than blind, pre-programmed motion. It's the same sensor-feedback thinking that runs through
      the rest of my work, shrunk down to a 20 cm box.
  - eyebrow: The Build
    heading: "From panels to a robot that actually pushes."
    image: "./src/_images/projects/sumo-robot/robot-built.jpg"
    imageAlt: "The built sumo robot: an aluminium base plate carrying two yellow cylindrical infrared proximity sensors at the front and wiring, with a low box body and a temporary cardboard top cover."
    caption: "The built robot — an aluminium base with the forward IR proximity sensors and drive, under a low box body (the top here is a temporary working cover)."
    body: |
      The design was built into real hardware: an **aluminium base plate**, the forward IR
      sensors, a low wheeled drive, and the panel body — shown here mid-build with a temporary
      cover. Rough edges and all, it's a working robot rather than a render: the point of a
      sumo bot is that it has to survive contact and keep pushing.
  - eyebrow: Value
    heading: "A complete small robot, design through build."
    body: |
      Mechanical CAD, sensor selection, and a physical build that had to work under contact —
      a compact end-to-end robotics project that ties mechanical design to sensor-driven
      behaviour.
---
