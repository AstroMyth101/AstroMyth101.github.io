// Live instrument canvases. "scope" renders a running two-channel trace with
// phosphor persistence inside the hero bench scope; "flatline" renders the 404
// no-signal line that pulses when the pointer sweeps it. Without JS (or under
// prefers-reduced-motion) the static SVG traces underneath stay in charge —
// these canvases fade in on top only when they are actually alive.
(() => {
  'use strict';

  const canvases = document.querySelectorAll('canvas[data-canvas]');
  if (!canvases.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable = window.matchMedia('(hover: hover)');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  // Resolve a CSS color expression (custom properties, color-mix) to rgb numbers.
  function resolveColor(expression) {
    const probe = document.createElement('span');
    probe.style.color = expression;
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    const match = resolved.match(/[\d.]+/g) || [0, 0, 0];
    return { r: +match[0], g: +match[1], b: +match[2] };
  }

  function rgba({ r, g, b }, alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function buildPalette() {
    return {
      bg: resolveColor('color-mix(in srgb, var(--bg) 70%, #000 30%)'),
      accent: resolveColor('var(--accent)'),
      warm: resolveColor('var(--accent-warm)'),
    };
  }

  function createInstrument(canvas) {
    const mode = canvas.dataset.canvas;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || !host) return;

    let palette = buildPalette();
    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let inView = true;
    let live = false;
    let t = 0;
    let lastNow = 0;

    // Pointer state (scope: amplitude bump; flatline: pulse source)
    const pointer = { x: 0, active: 0, targetActive: 0, smoothX: 0 };
    const pulses = [];
    let lastPulseAt = -Infinity;

    function resize() {
      // Layout size, not getBoundingClientRect: the boot animation scales the
      // scope with a transform, which must not distort the canvas backing store.
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      if (!w || !h) return;
      width = w;
      height = h;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // Repaint the base so a resize never flashes transparent
      ctx.fillStyle = rgba(palette.bg, 1);
      ctx.fillRect(0, 0, width, height);
    }

    function drawGraticule() {
      ctx.strokeStyle = rgba(palette.accent, 0.10);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < 8; i += 1) {
        const x = Math.round((width / 8) * i) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let i = 1; i < 4; i += 1) {
        const y = Math.round((height / 4) * i) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }

    function strokeGlow(color, brightAlpha) {
      ctx.strokeStyle = rgba(color, 0.16);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.strokeStyle = rgba(color, brightAlpha);
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    function drawScope() {
      // Phosphor persistence: fade rather than clear
      ctx.fillStyle = rgba(palette.bg, 0.24);
      ctx.fillRect(0, 0, width, height);
      drawGraticule();

      pointer.active += (pointer.targetActive - pointer.active) * 0.06;
      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.08;

      // ⚡ Bolt: Hoist invariant derivations out of the canvas render loop
      const bumpAmp = pointer.active * 1.1;
      const ch1Phase1 = t * 0.0016;
      const ch1Phase2 = -t * 0.0034;
      const ch2Phase = -t * 0.0011;

      // CH1: composite sine (flex signal) with a Gaussian bump near the pointer
      const mid1 = height * 0.42;
      const a1 = height * 0.15;
      const a2 = height * 0.055;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const bump = 1 + bumpAmp * Math.exp(-((x - pointer.smoothX) ** 2) / 9800); // 2 * 70^2 = 9800
        const y = mid1
          + a1 * bump * Math.sin(x * 0.021 + ch1Phase1)
          + a2 * bump * Math.sin(x * 0.047 + ch1Phase2);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      strokeGlow(palette.accent, 0.95);

      // CH2: soft square wave (pressure/valve state)
      const mid2 = height * 0.74;
      const a3 = height * 0.1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const y = mid2 + a3 * Math.tanh(3.2 * Math.sin(x * 0.012 + ch2Phase));
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      strokeGlow(palette.warm, 0.8);

      // Trigger cursor at the pointer
      if (pointer.active > 0.02) {
        ctx.strokeStyle = rgba(palette.accent, 0.14 * pointer.active);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pointer.smoothX + 0.5, 0);
        ctx.lineTo(pointer.smoothX + 0.5, height);
        ctx.stroke();
      }
    }

    function drawFlatline() {
      ctx.fillStyle = rgba(palette.bg, 0.3);
      ctx.fillRect(0, 0, width, height);

      // ⚡ Bolt: Pre-calculate pulse attributes outside the inner loop
      const activePulses = pulses.map(pulse => {
        const age = t - pulse.born;
        const decay = Math.max(1 - age / 1600, 0);
        return {
          px: pulse.x + age * 0.14,
          amp1: decay * height * 0.32,
          amp2: decay * height * 0.1,
        };
      });

      const mid = height / 2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        let y = mid + (Math.random() - 0.5) * 1.2;
        for (const pulse of activePulses) {
          const d = x - pulse.px;
          // A narrow cardiac-style spike: sharp peak with a small leading dip
          y -= pulse.amp1 * Math.exp(-(d ** 2) / 72); // 2 * 6^2 = 72
          y += pulse.amp2 * Math.exp(-((d + 16) ** 2) / 50); // 2 * 5^2 = 50
        }
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      strokeGlow(palette.accent, 0.9);

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        if (t - pulses[i].born > 1600) pulses.splice(i, 1);
      }
    }

    function frame(now) {
      rafId = 0;
      if (!running) return;
      const dt = lastNow ? Math.min(now - lastNow, 64) : 16;
      lastNow = now;
      t += dt;
      if (mode === 'flatline') drawFlatline(); else drawScope();
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reducedMotion.matches || !inView || document.hidden) return;
      running = true;
      lastNow = 0;
      rafId = requestAnimationFrame(frame);
      if (!live) {
        // The static SVG boot animation plays first; the live trace fades in over it
        const delay = mode === 'scope' ? 2200 : 500;
        window.setTimeout(() => {
          if (running) {
            live = true;
            canvas.classList.add('is-live');
          }
        }, delay);
      } else {
        canvas.classList.add('is-live');
      }
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    resize();
    if ('ResizeObserver' in window) {
      new ResizeObserver(resize).observe(host);
    } else {
      window.addEventListener('resize', resize);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
          if (inView) start(); else stop();
        }
      }, { threshold: [0, 0.05, 0.2] }).observe(canvas);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        stop();
        live = false;
        canvas.classList.remove('is-live');
      } else {
        start();
      }
    });

    document.addEventListener('themechange', () => {
      palette = buildPalette();
    });

    if (hoverCapable.matches) {
      host.addEventListener('pointermove', (event) => {
        const rect = host.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.targetActive = 1;
        if (mode === 'flatline' && t - lastPulseAt > 420) {
          lastPulseAt = t;
          pulses.push({ x: pointer.x, born: t });
        }
      }, { passive: true });
      host.addEventListener('pointerleave', () => {
        pointer.targetActive = 0;
      });
    }

    start();
  }

  // Status readout cycling (404): decorative, aria-hidden in markup
  const statusLine = document.querySelector('[data-status-cycle]');
  if (statusLine && !reducedMotion.matches) {
    const messages = ['NO TRIGGER', 'CHECK PROBE GROUND', 'SIGNAL LOST', 'ROUTE OPEN-CIRCUIT'];
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % messages.length;
      statusLine.textContent = messages[index];
    }, 3600);
  }

  if (reducedMotion.matches) {
    // Do nothing now, but arm the instruments in case the preference changes
    reducedMotion.addEventListener('change', () => {
      if (!reducedMotion.matches && !document.querySelector('canvas[data-canvas].is-armed')) {
        canvases.forEach((canvas) => {
          canvas.classList.add('is-armed');
          createInstrument(canvas);
        });
      }
    }, { once: true });
  } else {
    canvases.forEach((canvas) => {
      canvas.classList.add('is-armed');
      createInstrument(canvas);
    });
  }
})();
