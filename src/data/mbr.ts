// Procurement MBR — September 2026 (source: MBR_Procurement_Sep_2026.pptx, 21 Sep 2026)
// Telkom fiscal year: FY27-01 = Apr 2026 … FY27-06 = Sep 2026

export const MBR_PERIOD = {
  label: "Sep '26",
  long: 'September 2026',
  deckDate: '21 Sep 2026',
  slaMonth: "August '26",
}

const M = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

// SR1 — First "inquiry" resolution (SLA-TAT, days)
export const SR1_TAT = [
  { p: 'Apr', count: 18, tat: 0.28 },
  { p: 'May', count: 23, tat: 0.22 },
  { p: 'Jun', count: 15, tat: 0.27 },
  { p: 'Jul', count: 20, tat: 0.25 },
  { p: 'Aug', count: 12, tat: 0.08 },
  { p: 'Sep', count: 14, tat: 0.21 },
]
export const SR1_YTD = { count: 102, tat: 0.23 }

// PR → PO conversion (avg TAT days, PO count)
export const PR2PO = [
  { p: 'Apr', tat: 0.08, pos: 3915 },
  { p: 'May', tat: 0.0, pos: 5535 },
  { p: 'Jun', tat: 0.17, pos: 5262 },
  { p: 'Jul', tat: 0.13, pos: 5057 },
  { p: 'Aug', tat: 0.48, pos: 4819 },
  { p: 'Sep', tat: -0.03, pos: 5298 },
]
export const PR2PO_YTD = { tat: 0.14, pos: 29886 }
export const PR2PO_SEP_MIX = [
  { name: 'AUTO', pos: 2852, tat: -0.22, color: '#0EA5E9' },
  { name: 'BOT', pos: 1891, tat: 0.15, color: '#1670C0' },
  { name: 'NON-BOT', pos: 555, tat: 0.34, color: '#EA580C' },
]

// PR release → PO release TAT (business hours) by creation channel
export const PR_REL_HOURS = [
  { p: 'Apr', AUTO: 3, BOT: 29, 'NON-BOT': 20, RFQ: 36 },
  { p: 'May', AUTO: 2, BOT: 14, 'NON-BOT': 13, RFQ: 45 },
  { p: 'Jun', AUTO: 5, BOT: 16, 'NON-BOT': 23, RFQ: 45 },
  { p: 'Jul', AUTO: 1, BOT: 19, 'NON-BOT': 42, RFQ: 38 },
  { p: 'Aug', AUTO: 0, BOT: 33, 'NON-BOT': 74, RFQ: 48 },
  { p: 'Sep', AUTO: 1, BOT: 8, 'NON-BOT': 13, RFQ: 44 },
]

// Spot buy (avg days: cost-centre approval vs WNS, PO count)
export const SPOT_BUY = [
  { p: 'Apr', cc: 1.89, wns: 1.35, pos: 188 },
  { p: 'May', cc: 2.33, wns: 1.4, pos: 172 },
  { p: 'Jun', cc: 2.29, wns: 1.35, pos: 140 },
  { p: 'Jul', cc: 1.94, wns: 1.07, pos: 188 },
  { p: 'Aug', cc: 2.41, wns: 1.85, pos: 333 },
  { p: 'Sep', cc: 2.29, wns: 1.5, pos: 355 },
]
export const SPOT_BUY_YTD = { cc: 2.33, wns: 1.6, pos: 1476, note: "YTD incl. Oct MTD (100 POs)" }

// SR9 — Supplier onboarding (transactional)
export const SR9 = [
  { p: 'Apr', count: 24, tat: 3.54 },
  { p: 'May', count: 22, tat: 3.82 },
  { p: 'Jun', count: 34, tat: 3.85 },
  { p: 'Jul', count: 24, tat: 3.13 },
  { p: 'Aug', count: 30, tat: 3.47 },
  { p: 'Sep', count: 21, tat: 2.67 },
]
export const SR9_YTD = { count: 155, tat: 3.45 }

// Vendor VAT number project (SAP MDM update) — outstanding vendors
export const VAT_PROJECT = [
  { d: "15 Sep", vendors: 44 },
  { d: "29 Sep", vendors: 8 },
]

// Value realisation — auctions FY27 YTD (R million)
export const AUCTIONS = [
  { name: 'Reverse auctions', count: 41, rm: 5.9, color: '#059669' },
  { name: 'Forward auctions', count: 8, rm: 4.2, color: '#0EA5E9' },
]

export const CALL_OUTS = [
  'Reduction in spot buy — Qalaboche contract',
  'Overall target value error decrease',
  'All GRC testing submitted',
]

export const OCR_UPDATE = {
  goLive: '22 August 2026',
  onboarding: ['CMAC — 5 vendors', 'International vendors — Amdocs', 'ICT vendors — 9 across T001 & T080'],
  challenge: 'CMAC invoice duplication to APS',
}

// Transformation update
export const AUTOMATIONS = [
  { name: 'PR Create', stat: '>88%', pct: 88, note: 'Running smoothly', color: '#0EA5E9' },
  { name: 'PO Release', stat: '>95%', pct: 95, note: 'Running smoothly (incl. mobile)', color: '#1670C0' },
  { name: 'PR2PO', stat: '~90%', pct: 90, note: 'Running smoothly', color: '#7C3AED' },
  { name: 'PO Acknowledgement', stat: '>90%', pct: 90, note: 'Running smoothly', color: '#0D9488' },
]

export const IN_PRODUCTION = [
  { name: 'ITR', status: 'Closed & decommissioned', tone: 'muted' },
  { name: 'R1 Services in PRs', status: 'Completed, in production', tone: 'done' },
  { name: 'Apple Acknowledgement', status: 'Completed, in production', tone: 'done' },
  { name: 'Reports', status: 'In production — monitored & enhanced', tone: 'done' },
]

export const NEW_INITIATIVES = [
  { name: 'Deletion Letter Review', status: 'WIP — good progress' },
  { name: 'Virtual Pay Solution', status: 'AS-IS & TO-BE documented · solution WIP' },
]

// SLA performance (reported for August '26)
export type SlaRow = {
  no: string; name: string; std: string; num?: number; den?: number
  wns: string; actual?: string; group: string
}
export const SLAS: SlaRow[] = [
  { no: '1', name: 'First "inquiry" resolution', std: '99%', num: 12, den: 12, wns: '100%', actual: '100%', group: 'Purchasing' },
  { no: '2', name: 'PR to PO conversion', std: '99%', num: 4818, den: 4818, wns: '100%', actual: '97%', group: 'Purchasing' },
  { no: '3', name: 'PO amendments', std: '99%', num: 920, den: 920, wns: '100%', actual: '97%', group: 'Purchasing' },
  { no: '4', name: 'Open order management', std: '95%', num: 2294, den: 12, wns: '1%', actual: '0%', group: 'Purchasing' },
  { no: '5', name: 'PO acknowledgements', std: '95%', num: 1499, den: 1499, wns: '100%', actual: '100%', group: 'Purchasing' },
  { no: '6', name: 'Spot buy TAT — PR to quote finalisation', std: '98%', num: 328, den: 329, wns: '100%', actual: '85%', group: 'Purchasing' },
  { no: '7', name: 'Spot buy TAT — quote finalisation to PO release', std: '98%', num: 329, den: 329, wns: '100%', actual: '100%', group: 'Purchasing' },
  { no: '8a', name: '(Prospective) supplier onboarding — single', std: '95%', num: 9, den: 9, wns: '100%', actual: '66%', group: 'Supplier' },
  { no: '8b', name: '(Prospective) supplier onboarding — 5–10 per ARS', std: '95%', num: 1, den: 1, wns: '100%', actual: '100%', group: 'Supplier' },
  { no: '8c', name: '(Prospective) supplier onboarding — 10–20 per ARS', std: '95%', wns: 'No activity', group: 'Supplier' },
  { no: '8d', name: '(Prospective) supplier onboarding — 20+ per ARS', std: '95%', wns: 'No activity', group: 'Supplier' },
  { no: '9a', name: '(Transactional) supplier onboarding — single', std: '95%', num: 30, den: 30, wns: '100%', actual: '90%', group: 'Supplier' },
  { no: '9b', name: '(Transactional) supplier onboarding — 5–10 per ARS', std: '95%', wns: 'No activity', group: 'Supplier' },
  { no: '9c', name: '(Transactional) supplier onboarding — 10–20 per ARS', std: '95%', wns: 'No activity', group: 'Supplier' },
  { no: '9d', name: '(Transactional) supplier onboarding — 20+ per ARS', std: '95%', wns: 'No activity', group: 'Supplier' },
  { no: '10', name: 'Material & services masters', std: '95%', num: 182, den: 182, wns: '100%', actual: '99%', group: 'Master Data & Contracts' },
  { no: '11', name: 'Contracts', std: '95%', num: 258, den: 258, wns: '100%', actual: '99%', group: 'Master Data & Contracts' },
  { no: '12', name: 'B-BBEE updates & maintenance', std: '99% (TBD)', num: 130, den: 130, wns: '100%', actual: '100%', group: 'Master Data & Contracts' },
  { no: '13', name: 'Knowledge management & training', std: '95%', num: 4, den: 4, wns: '100%', actual: '100%', group: 'Governance & Reporting' },
  { no: '14', name: 'P-Card spend compliance', std: 'Stepped → 99%', num: 26, den: 26, wns: '100%', actual: '100%', group: 'P-Card' },
  { no: '15', name: 'P-Card operations reporting', std: '95%', num: 143, den: 143, wns: '100%', actual: '100%', group: 'P-Card' },
  { no: '16', name: 'Sourcing events / projects admin support', std: '99%', num: 144, den: 144, wns: '100%', actual: '100%', group: 'Sourcing' },
  { no: '17', name: 'Process documentation / WIM upgrades', std: '99%', wns: 'No activity', actual: 'No new WIMs submitted', group: 'Governance & Reporting' },
  { no: '18', name: 'Projects (excl. BPET, analytics & reporting)', std: 'Per project timelines', wns: 'Tracked via weekly RPA governance', group: 'Governance & Reporting' },
  { no: '19', name: 'Standard recurring reports', std: '99%', num: 1, den: 1, wns: '100%', actual: '100%', group: 'Governance & Reporting' },
]

export const FOCUS = [
  {
    no: '01', stream: 'Sourcing Support', color: '#1670C0',
    items: [
      { t: 'SAP e-Sourcing archive', b: 'RPA extracts for contracts & RFx events — next: move to OpenText for validation checks.' },
      { t: 'Cross-skilling', b: 'Order management SLA reporting · order management WIM finalisation.' },
      { t: 'Ariba tasks', b: 'Demo to COP on 12 October 2026.' },
    ],
  },
  {
    no: '02', stream: 'PO Management', color: '#0D9488',
    items: [
      { t: 'PO release TAT', b: 'Continuous monitoring to ensure all POs are released.' },
      { t: 'Open order management', b: 'Drive overdue-PO target from 30 to 15 days.' },
      { t: 'Automation drive', b: 'Drive deletion letter adoption.' },
    ],
  },
  {
    no: '03', stream: 'Master Data Management', color: '#7C3AED',
    items: [
      { t: 'Vendor VAT number project', b: 'Non-VAT registered vs spend analysis.' },
      { t: 'Ariba', b: 'Investigate vendor changes triggering SCOC version changes.' },
      { t: 'Master data clean-up', b: 'Company registration number format alignment.' },
    ],
  },
  {
    no: '04', stream: 'General — Across Streams', color: '#EA580C',
    items: [
      { t: 'Work instructions', b: 'Revision per agreed schedule & updated templates.' },
      { t: 'Automation scoping', b: 'Continued interrogation for automation opportunities.' },
      { t: 'Cross-skilling', b: 'Continued team cross-training.' },
      { t: 'OCR', b: 'Continued support for e-Invoicing rollout.' },
    ],
  },
]

export const COMPLIMENTS = [
  { from: 'Sourcing', who: 'Tammy', quote: 'Outstanding effort compiling a comprehensive document to define the International Vendor process — went beyond WNS scope, engaging Treasury, AP and Sourcing.' },
  { from: 'Emma · Sourcing Support', quote: 'Thank you team — appreciate all the hard work that went into this.' },
  { from: 'Garon', quote: 'Thank you Apple — real motivation to everyone. Thank you Hannes and everyone who made this happen.' },
  { from: 'Shane Frank Smitsdorff', quote: 'All done and all good — thank you for arranging and assisting (BJ).' },
]

export const MONTHS = M
