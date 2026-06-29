---
title: "A tamper alarm can't wait for delay() to finish"
date: 2026-06-24
description: "Why a keypad-locked access box on a bare ATmega8 runs a non-blocking state machine instead of blocking delays — so the alarm always wins."
topics: [Embedded, Security]
---

I built a small [secure access box](/projects/secure-access-box/) on a bare **ATmega8 at 8 MHz**
— a keypad PIN, a servo latch, an ultrasonic proximity sensor, and a piezo tamper sensor. The
decision worth writing down isn't any one peripheral; it's refusing to let `_delay_ms()` run the
program.

The first cut had the obvious shape: scan the keypad, check the PIN, swing the servo open, then
`_delay_ms(4000)` to hold the door open before relocking. It demoed fine and was quietly broken.
For those four seconds the processor sits *inside* the delay loop, deaf. You can shake the box,
trip the vibration sensor, and nothing happens — the one event a security box exists to catch is
the one it ignores while unlocked.

So the whole thing got rebuilt around a **non-blocking state machine** on a ~10 ms heartbeat. The
main loop never parks; it ticks about 100 times a second, and on every tick it reads the tamper
ADC channel and the ultrasonic echo, decrements an `unlock_timer` countdown, *then* looks at the
keypad. The unlock hold stopped being a wall and became a counter: the door stays open because
`unlock_timer > 0`, while sensing keeps running underneath it. The tamper alarm latches no matter
what state the box is in — mid-PIN, unlocked, idle — because it has to.

Two smaller choices fell out of the same tight pin budget. A parallel 16×2 LCD wanted six pins
the keypad and servo already needed, so the display went onto an **I²C backpack** (a PCF8574)
behind a hand-written nibble driver — two wires instead of six, and Port B and Port D stayed free
for the 4×4 keypad matrix scan. And the proximity check is **throttled**: the ultrasonic
round-trip is slow relative to the loop, so it only fires every ~20th tick, while the cheap tamper
read happens every single tick. Priority is encoded as *how often you look*.

The original plan even had a fingerprint module for authentication. It couldn't be sourced in
time, so it became a keypad — which meant rewriting the input path from a serial reader into a
matrix scan. Worth saying plainly: the substitution barely touched the architecture, because the
architecture was never about the fingerprint sensor.

That's the real lesson, and it's the same one that shows up on every small MCU I've touched: on a
chip this size **the loop structure is the feature.** A blocking delay isn't a convenience, it's a
window of deafness — so match the shape of your main loop to the event you can't afford to miss,
and let everything else wait its turn.
