// Three primary pillars + maturity model.
// Governance is folded into the maturity ladder (L1-L5) since L4 Governance
// Automation is itself the *maturity level achieved* — not a separate domain.

export const PILLARS = [
  // ── OPERATIONS ───────────────────────────────────────────────
  {
    id: 'operations',
    title: 'Operations',
    subtitle: 'P2P Operational Excellence',
    icon: 'Gauge',
    angle: 0, // top
    accent: 'cyan',
    current: {
      tagline: 'FY26 — measurable, repeatable gains across PR-to-Pay.',
      headline: 'Foundation Operational',
      summary:
        'Compounding gains across requisition, release, acknowledgement, vendor onboarding, payment terms and supplier engagement. The CoE now operates as a sustained engine of value pass-back, with governance controls embedded structurally.',
      kpis: [
        { label: 'PR Create Coverage', from: 8, to: 88, suffix: '%', delta: '+80pp' },
        { label: 'PO Release', from: 78, to: 100, suffix: '%', delta: '+22pp' },
        { label: 'Vendor Onboarding', from: 7.8, to: 2.9, suffix: ' d', delta: '−63%', reverse: true },
        { label: 'Vendor NPS (VOS)', from: 75, to: 91, suffix: '%', delta: '+16pp' },
        { label: 'Spot Buy TAT', from: 0, to: 48, suffix: '%', delta: 'faster' },
        { label: 'Non-Ack PO', from: 0, to: 36, suffix: '%', delta: 'reduced', reverse: true },
        { label: '>R1M PR Routing', from: 0, to: 100, suffix: '%', delta: 'governed' },
        { label: 'FTE Redeployed', from: 0, to: 5, suffix: '', delta: 'value pass-back' },
      ],
      initiatives: [
        'PR Create Bot · 8% → 88% scope coverage',
        'PO Release Bot · 78% → 100% (Release 31 & 37)',
        'PO Acknowledgement Bot · 64% auto-captured',
        'AP91 payment terms · +14% Qty / +5% Value shifted to standard',
        'Vendor onboarding cycle · 7.8 → 2.9 days through ARS priority monitoring',
        'IT Spend Governance · PRs routed by value and category',
        'Zero-Bypass control architecture enforced',
      ],
      callout:
        '5 FTE redeployed · Vendor NPS 75% → 91% · 29% YoY PR-to-PO TAT improvement',
    },
    future: {
      tagline: 'FY27+ — touchless operations powered by autonomous AI agents.',
      headline: 'Touchless & Autonomous',
      summary:
        'Operations evolve into a self-driving capability. AI agents perceive demand from rollout plans and capex forecasts, validate budget and policy, source and negotiate, then issue, match and pay — with humans intervening only on exceptions.',
      kpis: [
        { label: 'Touchless P2P', from: 0, to: 95, suffix: '%', delta: 'target' },
        { label: 'Predictive Demand', from: 0, to: 12, suffix: ' wk', delta: 'lead time' },
        { label: 'Auto-Sourcing', from: 0, to: 70, suffix: '%', delta: 'spot buys' },
        { label: 'Invoice Match', from: 0, to: 98, suffix: '%', delta: 'first pass' },
        { label: 'Exception Rate', from: 22, to: 4, suffix: '%', delta: '−82%', reverse: true },
        { label: 'Strategic Hours', from: 30, to: 75, suffix: '%', delta: 'team time' },
        { label: 'Self-Service PRs', from: 0, to: 60, suffix: '%', delta: 'NL interface' },
        { label: 'Cycle Time', from: 100, to: 18, suffix: '%', delta: '−82%', reverse: true },
      ],
      initiatives: [
        'Agentic PR creation · natural-language request → validated PR',
        'Predictive demand detection · 6–12 week forward visibility',
        'Auto-budget & policy validation pre-PO',
        'OCR + e-Invoicing end-to-end with auto-match',
        'AI-routed exceptions to the right human in seconds',
        'Continuous supplier health & lead-time learning',
      ],
      callout:
        '"Need identified → AI validates → sources → negotiates → PO → paid." Humans manage strategy and exceptions only.',
    },
  },

  // ── TRANSFORMATION ───────────────────────────────────────────
  {
    id: 'transformation',
    title: 'Transformation',
    subtitle: 'Digital Workforce & Integration',
    icon: 'Workflow',
    angle: 120, // bottom-right
    accent: 'aqua',
    current: {
      tagline: 'FY26 — bots, SAP and integrations operating as one chain.',
      headline: 'Integrated Digital Workforce',
      summary:
        'The automation journey has moved beyond isolated bots into a coordinated digital workforce. PR Create, PO Release, PO Ack, SAP ROMC, TBI integration and UiPath Enterprise now operate as one orchestrated chain, with SAP and Ariba rationalised behind it.',
      kpis: [
        { label: 'PR→PO TAT YoY', from: 0, to: 29, suffix: '%', delta: 'improvement' },
        { label: 'Overall Coverage', from: 0, to: 93, suffix: '%', delta: 'achieved' },
        { label: 'PO Release 31', from: 0, to: 98, suffix: '%', delta: 'RPA-driven' },
        { label: 'PO Release 37', from: 0, to: 100, suffix: '%', delta: 'RPA-driven' },
        { label: 'Live Bots', from: 0, to: 8, suffix: '', delta: 'orchestrated' },
        { label: 'SAP↔Ariba Align.', from: 0, to: 86, suffix: '%', delta: 'rationalised' },
        { label: 'Work Instructions', from: 0, to: 13, suffix: '', delta: 'refreshed' },
        { label: 'UiPath Enterprise', from: 0, to: 100, suffix: '%', delta: 'migrated' },
      ],
      initiatives: [
        'UiPath Community → Enterprise migration · complete',
        'BOT ↔ SAP ROMC integration for PR-to-PO chain',
        'SAP TBI integration for Telkom data flows',
        'PR Create Bot scope expansion · 13 work instructions refreshed',
        'PO Release Bot expanded to Release strategies 31 & 37',
        'SAP ↔ Ariba contract & spend alignment',
      ],
      callout:
        'RPA 76% · SAP 15% · Manual 9% — value chain coverage now an integrated 93%.',
    },
    future: {
      tagline: 'FY27+ — agentic workforce reasoning, orchestrating, learning.',
      headline: 'Agentic Procurement Workforce',
      summary:
        'A Local Agentic Architecture replaces task bots with reasoning agents. Each agent has skills, memory, sandboxed tool access and governance guardrails. "Daniel the Data Scientist Agent" is the first of many.',
      kpis: [
        { label: 'Agent Coverage', from: 0, to: 80, suffix: '%', delta: 'of processes' },
        { label: 'Decision Latency', from: 100, to: 8, suffix: '%', delta: '−92%', reverse: true },
        { label: 'Multi-Agent Flows', from: 0, to: 24, suffix: '', delta: 'orchestrated' },
        { label: 'Local LLM Uptime', from: 0, to: 99.9, suffix: '%', delta: 'sovereign', decimals: 1 },
        { label: 'Tool Calls / Day', from: 0, to: 12000, suffix: '', delta: 'sandboxed' },
        { label: 'Audit Trace', from: 0, to: 100, suffix: '%', delta: 'fully logged' },
        { label: 'Human Approval', from: 100, to: 18, suffix: '%', delta: 'high-risk only', reverse: true },
        { label: 'Agent Skills', from: 0, to: 47, suffix: '', delta: 'in library' },
      ],
      initiatives: [
        'Local Agentic Platform · gateway, orchestrator, memory, sandboxed routing',
        'Local LLM Layer · sovereign, frequently updated, RBAC + audit',
        '"Daniel" Data-Scientist Agent · natural-language analytics in flow of work',
        'Multi-agent procurement workflows · sourcing, negotiation, compliance',
        'Channel adapters · Teams, Email, ERP, Slack',
        'Strict governance · encryption, no external data movement, model guardrails',
      ],
      callout:
        'Agents become the new digital colleagues — reliable, consistent, sovereign, auditable.',
    },
  },

  // ── ANALYTICS ────────────────────────────────────────────────
  {
    id: 'analytics',
    title: 'Analytics',
    subtitle: 'Decision Intelligence',
    icon: 'BrainCircuit',
    angle: 240, // bottom-left
    accent: 'violet',
    current: {
      tagline: 'FY26 — analytics CoE turning raw data into procurement leverage.',
      headline: 'Analytics CoE Live',
      summary:
        'The CoE has delivered prescriptive B-BBEE scenarios, proactive duplicate-payment monitoring, the VOS supplier feedback platform, P2P health monitoring and active support for OCR / e-Invoicing rollout.',
      kpis: [
        { label: 'BCX Reporting', from: 0, to: 100, suffix: '%', delta: 'B-BBEE + spend' },
        { label: 'Dup-Pay Detection', from: 168, to: 24, suffix: ' h', delta: 'cycle', reverse: true },
        { label: 'VOS Adoption', from: 0, to: 91, suffix: '%', delta: 'NPS' },
        { label: 'P2P Health Cov.', from: 0, to: 85, suffix: '%', delta: 'monitored' },
        { label: 'OCR Pilot Support', from: 0, to: 100, suffix: '%', delta: 'domain expertise' },
        { label: 'Deviations Platform', from: 0, to: 100, suffix: '%', delta: 'transitioned' },
        { label: 'Power BI Workspace', from: 0, to: 1, suffix: '', delta: 'governed' },
        { label: 'Order Mgmt Vis.', from: 60, to: 92, suffix: '%', delta: 'enhanced' },
      ],
      initiatives: [
        'Connected Ariba & SAP agreement management',
        'Prescriptive B-BBEE scenarios for procurement leaders',
        'Proactive duplicate-payment monitoring',
        'VOS · supplier feedback transformed into insight platform',
        'P2P health monitoring · proactive, not reactive',
        'Deviations platform transition + governed Power BI workspace',
      ],
      callout:
        'Descriptive → Diagnostic → Predictive — the CoE has earned the right to push into Prescriptive and Cognitive analytics.',
    },
    future: {
      tagline: 'FY27+ — cognitive analytics in the flow of work.',
      headline: 'Local Agentic Analytics',
      summary:
        'A sovereign, locally-hosted agentic analytics architecture. Users prompt via Teams or email; agents pull across finance, procurement and supplier data, explain drivers, simulate scenarios and recommend action — all under audit, RBAC and human approval.',
      kpis: [
        { label: 'Cognitive Coverage', from: 0, to: 70, suffix: '%', delta: 'of insight' },
        { label: 'Insight Cycle', from: 100, to: 5, suffix: '%', delta: '−95%', reverse: true },
        { label: 'NL Queries / Day', from: 0, to: 800, suffix: '', delta: 'projected' },
        { label: 'Scenario Sims', from: 0, to: 60, suffix: '', delta: '/ week' },
        { label: 'Data Sources', from: 4, to: 22, suffix: '', delta: 'unified' },
        { label: 'Sovereignty', from: 0, to: 100, suffix: '%', delta: 'local-only' },
        { label: 'Audit Logging', from: 0, to: 100, suffix: '%', delta: 'every query' },
        { label: 'Working Capital', from: 0, to: 4.2, suffix: '%', delta: 'release', decimals: 1 },
      ],
      initiatives: [
        '"Vendor concentration analysis on the last 2 years?" → answered in seconds',
        'Descriptive → Diagnostic → Predictive → Prescriptive → Cognitive ladder',
        'Local LLM + RBAC + encryption + no external data movement',
        'Scenario simulation: B-BBEE, working capital, supplier risk',
        'Insights delivered into Teams, Email, ERP — not just dashboards',
        'Continuous learning from procurement decisions and outcomes',
      ],
      callout:
        'From dashboards to decisions — analytics that explain, simulate and recommend, securely and sovereignly.',
    },
  },
]

// ── MATURITY MODEL ─────────────────────────────────────────────
// 5-level Telkom procurement maturity ladder.
// Current position: L4. Target: L5 (cognitive / autonomous).
export const MATURITY = {
  current: 4,
  target: 5,
  levels: [
    {
      id: 'L1',
      label: 'Reactive',
      desc: 'Manual, paper-based. Decentralised, inconsistent execution.',
    },
    {
      id: 'L2',
      label: 'Optimised',
      desc: 'Standardised work instructions. Initial automation. Repeatable.',
    },
    {
      id: 'L3',
      label: 'Integrated',
      desc: 'Systems connected. RPA at scale. ERP-driven workflows.',
    },
    {
      id: 'L4',
      label: 'Governance Automation',
      desc: 'Controls structurally embedded. RPA + SAP + Ariba as one chain.',
      tag: 'NOW · FY26',
    },
    {
      id: 'L5',
      label: 'Cognitive · Autonomous',
      desc: 'Agentic procurement. Self-healing governance. Continuous audit.',
      tag: 'TARGET · FY27+',
    },
  ],
}

export const APP_INTRO = {
  current:
    'Three pillars · one journey. Click any pillar to drill into the FY26 reality. Toggle the state to see the FY27+ agentic vision.',
  future:
    'The autonomous procurement ecosystem. Three pillars become agents; the maturity ladder becomes cognitive. Click any pillar to drill in.',
}
