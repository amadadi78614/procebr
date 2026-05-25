# Procurement Intelligence Command Center — v2.0

A cinematic, single-page React presentation for the **Telkom SA × WNS Procurement EBR**.

## The Experience

A central animated **Command Sphere** sits at the heart of the screen, ringed by four orbital pillars:

- **Operations** — P2P operational excellence
- **Transformation** — digital workforce & integration
- **Analytics** — decision intelligence
- **Governance** — controls, policy & risk

Click any pillar to reveal its content panel below the stage. A prominent **Current ↔ Future** toggle swaps the entire view between the FY26 reality (real EBR numbers) and the FY27+ agentic vision (Local Agentic Architecture, "Daniel the Data Scientist Agent", touchless operations).

No routing, no scroll — just morph transitions and a single focal stage.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the build
```

## Stack

- React 18 · Vite 5 · Tailwind 3 · Framer Motion 11 · Lucide Icons
- Bundle: ~98 KB gzipped

## Source of Truth

All metrics in `src/data/content.js` come from the **EBR placemat** (PR Create 8→88%, Vendor NPS 75→91%, AP91 +14% / +5%, 5 FTE redeployed, 29% YoY PR-to-PO TAT, etc.) and the **agentic future-state slides** from the deck.

## Files

```
src/
├── App.jsx                      Sphere-centric main layout
├── components/
│   ├── CommandSphere.jsx        Central animated sphere
│   ├── OrbitalPillars.jsx       Four pillars + connecting beams
│   ├── PillarDetail.jsx         Detail panel (KPIs + initiatives + callout)
│   ├── StateToggle.jsx          Current ↔ Future hero control
│   ├── Header.jsx               Identity bar
│   ├── ExecutiveNarrative.jsx   Floating narrative panel
│   ├── AmbientBackground.jsx    Grid + particles + scan line
│   └── useCounter.js            Animated counter hook
└── data/content.js              All pillar data (current + future per pillar)
```

## Presenting

For a boardroom: open in Chrome, press F11 for full-screen, default to a 1080p+ projector. Cursor over the **Current/Future toggle** is the hero gesture — it tells the story by itself.
