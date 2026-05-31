export const COLORS = {
  navy:   '#0B2545',
  blue:   '#1670C0',
  sky:    '#0EA5E9',
  teal:   '#0D9488',
  green:  '#059669',
  amber:  '#B45309',
  gold:   '#D97706',
  orange: '#EA580C',
  purple: '#7C3AED',
  muted:  '#94A3B8',
  silver: '#CBD5E1',
  dark:   '#0F172A',
  mid:    '#334155',
  border: '#E2E8F0',
  bg:     '#F7F9FC',
}

export const BOT_TRAJECTORY = [
  { month: "Jan'25", pct: 7,  target: 80 },
  { month: "Feb",    pct: 8,  target: 80 },
  { month: "Mar",    pct: 13, target: 80 },
  { month: "Apr",    pct: 19, target: 80 },
  { month: "May",    pct: 14, target: 80 },
  { month: "Jun",    pct: 14, target: 80 },
  { month: "Jul",    pct: 21, target: 80 },
  { month: "Aug",    pct: 55, target: 80 },
  { month: "Sep",    pct: 61, target: 80 },
  { month: "Oct",    pct: 80, target: 80 },
  { month: "Nov",    pct: 82, target: 80 },
  { month: "Dec",    pct: 82, target: 80 },
  { month: "Jan'26", pct: 86, target: 80 },
  { month: "Feb",    pct: 86, target: 80 },
  { month: "Mar",    pct: 88, target: 80 },
]

export const VENDOR_ONBOARDING = [
  { month: 'Apr', days: 7.8 }, { month: 'May', days: 7.2 },
  { month: 'Jun', days: 6.5 }, { month: 'Jul', days: 5.8 },
  { month: 'Aug', days: 5.1 }, { month: 'Sep', days: 4.5 },
  { month: 'Oct', days: 3.9 }, { month: 'Nov', days: 3.5 },
  { month: 'Dec', days: 3.2 }, { month: 'Jan', days: 2.9 },
  { month: 'Feb', days: 2.9 }, { month: 'Mar', days: 2.9 },
]

export const SPOT_BUY_TAT = [
  { period: "Before Apr'25", days: 4.2 },
  { period: "After Mar'26",  days: 2.2 },
]

export const PO_ACK = [
  { month: "Mar'25", rate: 0.89 }, { month: "May'25", rate: 0.85 },
  { month: "Jul'25", rate: 0.79 }, { month: "Sep'25", rate: 0.73 },
  { month: "Nov'25", rate: 0.67 }, { month: "Jan'26", rate: 0.60 },
  { month: "Mar'26", rate: 0.57 },
]


export const SUPPLIER_PRIVACY = [
  { month: "May'25", pct: 17 },
  { month: "Jun", pct: 18 },
  { month: "Jul", pct: 20 },
  { month: "Aug", pct: 25 },
  { month: "Sep", pct: 30 },
  { month: "Oct", pct: 37 },
  { month: "Nov", pct: 39 },
  { month: "Dec", pct: 42 },
  { month: "Jan'26", pct: 47 },
  { month: "Feb", pct: 51 },
  { month: "Mar", pct: 55 },
]

export const KPI_HIGHLIGHTS_1 = [
  { big: '88%',   label: 'Bot PR Create Achieved',   color: '#0EA5E9', fill: '#EFF6FF' },
  { big: '↓29%',  label: 'PR→PO TAT Reduction',      color: '#0D9488', fill: '#F0FDFA' },
  { big: '5 FTE', label: 'Redeployed to Value Roles', color: '#059669', fill: '#F0FDF4' },
  { big: '80%',   label: 'Overall Auto Coverage',     color: '#7C3AED', fill: '#FAF5FF' },
]

export const AUTOMATION_PANELS = [
  { label: 'OVERALL',           cov: 80,  ach: 93,  sub: 'RPA 76 · SAP 15 · Manual 9', color: '#0EA5E9', fill: '#EFF6FF' },
  { label: 'PR CREATE · RPA',   cov: 60,  ach: 88,  sub: 'Bot-driven requisition',      color: '#1670C0', fill: '#EFF6FF' },
  { label: 'PR→PO · PO CREATE', cov: 80,  ach: 93,  sub: 'RPA 49 · SAP 44 · Man 7',    color: '#7C3AED', fill: '#FAF5FF' },
  { label: 'PO RELEASE 31',     cov: 78,  ach: 98,  sub: 'Release strategy 31',          color: '#EA580C', fill: '#FFF7ED' },
  { label: 'PO RELEASE 37',     cov: 100, ach: 100, sub: 'Release strategy 37',          color: '#059669', fill: '#F0FDF4' },
  { label: 'PO ACK · RPA',      cov: 98,  ach: 99,  sub: 'Auto-ack capture',             color: '#0D9488', fill: '#F0FDFA' },
]

export const BOTS_LIVE = [
  { name: 'PR Create Bot',           stat: '88%',     detail: 'Coverage · Scope analysed & continuously expanded', color: '#0EA5E9' },
  { name: 'PO Release Bot',          stat: 'R31+R37', detail: 'Live · Release 31 & 37 added to BOT scope',          color: '#1670C0' },
  { name: 'PO Acknowledgement Bot',  stat: '↓36%',    detail: 'Non-ack rate · Reminder mail enhancement live',      color: '#0D9488' },
  { name: 'SAP Auto-Create (ROMC)',  stat: 'BOT↔SAP', detail: 'Auto-create collaboration fully operational',        color: '#059669' },
]

export const FY27_PIPELINE = [
  { name: 'IT PR Upfront Approval',        detail: 'Automate the upfront IT requisition approval gate',       color: '#B45309' },
  { name: 'PO Acknowledgement Automation', detail: 'Auto-capture & match Apple acknowledgements',             color: '#EA580C' },
  { name: 'Release 31 — Mobile POs',       detail: 'Extend Release 31 automation to mobile PO scope',        color: '#EA580C' },
  { name: 'UiPath Migration',              detail: 'Community → Enterprise edition — governed platform',      color: '#B45309' },
  { name: 'E-Invoicing / OCR',             detail: 'End-to-end S2P implementation · domain-led',             color: '#B45309' },
]

export const MILESTONES = [
  { name: 'Blueprint Sign-Off',       start: '8-May',  end: '15-May', telkom: 'Yes', status: 'IN PROGRESS', statusColor: '#B45309', statusBg: '#FEF3C7' },
  { name: 'APS Implementation',       start: '18-May', end: '27-May', telkom: 'No',  status: 'Planned',     statusColor: '#94A3B8', statusBg: 'transparent' },
  { name: 'PD for AP Implementation', start: '18-May', end: '27-May', telkom: 'No',  status: 'Planned',     statusColor: '#94A3B8', statusBg: 'transparent' },
  { name: 'QA Testing (SAP ZP2)',     start: '29-May', end: '29-Jun', telkom: 'No',  status: 'Planned',     statusColor: '#94A3B8', statusBg: 'transparent' },
  { name: 'Super User Training',      start: '30-Jun', end: '30-Jun', telkom: 'Yes', status: 'Planned',     statusColor: '#94A3B8', statusBg: 'transparent' },
  { name: 'Solution UAT',             start: '1-Jul',  end: '14-Jul', telkom: 'Yes', status: 'Planned',     statusColor: '#94A3B8', statusBg: 'transparent' },
  { name: 'GO LIVE',              start: '22-Jul', end: '22-Jul', telkom: 'Yes', status: 'TARGET',      statusColor: '#059669', statusBg: '#D1FAE5' },
]

export const FY27_PILLARS = [
  { icon: 'analytics', title: 'Analytics Frontier',            body: 'Advanced analytics to unlock smarter, faster procurement intelligence across all categories', color: '#0EA5E9' },
  { icon: 'exceptions', title: 'Intelligent Exception Mgmt',   body: 'AI-driven flagging & routing eliminates manual triage — exceptions auto-escalate to the right owner', color: '#1670C0' },
  { icon: 'supplier', title: 'Supplier Health & Risk',        body: 'Real-time risk monitoring with predictive alerts before disruptions materialise',              color: '#059669' },
  { icon: 'leadtime', title: 'Predictive Lead Time Learning', body: 'ML on historical patterns to pre-empt supply disruptions & reduce emergency POs',              color: '#B45309' },
  { icon: 'policy', title: 'Auto Budget & Policy',          body: 'Pre-PO automated gate — zero manual budget & policy checking before requisition release',      color: '#EA580C' },
]

export const BOTTOM_KPIS = [
  { big: '5 FTE',  label: 'Redeployed to Value Roles',    color: '#059669' },
  { big: '75→91%', label: 'Vendor NPS (VOS)',             color: '#0EA5E9' },
  { big: '5+',     label: 'Procurement Automations Live', color: '#0D9488' },
  { big: '↓36%',   label: 'Non-Ack POs Reduced',          color: '#B45309' },
]
