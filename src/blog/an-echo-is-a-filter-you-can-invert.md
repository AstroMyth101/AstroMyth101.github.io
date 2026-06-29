---
title: "An echo is a one-line filter, and undoing it is its inverse"
date: 2026-07-07
description: "Adding an echo to a speech clip in MATLAB is a single difference equation — and removing it again is literally the inverse system, which is the whole idea of a transfer function made audible."
topics: [Signals, DSP]
---

The most satisfying part of a [signals project](/projects/signals-systems-dsp/) was the moment the
algebra started making sound. The setup is a recorded speech clip — **7000 samples at 8192 Hz**, so
about **0.855 s** of audio — and the task is to add an echo, then take it back out.

Adding the echo is almost embarrassingly small. An echo is just the signal plus a quieter, delayed
copy of itself:

> `y[n] = x[n] + α·x[n − N]`

A scale factor **α** for how loud the echo is, a delay **N** for how far back it sits. With a delay
of **N = 750 samples** — about **92 ms** at this sample rate — you get a distinct slap-back, and the
output runs **7750 samples (0.946 s)**: longer than the input by exactly the delay, because the tail
of the echo hangs past the end of the original. That single line *is* an **FIR filter**, with
transfer function `H₁(z) = 1 + α·z⁻ᴺ`. The `z⁻ᴺ` is the delay, written in one symbol.

Removing the echo is where it clicks. If adding it multiplied the signal's spectrum by `H₁(z)`, then
undoing it just has to **divide** by the same thing — run the audio through the inverse system:

> `H₂(z) = 1 / (1 + α·z⁻ᴺ)`

That's an **IIR filter** (it feeds back on itself), and by construction `H₁(z)·H₂(z) = 1`. Cascade
the echo-adder and the echo-remover and you get the identity: the signal comes out exactly as it
went in. The echo and its cancellation aren't two clever tricks — they're the **same equation read
in two directions.**

The reframe that stuck with me is that a transfer function isn't bookkeeping; it's a thing you can
*hear*. "Multiply by `H`" is an effect, "divide by `H`" is its undo, and a stable, invertible system
is one where the undo actually exists. Once an echo is a one-line filter, every other filter —
the sensor smoothing and telemetry cleanup in the embedded work — stops being mysterious and starts
being the same move on a different signal.
