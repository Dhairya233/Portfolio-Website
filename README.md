# Dhairya Shah — Pirate & Ocean Portfolio

A single-page, ship-themed portfolio built from your resume. No build step,
no backend, no frameworks — open `index.html` in a browser and it works.

## How it's organized

```
index.html          Page structure (sections, headings, icons). Rarely needs editing.
css/style.css        All visual design — colors, type, layout, animations.
js/data.js           <-- YOUR CONTENT LIVES HERE. Edit this to update the site.
js/render.js          Turns js/data.js into the HTML you see. No content here.
js/chart-rail.js     Drives the little ship that sails the scroll progress rail.
js/ship-scene.js     The 3D ship + ocean in the hero, built with Three.js.
```

## Adding, editing, or removing content

Everything you'll want to change day-to-day — education, skills, jobs,
projects, achievements, contact links — lives in **`js/data.js`** as one
big, well-commented object. It's plain data: arrays of objects.

- **Add a project:** copy one object inside `treasures: [ ... ]`, paste it
  as a new entry, and fill in the fields.
- **Remove a job:** delete its object from the `voyages: [ ... ]` array.
- **Change your email/phone/links:** edit the `captain: { ... }` block at
  the top.
- **Leave something blank:** an empty string `""` or empty array `[]` is
  fine — the renderer skips it instead of showing an empty gap.

You never need to touch `index.html`, `render.js`, or the CSS for routine
content updates — that's the whole point of splitting it this way. If you
add a *new kind of section* (not just new items in an existing list),
that's the one case where you'd add a new `<section>` in `index.html` and
a matching render step in `render.js`.

## The 3D ship

The hero section is a real WebGL scene (Three.js): a low-poly ship built
from primitive shapes, riding a wave-animated ocean plane, with a
directional "sun" light and gentle mouse parallax. It's fully
self-contained in `js/ship-scene.js` — if a future redesign wants a plain
static hero image instead, delete the `<canvas id="hero-canvas">` and its
script tag and nothing else breaks.

Below the hero, a small ship icon sails down a dotted route on the right
edge of the screen as you scroll (`js/chart-rail.js`), marking your
progress through the sections — the "sailing through chapters of my life"
idea from the brief, done in a way that stays fast and reliable on mobile.

## Deploying it

This is a fully static site — three files types, no server code. You can
drop the whole folder onto any static host:

- **Netlify / Vercel:** drag-and-drop the folder (or connect a GitHub repo).
- **GitHub Pages:** push this folder to a repo and enable Pages on the
  `main` branch.
- **Anywhere else:** any host that can serve static files works — just
  make sure `index.html`, `css/`, and `js/` stay in the same relative
  layout.

## Notes

- Fonts (Pirata One, Cinzel, Crimson Pro) load from Google Fonts;
  Three.js loads from a public CDN (cdnjs). Both need an internet
  connection to load — if you ever want a fully offline copy, those two
  `<link>`/`<script>` tags in `index.html` are the only external
  dependencies to swap for local copies.
- Respects `prefers-reduced-motion` (waves, reveal animations, and camera
  parallax all calm down or stop for visitors who've asked for that).
