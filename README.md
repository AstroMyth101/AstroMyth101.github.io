# Rashid Al-Ma'awali — Portfolio

Personal portfolio for Rashid Al-Ma'awali, a Mechatronics Engineering student at Sultan
Qaboos University focused on embedded control, electropneumatics, robotics, CAD, and
research-oriented soft robotics.

Live site: <https://AstroMyth101.github.io/>

## Stack

Built with [Eleventy](https://www.11ty.dev/) — it outputs plain static HTML (no client
framework ships). Case studies and blog posts are authored in Markdown from shared layouts.

```text
src/
├── _data/site.json        # site-wide metadata
├── _includes/             # base, case-study, and post layouts
├── _images/               # source figures (optimized at build by eleventy-img)
├── assets/                # css, js, fonts, profile photo, OG card
├── projects/*.md          # one file per project (card + case study)
├── blog/*.md              # writing
├── index.njk, resume.njk, 404.njk, sitemap.njk
scripts/og.mjs             # regenerates the 1200x630 social card
eleventy.config.mjs
```

## Develop

```bash
npm install
npm run serve     # http://localhost:8080 with live reload
npm run build     # outputs to _site/
```

## Notes

- Self-hosted variable fonts (Inter + Space Grotesk); responsive `webp` images via
  `@11ty/eleventy-img`; auto dark/light that respects `prefers-color-scheme`.
- `sitemap.xml`, `robots.txt`, an Atom feed (`/feed.xml`), per-page JSON-LD, and an
  Open Graph card are generated/wired automatically.
- Deployed to GitHub Pages by `.github/workflows/pages.yml` (builds with Eleventy on push
  to `main`).
- The public site intentionally omits any phone number, ID, or other private details.

## Possible next steps

- Add real bench/CAD photos to the figure-light case studies (DAQ, Secure Box, Pipe Robot,
  Sumo) as they become available.
- Connect a custom domain.
