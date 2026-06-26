// Generates the 1200x630 Open Graph social card. Run: node scripts/og.mjs
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";

const display = readFileSync("src/assets/fonts/space-grotesk-variable.woff2").toString("base64");
const body = readFileSync("src/assets/fonts/inter-variable.woff2").toString("base64");

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'Display'; src: url(data:font/woff2;base64,${display}) format('woff2'); font-weight: 600; }
      @font-face { font-family: 'Body'; src: url(data:font/woff2;base64,${body}) format('woff2'); font-weight: 500; }
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#08111f"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.16" cy="0.12" r="0.7">
      <stop offset="0" stop-color="#38bdf8" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.9" cy="0.95" r="0.6">
      <stop offset="0" stop-color="#f59e0b" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="24" y="24" width="1152" height="582" rx="30" fill="none" stroke="#22324a" stroke-width="2"/>
  <text x="84" y="156" font-family="Body" font-size="25" fill="#38bdf8" letter-spacing="4">MECHATRONICS ENGINEERING · MUSCAT, OMAN</text>
  <text x="80" y="312" font-family="Display" font-size="96" font-weight="600" fill="#e5edf7">Rashid Al-Ma'awali</text>
  <text x="84" y="382" font-family="Body" font-size="36" fill="#9fb0c7">Embedded control · Electropneumatics · Robotics</text>
  <rect x="84" y="438" width="120" height="6" rx="3" fill="#38bdf8"/>
  <text x="84" y="556" font-family="Body" font-size="26" fill="#9fb0c7">AstroMyth101.github.io</text>
</svg>`;

mkdirSync("src/assets/og", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("src/assets/og/og-default.png");
console.log("Wrote src/assets/og/og-default.png");
