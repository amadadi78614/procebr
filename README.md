# Procurement Intelligence — v3.0

A clean, drill-down executive presentation for the **Telkom SA × WNS Procurement EBR**.

## The Experience

### L0 · Home view
- A calm central glass sphere with **three pillars anchored around it** — Operations, Transformation, Analytics
- A horizontal **maturity ladder** (L1 → L5) shows where we are (L4 · Governance Automation, FY26) and where we are heading (L5 · Cognitive / Autonomous, FY27+)
- A prominent **Current ↔ Future** toggle changes the lens across the entire view

### L1 · Drill view
- Click any pillar card → drill into that domain
- Breadcrumb back to home, plus the sphere thumbnail in the corner is itself a back-to-home button
- Full KPI grid + initiatives + executive callout for the selected pillar
- Toggle Current/Future to compare the FY26 reality with the FY27+ agentic vision

### Aesthetic
Modern executive dashboard in a powder-blue + turquoise palette — not the dark "command bridge" feel. Calm motion, generous whitespace, glass surfaces with real depth.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the build
```

## Stack

- React 18 · Vite 5 · Tailwind 3 · Framer Motion 11 · Lucide Icons
- Bundle: ~96 KB gzipped

## Source of Truth

All metrics in `src/data/content.js` come from the **EBR placemat** (PR Create 8→88%, Vendor NPS 75→91%, AP91 +14% / +5%, 5 FTE redeployed, 29% YoY PR-to-PO TAT, etc.) and the **agentic future-state slides** ("Local Agentic Architecture", "Daniel the Data Scientist Agent").

Governance content (>R1M PR routing, Zero-Bypass, SAP↔Ariba alignment, work-instruction refresh) is folded into Operations and Transformation, and the L4 Governance Automation level is the **current marker on the maturity ladder**.

## Files

```
src/
├── App.jsx                    Drill-down state machine
├── components/
│   ├── HomeView.jsx           L0 · sphere + pillar badges + maturity ladder
│   ├── DrillView.jsx          L1 · breadcrumb + sphere thumbnail + content
│   ├── CommandSphere.jsx      Calm glass-marble centerpiece
│   ├── PillarBadges.jsx       Three pillar cards anchored to the sphere
│   ├── MaturityLadder.jsx     L1→L5 horizontal stepper
│   ├── PillarDetail.jsx       KPIs + initiatives + callout
│   ├── StateToggle.jsx        Current ↔ Future control
│   ├── Header.jsx             Identity bar + status badges
│   ├── AmbientBackground.jsx  Powder-blue radial gradient + dot grid
│   └── useCounter.js          Animated counter hook
└── data/content.js            All pillar data + maturity model
```

## Presenting

Open in Chrome at 1080p+ resolution. The toggle and the maturity ladder tell the story without you having to say a word — they're the spine.
