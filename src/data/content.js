// Telkom × WNS Procurement EBR FY26 — grounded in the placemat, the Maturity
// Rollup slide (L1-L5) and the EBR deck (Daniel data-scientist agent, agentic
// architecture, cognitive analytics ladder).

// ── HERO METRICS — 6 headline placemat stats (with FY27 projections) ──
export const HERO_METRICS = [
  { key: 'fte',       value: 5,    futureValue: 12,    suffix: '',    label: 'FTE Redeployed',     sublabel: 'Value pass-back', accent: '#0891B2' },
  { key: 'touchless', value: 90,   futureValue: 99,    suffix: '%',   label: 'Touchless P2P',      sublabel: 'End-to-end',      accent: '#14B8A6' },
  { key: 'pocreate',  value: 93,   futureValue: 99,    suffix: '%',   label: 'PO Create',          sublabel: 'Automation',      accent: '#0D9488' },
  { key: 'porelease', value: 100,  futureValue: 100,   suffix: '%',   label: 'PO Release',         sublabel: 'Coverage',        accent: '#10B981' },
  { key: 'bypass',    value: 'R0', futureValue: 'R0',  suffix: '',    label: 'Manual Bypass',      sublabel: 'Zero-tolerance',  accent: '#D97706' },
  { key: 'goals',     value: 7,    futureValue: 14,    suffix: '/14', label: 'Goals Complete',     sublabel: 'FY26 scorecard',  accent: '#7C3AED' },
]

// ── OPERATIONS PULSE — current FY26 values + FY27 projections ────────
// `spark` is the actual 12-month trajectory to current value
// `futureSpark` is the projected 6-quarter trajectory from current → future
export const OPERATIONS_PULSE = [
  { label: 'PR Create Bot',  value: 88,  suffix: '%',  from: 8,    delta: '+80pp',         complete: true,
    spark: [8, 12, 22, 35, 48, 58, 66, 73, 79, 83, 86, 88],
    futureValue: 98,                                              futureDelta: '→ 98%',
    futureSpark: [88, 90, 92, 94, 95, 96, 97, 98] },
  { label: 'PO Create',      value: 93,  suffix: '%',  from: 0,    delta: 'Automation',    complete: true,
    spark: [0, 14, 28, 41, 52, 61, 70, 77, 83, 88, 91, 93],
    futureValue: 99,                                              futureDelta: '→ 99%',
    futureSpark: [93, 94, 95, 96, 97, 98, 99, 99] },
  { label: 'PO Release',     value: 100, suffix: '%',  from: 78,   delta: '+22pp',         complete: true,
    spark: [78, 80, 84, 87, 90, 92, 94, 96, 97, 98, 99, 100],
    futureValue: 100,                                             futureDelta: 'Sustained',
    futureSpark: [100, 100, 100, 100, 100, 100, 100, 100] },
  { label: 'Touchless',      value: 90,  suffix: '%',  from: 0,    delta: 'End-to-end',    complete: true,
    spark: [22, 28, 36, 44, 52, 60, 68, 74, 80, 84, 87, 90],
    futureValue: 99,                                              futureDelta: '→ 99%',
    futureSpark: [90, 92, 94, 95, 96, 97, 98, 99] },
  { label: 'Vendor Onboard', value: 2.9, suffix: 'd',  from: 7.8,  delta: '−63%',          complete: true, decimals: 1,
    spark: [7.8, 7.2, 6.5, 5.9, 5.3, 4.8, 4.3, 3.9, 3.6, 3.3, 3.1, 2.9],
    futureValue: 0.5,                                             futureDelta: 'Same-day', futureDecimals: 1,
    futureSpark: [2.9, 2.5, 2.0, 1.6, 1.2, 0.9, 0.7, 0.5] },
  { label: 'Vendor NPS',     value: 91,  suffix: '%',  from: 75,   delta: '+16pp',         complete: true,
    spark: [75, 76, 78, 80, 82, 83, 85, 86, 88, 89, 90, 91],
    futureValue: 96,                                              futureDelta: '→ 96%',
    futureSpark: [91, 92, 93, 94, 94, 95, 95, 96] },
  { label: 'FTE Redeployed', value: 5,   suffix: '',   from: 0,    delta: 'Value',         complete: true,
    spark: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    futureValue: 12,                                              futureDelta: '+7 more',
    futureSpark: [5, 6, 7, 8, 9, 10, 11, 12] },
  { label: 'Spot Buy TAT',   value: 48,  suffix: '%',  from: 0,    delta: 'Improvement',   complete: true,
    spark: [0, 6, 12, 18, 24, 29, 33, 37, 40, 43, 46, 48],
    futureValue: 80,                                              futureDelta: '→ 80%',
    futureSpark: [48, 53, 58, 64, 69, 73, 77, 80] },
  { label: 'Privacy Adopt',  value: 51,  suffix: '%',  from: 0,    delta: 'Statement',     complete: false,
    spark: [0, 5, 12, 18, 24, 29, 33, 38, 42, 46, 49, 51],
    futureValue: 100,                                             futureDelta: 'Universal',
    futureSpark: [51, 60, 68, 76, 84, 90, 96, 100] },
  { label: 'POs Not Ack',    value: 36,  suffix: '%',  from: 0,    delta: 'Reduction',     complete: true, reverse: true,
    spark: [0, 4, 9, 14, 18, 22, 25, 28, 30, 33, 35, 36],
    futureValue: 80,                                              futureDelta: '→ 80% cut',
    futureSpark: [36, 44, 52, 60, 66, 71, 76, 80] },
  { label: 'AP91 Quantity',  value: 14,  suffix: '%',  from: 0,    delta: '+14% YoY',      complete: true,
    spark: [0, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 14],
    futureValue: 40,                                              futureDelta: '+40% YoY',
    futureSpark: [14, 18, 22, 26, 30, 34, 37, 40] },
  { label: 'AP91 Value',     value: 5,   suffix: '%',  from: 0,    delta: '+5% YoY',       complete: true,
    spark: [0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5],
    futureValue: 25,                                              futureDelta: '+25% YoY',
    futureSpark: [5, 8, 11, 14, 17, 20, 22, 25] },
]

// ── MATURITY MODEL — L1-L5 ───────────────────────────────────────────
export const MATURITY = {
  current: 4,
  target: 5,
  levels: [
    { id: 'L1', level: 1, title: 'Task Automation',              status: 'complete', tag: '✓ COMPLETE',           iconName: 'Cog',
      currentState: ['PR Create Bot', 'PO Print Release', 'UiPath Platform', 'Work Instructions'],
      futureState:  ['RPA Automation', 'Process Digitisation', 'Operational Efficiency'] },
    { id: 'L2', level: 2, title: 'Workflow Automation',          status: 'complete', tag: '✓ COMPLETE',           iconName: 'GitBranch',
      currentState: ['PO Release Bot (100%)', 'PO Ack Bot · 64% auto-capture', 'Payment Terms AP91', 'Vendor Onboarding 7.8 → 2.9d'],
      futureState:  ['Straight-Through Processing', 'Automated Validations', 'Policy-Driven Workflows', 'Digital Collaboration'] },
    { id: 'L3', level: 3, title: 'Integrated BOT Collaboration', status: 'complete', tag: '✓ COMPLETE',           iconName: 'Network',
      currentState: ['PR → PO Full Chain · BOT + SAP ROMC', 'SAP TBI Integration · 44% → 85%', '93% PO Create · combined', 'TAT 29% YoY improvement'],
      futureState:  ['End-to-End Orchestration', 'AI-Driven Workflows', 'Advanced Analytics', 'Connected Ecosystem'] },
    { id: 'L4', level: 4, title: 'Governance Automation',        status: 'current',  tag: '★ WE ARE HERE · FY26', iconName: 'ShieldCheck',
      currentState: ['IT Spend Governance · >R1M PRs live', 'Zero-Bypass Control · R0', 'SAP vs Ariba Align · 90%+', 'SCOC Compliance Drive', 'Control Environment · Enhanced', 'SLA Realignment · Outcome-based'],
      futureState:  ['Predictive Governance', 'Self-Healing Controls', 'AI Reasoning', 'Real-Time Compliance', 'Intelligent Orchestration'] },
    { id: 'L5', level: 5, title: 'Intelligent Orchestration',    status: 'target',   tag: '★ ROADMAP · FY27',     iconName: 'Sparkles',
      currentState: ['e-Invoicing / OCR · Aug 2026', 'AI-Assisted Routing · FY27', 'Predictive BOT Monitor · FY27', 'Enterprise Orchestration · FY27'],
      futureState:  ['Autonomous Sourcing', 'Digital Twin Simulation', 'Supplier Risk Intelligence', 'Procurement Control Tower', '"Daniel" Data-Scientist Agent'] },
  ],
}

// ── TRANSFORMATION ENGINE ────────────────────────────────────────────
// Real progress data per process stage — current automation % and FY27 target
export const TRANSFORMATION_ENGINE = {
  current: {
    title: 'P2P Automation Coverage · FY26',
    subtitle: 'Stage-by-stage automation level today',
    stages: [
      { stage: 'Demand',       iconName: 'Lightbulb',      auto: 35,  channel: 'Email + ad-hoc' },
      { stage: 'PR Create',    iconName: 'FilePlus',       auto: 88,  channel: 'PR Bot + SAP' },
      { stage: 'PR → PO',      iconName: 'ArrowRightLeft', auto: 93,  channel: 'BOT + SAP ROMC' },
      { stage: 'PO Release',   iconName: 'Send',           auto: 100, channel: 'Release 31 & 37' },
      { stage: 'PO Ack',       iconName: 'CheckCircle2',   auto: 64,  channel: 'Auto-capture' },
      { stage: 'Invoicing',    iconName: 'Receipt',        auto: 55,  channel: 'OCR pilot Aug 26' },
      { stage: 'Payment',      iconName: 'CreditCard',     auto: 78,  channel: 'AP91 + SAP' },
      { stage: 'Supplier Mgmt',iconName: 'Users',          auto: 91,  channel: 'VOS platform' },
    ],
    systemStatus: [
      { label: 'Bots Active',  value: 14,    suffix: '',    sublabel: 'Running' },
      { label: 'Success Rate', value: 98.4,  suffix: '%',   sublabel: '30 days', decimals: 1 },
      { label: 'Transactions', value: '1.2M+', sublabel: 'This month' },
      { label: 'Exceptions',   value: 1.6,   suffix: '%',   sublabel: 'Managed', decimals: 1 },
    ],
  },
  future: {
    title: 'P2P Automation Coverage · FY27+',
    subtitle: 'Projected after agentic transformation',
    stages: [
      { stage: 'Demand',       iconName: 'Lightbulb',      auto: 92,  channel: 'AI demand sensing' },
      { stage: 'PR Create',    iconName: 'FilePlus',       auto: 99,  channel: 'NL agent + auto-PR' },
      { stage: 'PR → PO',      iconName: 'ArrowRightLeft', auto: 100, channel: 'Full orchestration' },
      { stage: 'PO Release',   iconName: 'Send',           auto: 100, channel: 'Sustained' },
      { stage: 'PO Ack',       iconName: 'CheckCircle2',   auto: 96,  channel: 'Predictive' },
      { stage: 'Invoicing',    iconName: 'Receipt',        auto: 97,  channel: 'OCR + e-Invoicing' },
      { stage: 'Payment',      iconName: 'CreditCard',     auto: 98,  channel: 'Self-healing' },
      { stage: 'Supplier Mgmt',iconName: 'Users',          auto: 99,  channel: 'Risk intel agents' },
    ],
    systemStatus: [
      { label: 'Agents Active',value: 47,     suffix: '',    sublabel: 'Reasoning' },
      { label: 'Success Rate', value: 99.7,   suffix: '%',   sublabel: 'Sovereign LLM', decimals: 1 },
      { label: 'Transactions', value: '3.8M+', sublabel: 'Projected' },
      { label: 'Exceptions',   value: 0.3,   suffix: '%',   sublabel: 'Auto-routed', decimals: 1 },
    ],
  },
}

// ── INTELLIGENCE & ANALYTICS LAYER — different lists for current/future
export const INTELLIGENCE_LAYER = {
  current: [
    { title: 'B-BBEE Scenarios',   desc: 'Prescriptive scenarios for procurement leaders',                  iconName: 'TrendingUp' },
    { title: 'Duplicate Detection', desc: 'Proactive duplicate-payment monitoring',                          iconName: 'Search' },
    { title: 'VOS Insight',         desc: 'Supplier feedback turned into insight platform',                  iconName: 'Sparkles' },
    { title: 'P2P Health Monitor',  desc: 'Proactive end-to-end health visibility',                          iconName: 'AlertTriangle' },
    { title: 'OCR Pilot Support',   desc: 'Domain expertise into the e-Invoicing rollout',                   iconName: 'FileSearch' },
    { title: 'Deviations Platform', desc: 'Governed Power BI workspace, single source of truth',             iconName: 'Clock' },
  ],
  future: [
    { title: 'Predictive Sourcing', desc: 'AI forecasts demand and recommends optimal sourcing',             iconName: 'TrendingUp' },
    { title: 'Spend Leakage Agent', desc: 'AI detects spend leakage and maverick procurement',               iconName: 'Search' },
    { title: 'Supplier Risk Intel', desc: 'Real-time supplier risk scoring + proactive alerts',              iconName: 'AlertTriangle' },
    { title: 'Contract Intelligence', desc: 'NLP extraction, compliance and pricing anomaly checks',         iconName: 'FileSearch' },
    { title: 'SLA Prediction',      desc: 'Predict SLA breaches before they happen',                         iconName: 'Clock' },
    { title: '"Daniel" Agent',      desc: 'Natural-language data scientist agent on every desktop',          iconName: 'Sparkles' },
  ],
}

// ── FUTURE ROADMAP — current position depends on mode ────────────────
export const FUTURE_ROADMAP = {
  steps: [
    { label: 'Predict',     sub: 'Anticipate needs',  iconName: 'Eye' },
    { label: 'Source',      sub: 'AI optimises',      iconName: 'Target' },
    { label: 'Orchestrate', sub: 'Automate execution',iconName: 'Workflow' },
    { label: 'Assure',      sub: 'Risk & compliance', iconName: 'ShieldCheck' },
    { label: 'Optimise',    sub: 'Continuous value',  iconName: 'Infinity' },
  ],
  destination: { label: 'Autonomous Value Orchestration', tag: 'FY27+ · Vision' },
  currentPosition: { current: 1, future: 5 }, // 1-indexed step we're standing on
}

// ── PILLARS — each has a `featured` chart so drill tabs feel distinct
export const PILLARS = [
  // ──────────────────────────────────── OPERATIONS ──── featured: BARS
  {
    id: 'operations', title: 'Operations', subtitle: 'P2P Operational Excellence',
    iconName: 'Gauge', accent: '#0891B2', headline: 'Foundation Operational',
    contributesTo: ['L1', 'L2', 'L3', 'L4'],
    featured: 'bars', // hero chart = performance bars
    current: {
      tagline: 'FY26 — measurable, repeatable gains across PR-to-Pay.',
      summary:
        'Compounding gains across requisition, release, acknowledgement, vendor onboarding, payment terms and supplier engagement. The CoE now operates as a sustained engine of value pass-back, with governance controls embedded structurally.',
      gauges: [
        { kind: 'circular', label: 'PR Create',      value: 88,  from: 8,   max: 100, suffix: '%', delta: '+80pp' },
        { kind: 'circular', label: 'PO Release',     value: 100, from: 78,  max: 100, suffix: '%', delta: '+22pp' },
        { kind: 'circular', label: 'PO Create',      value: 93,  from: 0,   max: 100, suffix: '%', delta: 'Achieved' },
        { kind: 'circular', label: 'Vendor NPS',     value: 91,  from: 75,  max: 100, suffix: '%', delta: '+16pp' },
        { kind: 'circular', label: 'Touchless P2P',  value: 90,  from: 22,  max: 100, suffix: '%', delta: 'E2E' },
        { kind: 'circular', label: 'Privacy Adopt',  value: 51,  from: 0,   max: 100, suffix: '%', delta: 'In progress' },
        { kind: 'comparison', label: 'Vendor Onboarding', before: 7.8, after: 2.9, suffix: 'd', delta: '−63%', reverse: true },
        { kind: 'comparison', label: 'PR→PO TAT',         before: 100, after: 71,  suffix: '%', delta: '29% YoY', reverse: true },
        { kind: 'stat', label: 'FTE Redeployed', value: 5,  suffix: '',  icon: 'Users', delta: 'Pass-back' },
        { kind: 'stat', label: 'Spot Buy TAT',   value: 48, suffix: '%', icon: 'Zap',   delta: 'Faster' },
      ],
      trend: {
        title: 'PR Create Coverage · 12-Month Journey',
        series: [
          { m: 'Apr', v: 8 }, { m: 'May', v: 12 }, { m: 'Jun', v: 22 },
          { m: 'Jul', v: 35 }, { m: 'Aug', v: 48 }, { m: 'Sep', v: 58 },
          { m: 'Oct', v: 66 }, { m: 'Nov', v: 73 }, { m: 'Dec', v: 79 },
          { m: 'Jan', v: 83 }, { m: 'Feb', v: 86 }, { m: 'Mar', v: 88 },
        ],
      },
      composition: {
        title: 'Operational Mix',
        unit: '% of transactions',
        slices: [
          { name: 'Touchless',    value: 90, color: '#0891B2' },
          { name: 'Partial Auto', value: 7,  color: '#67E8F9' },
          { name: 'Manual',       value: 3,  color: '#94A3B8' },
        ],
      },
      initiatives: [
        'PR Create Bot · 8% → 88% scope coverage',
        'PO Release Bot · 78% → 100% (Release 31 & 37)',
        'PO Acknowledgement Bot · 64% auto-captured',
        'AP91 payment terms · +14% Qty / +5% Value shifted to standard',
        'Vendor onboarding · 7.8 → 2.9 days through ARS priority monitoring',
        'IT Spend Governance · PRs >R1M routed by value and category',
        'Zero-Bypass control architecture enforced',
        'Supplier Privacy Statement adoption · 51%',
      ],
      callout: '5 FTE redeployed · Vendor NPS 75% → 91% · 29% YoY PR-to-PO TAT improvement',
    },
    future: {
      tagline: 'FY27+ — touchless operations powered by autonomous AI agents.',
      summary:
        'Operations evolve into a self-driving capability. AI agents perceive demand from rollout plans and capex forecasts, validate budget and policy, source and negotiate, then issue, match and pay — humans intervene only on exceptions.',
      gauges: [
        { kind: 'circular', label: 'Touchless P2P',  value: 99, from: 90, max: 100, suffix: '%', delta: 'Target' },
        { kind: 'circular', label: 'PR Create',      value: 98, from: 88, max: 100, suffix: '%', delta: '→ 98%' },
        { kind: 'circular', label: 'Auto-Sourcing',  value: 70, from: 0,  max: 100, suffix: '%', delta: 'Spot buys' },
        { kind: 'circular', label: 'Invoice Match',  value: 98, from: 0,  max: 100, suffix: '%', delta: 'First pass' },
        { kind: 'circular', label: 'Self-Service',   value: 60, from: 0,  max: 100, suffix: '%', delta: 'NL interface' },
        { kind: 'circular', label: 'Privacy Adopt',  value: 100, from: 51, max: 100, suffix: '%', delta: 'Universal' },
        { kind: 'comparison', label: 'Exception Rate', before: 22,  after: 4,  suffix: '%', delta: '−82%', reverse: true },
        { kind: 'comparison', label: 'Cycle Time',     before: 100, after: 18, suffix: '%', delta: '−82%', reverse: true },
        { kind: 'stat', label: 'Predictive Lead',  value: 12, suffix: 'wk', icon: 'TrendingUp', delta: 'Forward view' },
        { kind: 'stat', label: 'Strategic Hours',  value: 75, suffix: '%',  icon: 'Brain',      delta: 'Team time' },
      ],
      trend: {
        title: 'Touchless P2P Trajectory',
        series: [
          { m: 'Now', v: 90 }, { m: 'Q1', v: 91 }, { m: 'Q2', v: 93 },
          { m: 'Q3', v: 95 }, { m: 'Q4', v: 97 }, { m: 'FY27', v: 99 },
        ],
      },
      composition: {
        title: 'Future Operational Mix',
        unit: '% of transactions',
        slices: [
          { name: 'Autonomous', value: 75, color: '#DB2777' },
          { name: 'Assisted',   value: 20, color: '#F9A8D4' },
          { name: 'Manual',     value: 5,  color: '#94A3B8' },
        ],
      },
      initiatives: [
        'Agentic PR creation · natural-language request → validated PR',
        'Predictive demand detection · 6-12 week forward visibility',
        'Auto-budget & policy validation pre-PO',
        'OCR + e-Invoicing end-to-end with auto-match',
        'AI-routed exceptions to the right human in seconds',
        'Continuous supplier health & lead-time learning',
      ],
      callout: '"Need identified → AI validates → sources → negotiates → PO → paid." Humans manage strategy and exceptions only.',
    },
  },

  // ──────────────────────────────── TRANSFORMATION ──── featured: DONUT
  {
    id: 'transformation', title: 'Transformation', subtitle: 'Digital Workforce & Integration',
    iconName: 'Workflow', accent: '#14B8A6', headline: 'Integrated Digital Workforce',
    contributesTo: ['L1', 'L2', 'L3', 'L5'],
    featured: 'donut', // hero chart = composition donut
    current: {
      tagline: 'FY26 — bots, SAP and integrations operating as one chain.',
      summary:
        'The automation journey has moved beyond isolated bots into a coordinated digital workforce. PR Create, PO Release, PO Ack, SAP ROMC, TBI integration and UiPath Enterprise now operate as one orchestrated chain — RPA 76%, SAP 15%, manual just 9%.',
      gauges: [
        { kind: 'circular', label: 'Overall Coverage',  value: 93,  from: 0, max: 100, suffix: '%',  delta: 'Achieved' },
        { kind: 'circular', label: 'PO Release 31',     value: 98,  from: 0, max: 100, suffix: '%',  delta: 'RPA-driven' },
        { kind: 'circular', label: 'PO Release 37',     value: 100, from: 0, max: 100, suffix: '%',  delta: 'RPA-driven' },
        { kind: 'circular', label: 'SAP↔Ariba',         value: 90,  from: 0, max: 100, suffix: '%',  delta: 'Rationalised' },
        { kind: 'circular', label: 'SAP TBI Integration',value: 85, from:44, max: 100, suffix: '%',  delta: '+41pp' },
        { kind: 'circular', label: 'PO Ack Auto-Cap',   value: 64,  from: 0, max: 100, suffix: '%',  delta: 'Captured' },
        { kind: 'comparison', label: 'PR→PO TAT YoY',       before: 100, after: 71, suffix: '%', delta: '29% better', reverse: true },
        { kind: 'comparison', label: 'Bot Coverage',         before: 35,  after: 76, suffix: '%', delta: '+41pp' },
        { kind: 'stat', label: 'Live Bots',         value: 14, suffix: '', icon: 'Bot',       delta: 'Orchestrated' },
        { kind: 'stat', label: 'Work Instructions', value: 13, suffix: '', icon: 'FileCheck', delta: 'Refreshed' },
      ],
      trend: {
        title: 'Value-Chain Coverage Build-up',
        series: [
          { m: 'Apr', v: 35 }, { m: 'May', v: 42 }, { m: 'Jun', v: 51 },
          { m: 'Jul', v: 58 }, { m: 'Aug', v: 64 }, { m: 'Sep', v: 71 },
          { m: 'Oct', v: 76 }, { m: 'Nov', v: 81 }, { m: 'Dec', v: 85 },
          { m: 'Jan', v: 88 }, { m: 'Feb', v: 91 }, { m: 'Mar', v: 93 },
        ],
      },
      composition: {
        title: 'Value Chain Execution',
        unit: '% of workload',
        slices: [
          { name: 'RPA',    value: 76, color: '#14B8A6' },
          { name: 'SAP',    value: 15, color: '#67E8F9' },
          { name: 'Manual', value: 9,  color: '#94A3B8' },
        ],
      },
      initiatives: [
        'UiPath Community → Enterprise migration · complete',
        'BOT ↔ SAP ROMC integration for PR-to-PO chain',
        'SAP TBI Integration · 44% → >85%',
        'PR Create Bot scope expansion · 13 work instructions refreshed',
        'PO Release Bot expanded to Release strategies 31 & 37',
        'SAP ↔ Ariba contract & spend alignment · 90%+',
      ],
      callout: 'RPA 76% · SAP 15% · Manual 9% — value chain coverage now an integrated 93%.',
    },
    future: {
      tagline: 'FY27+ — agentic workforce reasoning, orchestrating, learning.',
      summary:
        'A Local Agentic Architecture replaces task bots with reasoning agents. Each agent has skills, memory, sandboxed tool access and governance guardrails. "Daniel the Data Scientist Agent" is the first of many.',
      gauges: [
        { kind: 'circular', label: 'Agent Coverage',   value: 80,   from: 0,   max: 100, suffix: '%', delta: 'Of processes' },
        { kind: 'circular', label: 'Local LLM Uptime', value: 99.9, from: 0,   max: 100, suffix: '%', delta: 'Sovereign', decimals: 1 },
        { kind: 'circular', label: 'Audit Trace',      value: 100,  from: 0,   max: 100, suffix: '%', delta: 'Logged' },
        { kind: 'circular', label: 'Human Approval',   value: 18,   from: 100, max: 100, suffix: '%', delta: 'High-risk', reverse: true },
        { kind: 'circular', label: 'Auto-Resolution',  value: 92,   from: 0,   max: 100, suffix: '%', delta: 'First pass' },
        { kind: 'circular', label: 'Channel Adoption', value: 88,   from: 0,   max: 100, suffix: '%', delta: 'Teams + ERP' },
        { kind: 'comparison', label: 'Decision Latency', before: 100, after: 8, suffix: '%', delta: '−92%', reverse: true },
        { kind: 'comparison', label: 'Bot vs Agent',     before: 14,  after: 47, suffix: '', delta: '+33 skills' },
        { kind: 'stat', label: 'Multi-Agent Flows', value: 24,    suffix: '',  icon: 'Network',  delta: 'Orchestrated' },
        { kind: 'stat', label: 'Tool Calls / Day',  value: 12000, suffix: '',  icon: 'Zap',      delta: 'Sandboxed' },
      ],
      trend: {
        title: 'Agent Coverage Roadmap',
        series: [
          { m: 'Now', v: 0 }, { m: 'Q1', v: 12 }, { m: 'Q2', v: 28 },
          { m: 'Q3', v: 45 }, { m: 'Q4', v: 62 }, { m: 'FY27', v: 80 },
        ],
      },
      composition: {
        title: 'Future Workforce Mix',
        unit: '% of execution',
        slices: [
          { name: 'Agentic',    value: 60, color: '#DB2777' },
          { name: 'RPA',        value: 30, color: '#F9A8D4' },
          { name: 'SAP/Other',  value: 10, color: '#94A3B8' },
        ],
      },
      initiatives: [
        'Local Agentic Platform · gateway, orchestrator, memory, sandboxed routing',
        'Local LLM Layer · sovereign, frequently updated, RBAC + audit',
        '"Daniel" Data-Scientist Agent · natural-language analytics in the flow of work',
        'Multi-agent procurement workflows · sourcing, negotiation, compliance',
        'Channel adapters · Teams, Email, ERP, Slack',
        'Strict governance · encryption, no external data movement, model guardrails',
      ],
      callout: 'Agents become the new digital colleagues — reliable, consistent, sovereign, auditable.',
    },
  },

  // ────────────────────────────────────── ANALYTICS ──── featured: TREND
  {
    id: 'analytics', title: 'Analytics', subtitle: 'Decision Intelligence',
    iconName: 'BrainCircuit', accent: '#7C3AED', headline: 'Analytics CoE Live',
    contributesTo: ['L3', 'L4', 'L5'],
    featured: 'trend', // hero chart = trend (cognitive ladder)
    current: {
      tagline: 'FY26 — analytics CoE turning raw data into procurement leverage.',
      summary:
        'The CoE has delivered prescriptive B-BBEE scenarios, proactive duplicate-payment monitoring, the VOS supplier feedback platform, P2P health monitoring, enhanced order-management visibility and active support for OCR / e-Invoicing rollout.',
      gauges: [
        { kind: 'circular', label: 'BCX Reporting',   value: 100, from: 0,  max: 100, suffix: '%', delta: 'B-BBEE' },
        { kind: 'circular', label: 'VOS Adoption',    value: 91,  from: 0,  max: 100, suffix: '%', delta: 'NPS' },
        { kind: 'circular', label: 'P2P Monitoring',  value: 85,  from: 0,  max: 100, suffix: '%', delta: 'Coverage' },
        { kind: 'circular', label: 'Order Mgmt Vis.', value: 92,  from: 60, max: 100, suffix: '%', delta: 'Enhanced' },
        { kind: 'circular', label: 'Descriptive',     value: 100, from: 0,  max: 100, suffix: '%', delta: 'Mature' },
        { kind: 'circular', label: 'Predictive',      value: 78,  from: 0,  max: 100, suffix: '%', delta: 'Growing' },
        { kind: 'comparison', label: 'Dup-Pay Detection',   before: 168, after: 24,  suffix: 'h', delta: '−86%', reverse: true },
        { kind: 'comparison', label: 'Deviations Platform', before: 0,   after: 100, suffix: '%', delta: 'Transitioned' },
        { kind: 'stat', label: 'OCR Pilot Support',  value: 100, suffix: '%', icon: 'ScanLine',  delta: 'Domain expertise' },
        { kind: 'stat', label: 'Power BI Workspace', value: 1,   suffix: '',  icon: 'BarChart3', delta: 'Governed' },
      ],
      trend: {
        title: 'Analytics Maturity Ladder · Descriptive → Cognitive',
        series: [
          { m: 'Descriptive',  v: 100 },
          { m: 'Diagnostic',   v: 92 },
          { m: 'Predictive',   v: 78 },
          { m: 'Prescriptive', v: 64 },
          { m: 'Cognitive',    v: 22 },
        ],
      },
      composition: {
        title: 'Analytics CoE Deliverables',
        unit: '% of effort',
        slices: [
          { name: 'B-BBEE & Spend',   value: 30, color: '#7C3AED' },
          { name: 'Supplier Insight', value: 25, color: '#A78BFA' },
          { name: 'P2P Monitoring',   value: 20, color: '#C4B5FD' },
          { name: 'Order Mgmt',       value: 15, color: '#DDD6FE' },
          { name: 'OCR Support',      value: 10, color: '#EDE9FE' },
        ],
      },
      initiatives: [
        'Connected Ariba & SAP agreement management',
        'Prescriptive B-BBEE scenarios for procurement leaders',
        'Proactive duplicate-payment monitoring',
        'VOS · supplier feedback transformed into insight platform',
        'P2P health monitoring · proactive, not reactive',
        'Enhanced order management visibility',
        'Deviations platform transition + governed Power BI workspace',
      ],
      callout: 'Descriptive → Diagnostic → Predictive — the CoE has earned the right to push into Prescriptive and Cognitive.',
    },
    future: {
      tagline: 'FY27+ — cognitive analytics in the flow of work.',
      summary:
        'A sovereign, locally-hosted agentic analytics architecture. Users prompt via Teams or email; agents pull across finance, procurement and supplier data, explain drivers, simulate scenarios and recommend action — all under audit, RBAC and human approval.',
      gauges: [
        { kind: 'circular', label: 'Cognitive Cov.',  value: 70,  from: 0, max: 100, suffix: '%', delta: 'Of insight' },
        { kind: 'circular', label: 'Sovereignty',    value: 100, from: 0, max: 100, suffix: '%', delta: 'Local-only' },
        { kind: 'circular', label: 'Audit Logging', value: 100, from: 0, max: 100, suffix: '%', delta: 'Every query' },
        { kind: 'circular', label: 'Working Capital',value: 4.2, from: 0, max: 10,  suffix: '%', delta: 'Release', decimals: 1 },
        { kind: 'circular', label: 'Prescriptive',   value: 95, from: 64, max: 100, suffix: '%', delta: 'Mature' },
        { kind: 'circular', label: 'Cognitive',      value: 70, from: 22, max: 100, suffix: '%', delta: 'Live' },
        { kind: 'comparison', label: 'Insight Cycle', before: 100, after: 5,  suffix: '%', delta: '−95%', reverse: true },
        { kind: 'comparison', label: 'Data Sources',  before: 4,   after: 22, suffix: '',  delta: 'Unified' },
        { kind: 'stat', label: 'NL Queries / Day', value: 800, suffix: '',    icon: 'MessageSquare', delta: 'Projected' },
        { kind: 'stat', label: 'Scenario Sims',    value: 60,  suffix: '/wk', icon: 'TrendingUp',    delta: 'Forecast' },
      ],
      trend: {
        title: 'Cognitive Analytics Adoption · Forward Curve',
        series: [
          { m: 'Now', v: 22 }, { m: 'Q1', v: 30 }, { m: 'Q2', v: 42 },
          { m: 'Q3', v: 54 }, { m: 'Q4', v: 64 }, { m: 'FY27', v: 70 },
        ],
      },
      composition: {
        title: 'Cognitive Analytics Mix',
        unit: '% of insights',
        slices: [
          { name: 'Cognitive',    value: 50, color: '#DB2777' },
          { name: 'Prescriptive', value: 30, color: '#F472B6' },
          { name: 'Predictive',   value: 20, color: '#FBCFE8' },
        ],
      },
      initiatives: [
        '"Vendor concentration analysis on the last 2 years?" → answered in seconds',
        'Descriptive → Diagnostic → Predictive → Prescriptive → Cognitive ladder',
        'Local LLM + RBAC + encryption + no external data movement',
        'Scenario simulation: B-BBEE, working capital, supplier risk',
        'Insights delivered into Teams, Email, ERP — not just dashboards',
        '"Daniel" Data-Scientist Agent · the world\'s best employee, on demand',
        'Continuous learning from procurement decisions and outcomes',
      ],
      callout: 'From dashboards to decisions — analytics that explain, simulate and recommend, securely and sovereignly.',
    },
  },
]
