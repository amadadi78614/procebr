// Procurement EBR — November 2026 (FY27 H1)
// Sources: "Procurement Executive Business Review FY27 – H1" (operations, PDF)
//          "Procurement Executive Business Review – November 2026" (analytics & AI, PPTX)

export const EBR = {
  title: 'Procurement Executive Business Review',
  period: 'FY27 H1 · November 2026',
}

// ── Operations: FY26 vs FY27 H1 ──────────────────────────────────────────────
export type OpsKpi = {
  title: string
  unit: '%' | 'h'
  fy26: number
  fy27: number
  better: 'up' | 'down'
  headline: string
  sub: string
  bullets: string[]
  color: string
}

export const OPS_KPIS: OpsKpi[] = [
  {
    title: 'PR Create bot (in scope)', unit: '%', fy26: 59, fy27: 91, better: 'up',
    headline: '59% → 91%', sub: '+32 percentage points',
    bullets: ['Sustained engagement with end users improved adoption and PR volumes', 'Processes continuously reviewed to add scope and transaction volumes'],
    color: '#0EA5E9',
  },
  {
    title: 'PO Create bot', unit: '%', fy26: 84, fy27: 89, better: 'up',
    headline: '84% → 89%', sub: '+5 percentage points',
    bullets: ['Scope increased for R1 PR lines (CMAC and Intercompany)', 'Mobile PO type included'],
    color: '#1670C0',
  },
  {
    title: 'Spot buy TAT (PR to PO)', unit: 'h', fy26: 89.88, fy27: 67.4, better: 'down',
    headline: '↓25%', sub: '89.9 → 67.4 business hours · 2.8 days faster',
    bullets: ['Cycle efficiency improved through focused process optimisation', 'Cost-centre owner behaviour driven to approve faster'],
    color: '#EA580C',
  },
  {
    title: 'PO acknowledgement TAT', unit: 'h', fy26: 31.28, fy27: 16.84, better: 'down',
    headline: '↓46%', sub: '31.3 → 16.8 hours · 4 days to 2 days',
    bullets: ['Vendor compliance strengthened through buyer-led vendor education', 'Apple POs included, reducing manual effort'],
    color: '#0D9488',
  },
]

export const OPS_CALLOUTS = [
  'SLA dashboard tracks both TAT and volumes to drive outcome-based results',
  'Instrumental in implementing the e-Invoicing solution (live 22 August 2026)',
]

// ── Analytics: six months in review ──────────────────────────────────────────
export type Initiative = { name: string; body: string; outcome: string; status: 'done' | 'wip' }

export const ANALYTICS: Initiative[] = [
  { name: 'Contract management: Ariba & SAP', status: 'done', outcome: 'Contract control & workload reduction',
    body: 'Contract visibility refined across Ariba and SAP, with open-order views added and less manual effort in contract and order oversight.' },
  { name: 'P2P data foundation', status: 'done', outcome: 'Trusted operational data foundation',
    body: 'The P2P data layer underpins MANCO views, SLA reporting and frequent operational queries, with R1-service tracking and itemisation views added.' },
  { name: 'Duplicate payments', status: 'done', outcome: 'Cash leakage prevention',
    body: 'Ongoing monitoring identifies and prevents duplicate-payment risk. More potential duplicates were intercepted during the period.' },
  { name: 'BCX integration', status: 'done', outcome: 'Cross-entity procurement visibility',
    body: 'Repeatable updates for spend, open orders and B-BBEE views, aligned to the existing procurement reporting model.' },
  { name: 'Power BI org app', status: 'done', outcome: 'Scalable reporting governance',
    body: 'Reporting consolidated into one organisational app with central maintenance, BU-specific access and dynamic row-level security.' },
  { name: 'SLA reporting', status: 'done', outcome: 'Service performance automation',
    body: 'Less manual monthly SLA reporting and better in-month visibility, for faster trend analysis and performance discussions.' },
  { name: 'OCR / Avvaneo views', status: 'wip', outcome: 'Process readiness & exception management',
    body: 'Avvaneo data refreshes stabilised, supplier-onboarding monitoring and early issue detection enabled, critical interim reporting maintained.' },
  { name: 'Huawei forex orders', status: 'wip', outcome: 'Treasury alignment & forex risk insight',
    body: 'Initial view of order-value and delivery-date changes over time, linking GRNs to orders to assess hedging accuracy and unused forex exposure.' },
  { name: 'Segmentation & deviations', status: 'wip', outcome: 'Move to live apps and current data',
    body: 'Supported the move to live apps and more current data, with interim manual views and reconciliation between legacy and new datasets.' },
]

export const MATURITY = [
  { stage: 'Descriptive', q: 'What happened?', what: 'Data provides hindsight', tools: 'Reports · dashboards', pct: 100 },
  { stage: 'Diagnostic', q: 'Why did it happen?', what: 'Analysis provides insight', tools: 'Reports · dashboards', pct: 100 },
  { stage: 'Predictive', q: 'What will happen?', what: 'Models provide foresight', tools: 'Reports · dashboards · AI/ML', pct: 100 },
  { stage: 'Prescriptive', q: 'What should we do about it?', what: 'Rapid insight, recommendations, decisions', tools: 'AI/ML · scenario tools · agentic framework', pct: 20 },
  { stage: 'Cognitive', q: 'Controlled execution', what: 'Controlled execution autonomy through agentic layers', tools: 'Agentic framework', pct: 5 },
]

// ── AI journey ───────────────────────────────────────────────────────────────
export const AI_STEPS = [
  { t: 'We listened', b: 'Engaged Procurement team members to identify tangible business problems, operational constraints and adoption opportunities.' },
  { t: 'We tested', b: 'Built a practical business use case focused on embedding intelligence into the workflow.' },
  { t: 'We learned', b: 'The barriers are mainly about how AI is operationalised in a governed enterprise environment, not about AI capability.' },
]

export const AI_LEARNINGS = [
  { t: 'People, process and information set the pace', items: ['Stakeholder ownership and workflow understanding are critical dependencies', 'Data access, governance, approvals and change adoption take time', 'Adoption is paced by organisational participation, not technology speed'] },
  { t: 'Enterprise AI needs appropriate tools', items: ['Telkom AI licences not yet broadly provisioned', 'Advanced capabilities hard for delivery teams to access', 'This limits experimentation and workflow integration at scale'] },
  { t: 'Some use cases need more than the current ecosystem', items: ['The current AI framework aligns to the Microsoft ecosystem', 'Local or contained AI needs stronger justification, security review and infrastructure', 'Business wants proof before investment; some use cases need capability before proof'] },
]

export const ENTERPRISE_GAP = [
  { big: '90%', lbl: 'of organisations are at least experimenting with AI' },
  { big: '80%', lbl: 'of business respondents report better individual productivity' },
  { big: '7%', lbl: 'report scaling AI across the enterprise' },
]

export const POC = {
  name: 'SAP contract operationalisation readiness',
  problem: 'Contract, approval and supporting documents are fragmented and manually interpreted at the Sourcing-to-Operations handover. Missing or conflicting information often surfaces only when agreements are captured in SAP, causing contract and spend misalignment.',
  objective: 'A secure AI readiness assessor that reviews contract packs, extracts the operational data SAP needs, reconciles supporting documents and produces an evidence-cited SAP readiness report, a prioritised missing-information register and clear human-review points.',
  steps: [
    { t: 'Collect the evidence', b: 'Contract and schedules, governance pack, CW information, SAP ECC 46 agreement data, SME input' },
    { t: 'Codify the knowledge', b: 'Contract types, required SAP fields, value and date controls, split logic, evidence standards' },
    { t: 'Apply AI-assisted assessment', b: 'Classify documents, extract source-cited facts, reconcile values, dates and parties, flag gaps' },
    { t: 'Validate with accountable humans', b: 'Sourcing, Procurement Ops, Governance, SAP/master data, Legal and Finance accept or correct findings' },
    { t: 'Produce and reuse', b: 'Readiness report, missing-information register, SAP-ready handover actions; corrections improve the next run' },
  ],
  value: [
    'Earlier identification of operationalisation blockers',
    'Less cash leakage, stronger spend control',
    'Faster, more consistent contract review',
    'Auditability through source-linked findings',
    'Reusable across suppliers and agreement types',
    'Confidential analysis through a locally hosted AI route',
  ],
}

export const AI_ASKS = [
  { t: 'Microsoft Enterprise AI access', b: "Let the Shared Services team work fully in Telkom's chosen AI ecosystem: experiment, develop and embed approved capabilities into real workflows." },
  { t: 'Controlled infrastructure investment', b: 'Where a defined business case needs more than the standard framework, a mechanism to evaluate and fund fit-for-purpose local or contained AI infrastructure.' },
]
export const AI_PATH = ['Business problem', 'Use case', 'Prove value (POC)', 'Select architecture', 'Embed in workflow', 'Measure outcome']

export const USE_CASES = {
  cols: ['Decision intelligence', 'Process intelligence', 'Autonomous operations'],
  rows: [
    { domain: 'Procurement', cells: ['Spend optimisation · Supplier risk · Negotiation assistant', 'Procurement CoE knowledge agent', 'Guided sourcing & contract workflow'], focus: true },
    { domain: 'Finance', cells: ['Cash advisor · Working capital advisor · Board narrative generator', 'Financial close copilot', 'Treasury workflow orchestration'] },
    { domain: 'Capital management', cells: ['Capex portfolio intelligence · Capital allocation advisor', 'Capital governance assistant', 'Investment approval orchestration'] },
    { domain: 'HR', cells: ['Workforce intelligence · Talent planning', 'HR policy advisor', 'Employee self-service & workflow'] },
    { domain: 'Enterprise', cells: ['Executive decision assistant · Enterprise knowledge agent', 'Board report generator', 'Strategic initiative & risk orchestration'] },
  ],
}

// ── Way forward ──────────────────────────────────────────────────────────────
export const WAY_FORWARD = [
  { t: 'Contract operationalisation', color: '#1670C0', items: ['Clean up material and services lines to align with the contract price book', 'Close off Opex POs at financial year-end', 'Evaluate and identify gaps'] },
  { t: 'PO management', color: '#0D9488', items: ['Use dashboard analytics to unpack end-to-end operational components', 'Evaluate open POs before extension', 'Header value evaluations'] },
  { t: 'e-Invoicing', color: '#EA580C', items: ['Onboard high-volume vendors (CMAC)', 'Roll out Phase 2: EDI', 'Reporting on user behaviour (TAT from invoice receipt to GRN)'] },
]

export const ART_OF_POSSIBLE = [
  { from: 'Gatekeeper manual RFx (Ariba)', to: 'Agentic sourcing and bidding: an AI agent runs RFQs, searches vendors, evaluates pricing and negotiates payment terms' },
  { from: 'Periodic vendor checks (B-BBEE and VAT compliance)', to: 'Continuous monitoring with automated checks, emails and confirmations' },
]

// ── RPA & automation (Transformation) ───────────────────────────────────────
export const RPA_BOTS = [
  { name: 'PR Create', stat: '91%', pct: 91, note: 'In scope · FY27 H1', color: '#0EA5E9' },
  { name: 'PO Create', stat: '89%', pct: 89, note: 'Incl. R1 CMAC, Intercompany, mobile', color: '#1670C0' },
  { name: 'PO Release', stat: '>95%', pct: 95, note: 'Incl. mobile POs', color: '#7C3AED' },
  { name: 'PO Acknowledgement', stat: '>90%', pct: 90, note: 'Incl. Apple POs', color: '#0D9488' },
]
export const RPA_DELIVERED = ['R1 services in PRs', 'Apple acknowledgement', 'Automated reporting', 'ITR closed & decommissioned']
export const RPA_IN_FLIGHT = ['Deletion letter review', 'Virtual Pay solution (ABSA VCN)']

export const MICROSOFT_ROUTE = [
  { t: 'Built', b: 'WNS solution built and tested on masked, then real, Telkom contracts' },
  { t: 'Microsoft POC environment', b: 'Microsoft provides the POC environment within Telkom’s enterprise AI ecosystem' },
  { t: 'Lift and shift', b: 'The WNS-built solution moves into the Microsoft environment and is validated with Telkom' },
]
