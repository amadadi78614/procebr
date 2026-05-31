'use client'
import { useState } from 'react'
import {
  Activity, AlertTriangle, BarChart3, Bot, Brain,
  CheckCircle2, ChevronRight, Clock3, Cpu, Database,
  GitMerge, Layers, Package, Rocket, ShieldCheck,
  Sparkles, Target, TrendingUp, Trophy, Users, Zap,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'

/* ══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */

const AUTOMATIONS = [
  {
    num:'01', status:'IN TEST', statusColor:'#F59E0B', statusBg:'#FEF3C7', statusBdr:'#FDE68A',
    title:'Capex Data Extraction for AUC Management',
    tech:'LSS · Automation',
    body:'Auto-scheduled AUC reporting — cuts TAT and frees SMEs for strategic work.',
    next:'Full rollout & monitoring',
    color:'#1D4ED8', bg:'#EEF2FF', bar:'#6366F1',
    icon:Database,
  },
  {
    num:'02', status:'ON HOLD', statusColor:'#9CA3AF', statusBg:'#F3F4F6', statusBdr:'#E5E7EB',
    title:'Carry-over Funding',
    tech:'Python · Sequential Txn',
    body:'Enable budget alignment funding for carry-over projects — SME dependency cut.',
    next:'Client implemented own solution',
    color:'#6D28D9', bg:'#F5F3FF', bar:'#8B5CF6',
    icon:Package,
  },
  {
    num:'03', status:'LIVE', statusColor:'#15803D', statusBg:'#DCFCE7', statusBdr:'#86EFAC',
    title:'Electronic Asset Verification',
    tech:'SAP Custom Transaction',
    body:'Powering 99.6% verification. Alleviates verification resources with up-to-date statuses.',
    next:'Metro Ethernet & POTN',
    color:'#0F766E', bg:'#F0FDFA', bar:'#14B8A6',
    icon:ShieldCheck,
  },
  {
    num:'04', status:'GO-LIVE READY', statusColor:'#0369A1', statusBg:'#EFF6FF', statusBdr:'#BAE6FD',
    title:'Project AUC Life Cycle Analytics',
    tech:'Analytics Dashboard',
    body:'Daily-refreshed AUC model with multi-year opening balance per BU.',
    next:'Operationalise reporting model',
    color:'#0369A1', bg:'#F0F9FF', bar:'#0EA5E9',
    icon:BarChart3,
  },
]

const ROADMAP = {
  NOW: {
    label:'NOW', sub:'0–90 DAYS · LOCK IN', color:'#0369A1', bg:'#EFF6FF',
    items:[
      { num:'01', title:'Capex Data Extraction — full rollout', tech:'LSS · Automation', next:'AUC TAT compression' },
      { num:'02', title:'AUC Life Cycle Analytics — go-live', tech:'Analytics Dashboard', next:'Daily reporting model' },
      { num:'03', title:'FY27 Verification cycle IT Hardware & Software', tech:'SAP Custom Txn · RPA', next:'Asset & license confirmation' },
    ],
  },
  NEXT: {
    label:'NEXT', sub:'FY27 · SCALE & DEEPEN', color:'#0F766E', bg:'#F0FDFA',
    items:[
      { num:'01', title:'Metro Ethernet + POTN asset verification', tech:'SAP Custom Txn', next:'Tech-resource relief' },
      { num:'02', title:'Capitalisation Forecast Analysis', tech:'Alignment with Depreciation model', next:'Forecast alignment' },
      { num:'03', title:'Multi-year AUC opening balance per BU', tech:'Analytics · SAP', next:'Cross-BU visibility' },
    ],
  },
  BEYOND: {
    label:'BEYOND', sub:'FY28+ · STRATEGIC SHIFT', color:'#7C3AED', bg:'#F5F3FF',
    items:[
      { num:'01', title:'Predictive AUC & capex modelling', tech:'ML · Scenario Planning', next:'Forecast accuracy' },
      { num:'02', title:'Agentic capex workflow orchestration', tech:'Agentic AI · UiPath', next:'End-to-end autonomy' },
      { num:'03', title:'Cross-BU autonomous reporting & insight', tech:'Agentic · Analytics', next:'Strategic advisory role' },
    ],
  },
}

const AI_TABLE = [
  { area:'Routine Accounting', app:'Automated reconciliations', rel:'SAP PS/AA: direct automation target', color:'#1D4ED8', icon:Database },
  { area:'Advisory Services',  app:'Predictive analytics, dashboards', rel:'Smart CapEx decisions', color:'#0F766E', icon:BarChart3 },
  { area:'Risk',               app:'Real-time anomaly detection', rel:'Capex approval and execution control', color:'#C2410C', icon:AlertTriangle },
  { area:'Cloud / ERP',        app:'Unified AI platforms & ERPs', rel:'SAP ECC 6.0 + AI layer integration', color:'#6D28D9', icon:Layers },
  { area:'Talent Utilisation', app:'Shift clerical → strategic roles', rel:'WNS team upskilling', color:'#0369A1', icon:Users },
]

const AI_ROADMAP = [
  {
    num:'1', horizon:'Short-Term', period:'0–12 months', color:'#0369A1', bg:'#EFF6FF', bar:'#0EA5E9',
    items:['Implement best practices for improving capitalisation forecasts','Extend AUC Analytics — spend plan & CapEx rollout','Data governance: clean pipelines for reliable AI output'],
    outcome:'Faster close cycles · Reduced errors · Quick ROI',
  },
  {
    num:'2', horizon:'Mid-Term', period:'1–3 years', color:'#0F766E', bg:'#F0FDFA', bar:'#14B8A6',
    items:['Predictive capitalisation: AI models for CapEx & cash flow','Real-time project progress tracking, dashboards','AI literacy training — WNS Project Accountants'],
    outcome:'Stronger governance · New capability',
  },
  {
    num:'3', horizon:'Long-Term', period:'3–5 years', color:'#7C3AED', bg:'#F5F3FF', bar:'#8B5CF6',
    items:['Agentic AI: autonomous agents to manage end-to-end workflows','Real-time Telco finance: continuous vs. month-end','WNS as strategic CapEx & AI partner'],
    outcome:'Competitive differentiation · Premium positioning · SLA renewal secured',
  },
]

const DECADE_STATS = [
  { val:'R60m',    lbl:'Abortive cost recovery identified',           color:'#0369A1', bg:'#EFF6FF', border:'#BAE6FD' },
  { val:'R140m',   lbl:'Finance costs surfaced — Hold Reasons Analytics', color:'#0F766E', bg:'#F0FDFA', border:'#99F6E4' },
  { val:'R5.1m',   lbl:'Network Damages opportunity identified',      color:'#7C3AED', bg:'#F5F3FF', border:'#DDD6FE' },
  { val:'R6.7m',   lbl:'Inter-Project Material opportunity uncovered', color:'#C2410C', bg:'#FFF7ED', border:'#FDBA74' },
  { val:'103%',    lbl:'Project Execution Management',                color:'#0369A1', bg:'#EFF6FF', border:'#BAE6FD' },
  { val:'34%',     lbl:'Electronic automated asset verification',     color:'#0F766E', bg:'#F0FDFA', border:'#99F6E4' },
  { val:'99.6%',   lbl:'Asset base verification — FY26 cycle',       color:'#15803D', bg:'#F0FDF4', border:'#86EFAC' },
  { val:'100%',    lbl:'On-time capitalisation every financial year',  color:'#0369A1', bg:'#EFF6FF', border:'#BAE6FD' },
  { val:'26%',     lbl:'TAT improvement — 19 days vs 26-day target',  color:'#6D28D9', bg:'#F5F3FF', border:'#DDD6FE' },
  { val:'36',      lbl:'CoE value-add projects delivered to Telkom',  color:'#C2410C', bg:'#FFF7ED', border:'#FDBA74' },
  { val:'ZERO',    lbl:'Audit issues raised across the full engagement', color:'#15803D', bg:'#F0FDF4', border:'#86EFAC' },
  { val:'Best SSC',lbl:'BPeSA National Award — Best Shared Services in SA', color:'#0369A1', bg:'#EFF6FF', border:'#BAE6FD' },
]

const JOURNEY = [
  { year:'2016–17', title:'Inception', body:"Co-Location Model implemented. CoE established with Lean Six Sigma analysis across 10+ priority processes.", color:'#1D4ED8' },
  { year:'2018',    title:'First Robot',body:"First Robot deployed · Analytics tools built. Capitalisation Lifecycle & Regional Project Lifecycle tools delivered.", color:'#0F766E' },
  { year:'2019',    title:'Scale Up',  body:"LSS and RPA projects scaled. Digitisation of upstream documentation; Funding movement analytics live.", color:'#7C3AED' },
  { year:'2020',    title:'COVID — Zero Disruption', body:"Zero operational disruption. Human relationships built over years made remote continuity possible. 'Best SSC in SA' — BPeSA Award.", color:'#C2410C' },
  { year:'2021–23', title:'Higher-Order Data Maturity', body:"CoE delivered 36 value-add projects — still accelerating.", color:'#0369A1' },
  { year:'2024/25', title:'Carve-out + 6 Bots', body:"Carve-out Openserve manual CPA. 6 Bots / Tools deployed and active for Electronic Asset Verification.", color:'#0F766E' },
  { year:'2026',    title:'AI-Augmented Operations', body:"Bot developed for PS_Download. Electronic Asset Verification expanded: MSAN, GPON, IT Hardware, IT Software (ABACUS). AUC Analytics live.", color:'#15803D' },
]

const PHILOSOPHY = [
  {
    title:'AUTOMATE', sub:'Let machines do machine work', color:'#1D4ED8', bg:'#EEF2FF',
    items:['Invoice data capture & 3-way PO matching','SAP PS budget carry-over rules (CJ32/IM52)','Depreciation run posting & period-end jobs','Routine asset verification (ABACUS-linked)','Exception flagging & audit trail generation','Scheduled reporting & dashboard refresh'],
    outcome:'Zero human time wasted on repetitive data entry',
    icon:Bot,
  },
  {
    title:'AUGMENT', sub:'Give humans superpowers', color:'#0F766E', bg:'#F0FDFA',
    items:['AI-assisted capital conversion forecasting','Anomaly detection alerts for human review','Predictive FNLD risk scoring per project','Real-time spend-vs-budget dashboards','Natural language queries on SAP PS/AA data','AI-suggested settlement & capitalisation rules'],
    outcome:'Every team member becomes a data analyst',
    icon:Brain,
  },
  {
    title:'ELEVATE', sub:'Unlock strategic human contribution', color:'#7C3AED', bg:'#F5F3FF',
    items:['Project Accountants become strategic advisors','Finance teams drive Smart CapEx decisions','WNS team governs all AI agents end-to-end','Human oversight: the irreplaceable safety net','Cross-functional Mobile PMO partnership'],
    outcome:'Job evolution — not job elimination',
    icon:Sparkles,
  },
]

/* ══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════════════════ */

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: color + '20' }}>
      <div className="h-full rounded-full" style={{ width:`${pct}%`, background: color }}/>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TABS
══════════════════════════════════════════════════════════════════════════ */

/* ── TAB 1: Automation Pipeline ─────────────────────────────────────────── */
function TabAutomation() {
  const [sel, setSel] = useState(0)
  const active = AUTOMATIONS[sel]

  return (
    <div className="space-y-3">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background:'linear-gradient(118deg,#0B2545 0%,#0f3565 55%,#0B2545 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[.04]"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute right-0 top-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(99,102,241,.18),transparent 65%)', transform:'translate(30%,-40%)' }}/>
        <div className="relative flex items-center gap-5 px-5 py-3.5">
          <div className="flex-1">
            <p className="text-[8.5px] font-bold tracking-[.2em] uppercase text-indigo-300/80 mb-1">Transformation Focus</p>
            <h2 className="text-[18px] font-extrabold text-white leading-tight tracking-tight mb-0.5">
              RPA & Automation Pipeline
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">Four automations re-engineering the CWIP & Asset Management lifecycle</p>
          </div>
          <div className="w-px h-12 bg-white/10 shrink-0"/>
          <div className="flex gap-2.5 shrink-0">
            {[
              { val:'4',     sub:'Active initiatives',  c:'#A5B4FC', bg:'rgba(99,102,241,.14)', bdr:'rgba(99,102,241,.28)' },
              { val:'2',     sub:'Live in production',  c:'#6EE7B7', bg:'rgba(52,211,153,.12)', bdr:'rgba(52,211,153,.26)' },
              { val:'99.6%', sub:'Asset Verification',  c:'#FCD34D', bg:'rgba(251,191,36,.12)', bdr:'rgba(251,191,36,.25)' },
              { val:'3 of 4',sub:'Free SMEs for strategy', c:'#C4B5FD', bg:'rgba(139,92,246,.13)', bdr:'rgba(139,92,246,.27)' },
            ].map(s=>(
              <div key={s.val} className="rounded-xl px-3 py-2.5 text-center" style={{ background:s.bg, border:`1.5px solid ${s.bdr}` }}>
                <div className="text-[18px] font-black leading-none whitespace-nowrap" style={{ color:s.c }}>{s.val}</div>
                <div className="text-[7.5px] font-semibold text-white/50 mt-0.5 whitespace-nowrap">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress pipeline strip */}
      <div className="rounded-xl border border-[#E8ECF5] bg-white px-4 py-2.5 flex items-center gap-0"
        style={{ boxShadow:'0 1px 4px rgba(15,23,42,.05)' }}>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#94A3B8] mr-4">PROGRESS PIPELINE</span>
        {['CONCEPT','BUILD','TEST','LIVE'].map((stage, i) => (
          <div key={stage} className="flex items-center gap-0 flex-1">
            <div className="flex-1 h-px bg-[#E2E8F0]"/>
            <div className="flex flex-col items-center px-3">
              <div className="w-2 h-2 rounded-full mb-1"
                style={{ background: i===3 ? '#22C55E' : i===2 ? '#F59E0B' : '#CBD5E1' }}/>
              <span className="text-[8px] font-bold uppercase tracking-wider"
                style={{ color: i===3 ? '#15803D' : i===2 ? '#92400E' : '#94A3B8' }}>{stage}</span>
            </div>
            {i < 3 && <div className="flex-1 h-px bg-[#E2E8F0]"/>}
          </div>
        ))}
      </div>

      {/* Cards grid + detail */}
      <div className="grid grid-cols-[1fr_1.4fr] gap-3">
        {/* Left: 4 card selectors */}
        <div className="space-y-2">
          {AUTOMATIONS.map((a, idx) => {
            const Icon = a.icon
            const isActive = sel === idx
            return (
              <button key={a.num} onClick={() => setSel(idx)}
                className={clsx('w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200',
                  isActive ? 'shadow-lg scale-[1.01]' : 'bg-white border-[#E8ECF5] hover:shadow-md hover:border-[#C7D2FE] hover:-translate-y-0.5'
                )}
                style={isActive ? { borderColor:a.color, background:a.bg, boxShadow:`0 8px 24px ${a.color}20` } : {}}>
                <div className={clsx('h-[3px] w-full', isActive && '')}
                  style={{ background:isActive ? `linear-gradient(90deg,${a.color},${a.bar})` : 'transparent' }}/>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <span className="text-[10px] font-black text-[#94A3B8]">{a.num}</span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background:a.color+'15', border:`1px solid ${a.color}25` }}>
                    <Icon size={13} style={{ color:a.color }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#0F172A] leading-tight truncate">{a.title}</p>
                    <p className="text-[8px] text-[#94A3B8] mt-0.5">{a.tech}</p>
                  </div>
                  <span className="text-[7.5px] font-black px-2 py-0.5 rounded-full shrink-0"
                    style={{ background:a.statusBg, color:a.statusColor, border:`1px solid ${a.statusBdr}` }}>
                    {a.status}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right: detail */}
        <div className="rounded-2xl border-2 overflow-hidden transition-all duration-300"
          style={{ borderColor:active.color+'40', background:`linear-gradient(145deg,${active.bg},white 60%)`, boxShadow:`0 8px 32px ${active.color}14` }}>
          <div className="h-[3px]" style={{ background:`linear-gradient(90deg,${active.color},${active.bar})` }}/>
          <div className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background:active.color+'18', border:`1.5px solid ${active.color}30` }}>
                <active.icon size={20} style={{ color:active.color }}/>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[8px] font-black" style={{ color:active.color }}>INITIATIVE {active.num}</span>
                  <span className="text-[7.5px] font-black px-2 py-0.5 rounded-full"
                    style={{ background:active.statusBg, color:active.statusColor, border:`1px solid ${active.statusBdr}` }}>
                    {active.status}
                  </span>
                </div>
                <h3 className="text-[14px] font-extrabold text-[#0F172A] leading-tight">{active.title}</h3>
                <p className="text-[9px] font-semibold mt-0.5" style={{ color:active.color }}>{active.tech}</p>
              </div>
            </div>
            <p className="text-[11px] text-[#334155] leading-relaxed mb-4">{active.body}</p>
            <div className="rounded-xl px-3.5 py-3 flex items-center gap-2.5"
              style={{ background:active.color+'0c', border:`1px solid ${active.color}22` }}>
              <ChevronRight size={14} style={{ color:active.color }}/>
              <div>
                <p className="text-[8.5px] font-bold uppercase tracking-wider mb-0.5" style={{ color:active.color }}>Next Step</p>
                <p className="text-[10px] font-semibold text-[#0F172A]">{active.next}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-[9px] text-[#94A3B8] italic">
                "From transactional processors to strategic advisors — every automation is a step in that direction."
              </span>
              {active.status === 'LIVE' && (
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-green-700 ml-3 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow:'0 0 0 3px #86efac55' }}/>
                  LIVE
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer stat */}
      <div className="rounded-xl bg-[#0B2545] px-4 py-2.5 flex items-center gap-3">
        <span className="text-[22px] font-black text-[#38BDF8]">34%</span>
        <span className="text-[10px] text-slate-300 font-medium">Enabled automated matching</span>
        <div className="ml-auto text-[9px] text-slate-500">BPET · Telkom WO10 · CWIP & AM</div>
      </div>
    </div>
  )
}

/* ── TAB 2: Roadmap ─────────────────────────────────────────────────────── */
function TabRoadmap() {
  return (
    <div className="space-y-3">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background:'linear-gradient(118deg,#0B2545 0%,#1a1040 55%,#0B2545 100%)' }}>
        <div className="absolute inset-0 opacity-[.04] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute right-0 top-0 w-80 h-80 pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(139,92,246,.15),transparent 65%)', transform:'translate(30%,-40%)' }}/>
        <div className="relative flex items-center gap-5 px-5 py-3.5">
          <div className="flex-1">
            <p className="text-[8.5px] font-bold tracking-[.2em] uppercase text-violet-300/80 mb-1">Pipeline & Future Opportunities</p>
            <h2 className="text-[18px] font-extrabold text-white leading-tight mb-0.5">Where We Go Next</h2>
            <p className="text-[10px] text-slate-400 font-medium">Nine opportunities across three horizons — FY27 → FY28+</p>
          </div>
          <div className="w-px h-12 bg-white/10 shrink-0"/>
          <div className="flex gap-2.5 shrink-0">
            {[
              { val:'9',    sub:'Future opportunities', c:'#C4B5FD', bg:'rgba(139,92,246,.14)', bdr:'rgba(139,92,246,.28)' },
              { val:'3',    sub:'Horizons scoped',      c:'#6EE7B7', bg:'rgba(52,211,153,.12)', bdr:'rgba(52,211,153,.26)' },
              { val:'4→13', sub:'Automations by FY28',  c:'#FCD34D', bg:'rgba(251,191,36,.12)', bdr:'rgba(251,191,36,.25)' },
            ].map(s=>(
              <div key={s.val} className="rounded-xl px-3.5 py-2.5 text-center" style={{ background:s.bg, border:`1.5px solid ${s.bdr}` }}>
                <div className="text-[20px] font-black leading-none whitespace-nowrap" style={{ color:s.c }}>{s.val}</div>
                <div className="text-[7.5px] font-semibold text-white/50 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Three horizon columns */}
      <div className="grid grid-cols-3 gap-2.5">
        {Object.values(ROADMAP).map(h => (
          <div key={h.label} className="rounded-2xl overflow-hidden border-2"
            style={{ borderColor:h.color+'30', boxShadow:`0 4px 16px ${h.color}0e` }}>
            {/* Column header */}
            <div className="px-4 py-3 flex items-center gap-2.5"
              style={{ background:`linear-gradient(135deg,${h.color},${h.color}cc)` }}>
              <div>
                <p className="text-[16px] font-black text-white leading-none">{h.label}</p>
                <p className="text-[8px] font-bold text-white/70 mt-0.5 uppercase tracking-wider">{h.sub}</p>
              </div>
            </div>

            {/* Items */}
            <div className="p-2.5 space-y-2" style={{ background:h.bg }}>
              {h.items.map(item => (
                <div key={item.num} className="rounded-xl bg-white border border-white/80 p-2.5"
                  style={{ boxShadow:`0 1px 4px ${h.color}12` }}>
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[10px] font-black shrink-0" style={{ color:h.color+'80' }}>{item.num}</span>
                    <p className="text-[10px] font-bold text-[#0F172A] leading-tight">{item.title}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-[8.5px] text-[#64748B]">{item.tech}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ChevronRight size={10} style={{ color:h.color }}/>
                      <p className="text-[8.5px] font-semibold" style={{ color:h.color }}>{item.next}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom callout */}
      <div className="rounded-xl overflow-hidden border border-[#E8ECF5]">
        <div className="flex items-center gap-0">
          {[
            { label:'Process automation', c:'#1D4ED8' },
            { label:'→', c:'#94A3B8' },
            { label:'Predictive insight', c:'#0F766E' },
            { label:'→', c:'#94A3B8' },
            { label:'Autonomous capital management', c:'#7C3AED' },
          ].map((s, i) => (
            <div key={i} className={clsx('px-4 py-2.5 text-center', s.label==='→' ? 'px-2' : 'flex-1')}
              style={{ background: s.label==='→' ? '#F8FAFC' : s.c+'08' }}>
              <span className="text-[10px] font-bold" style={{ color:s.c }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── TAB 3: AI in Finance ───────────────────────────────────────────────── */
function TabAI() {
  return (
    <div className="space-y-3">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background:'linear-gradient(118deg,#0B2545 0%,#0a2a1e 55%,#0B2545 100%)' }}>
        <div className="absolute inset-0 opacity-[.04] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute right-0 top-0 w-80 h-80 pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(20,184,166,.15),transparent 65%)', transform:'translate(30%,-40%)' }}/>
        <div className="relative flex items-center gap-5 px-5 py-3.5">
          <div className="flex-1">
            <p className="text-[8.5px] font-bold tracking-[.2em] uppercase text-teal-300/80 mb-1">What the Market Is Saying</p>
            <h2 className="text-[18px] font-extrabold text-white leading-tight mb-0.5">AI Applications in Finance — 2026</h2>
            <p className="text-[10px] text-slate-400 font-medium">Strategic roadmap for AI in Capex & Asset Management</p>
          </div>
          <div className="w-px h-12 bg-white/10 shrink-0"/>
          <div className="rounded-xl px-4 py-2.5 text-center"
            style={{ background:'rgba(20,184,166,.14)', border:'1.5px solid rgba(20,184,166,.28)' }}>
            <p className="text-[9px] font-bold text-teal-300/70 mb-1">"Agentic AI is no longer</p>
            <p className="text-[9px] font-black text-teal-200">the new frontier —</p>
            <p className="text-[9px] font-black text-teal-200">it's the new baseline."</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1.4fr] gap-3">
        {/* AI Applications table */}
        <div className="rounded-2xl border border-[#E8ECF5] bg-white overflow-hidden"
          style={{ boxShadow:'0 1px 4px rgba(15,23,42,.05),0 4px 12px rgba(15,23,42,.04)' }}>
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-[#F1F5F9]"
            style={{ background:'linear-gradient(90deg,#F8FAFC,white)' }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-[#0B2545]">
              <BarChart3 size={13} className="text-white"/>
            </div>
            <p className="text-[10px] font-bold text-[#0B2545]">AI Applications in Finance</p>
          </div>
          {/* Header row */}
          <div className="grid grid-cols-3 gap-0 px-3 py-1.5 border-b border-[#F1F5F9]">
            {['Area','AI Application','WNS / Telkom Relevance'].map(h=>(
              <p key={h} className="text-[7.5px] font-black uppercase tracking-wider text-[#94A3B8]">{h}</p>
            ))}
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {AI_TABLE.map(row => {
              const Icon = row.icon
              return (
                <div key={row.area} className="grid grid-cols-3 gap-0 px-3 py-2 items-center hover:bg-[#F8FAFC] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background:row.color+'15' }}>
                      <Icon size={11} style={{ color:row.color }}/>
                    </div>
                    <span className="text-[9.5px] font-bold text-[#0F172A] leading-tight">{row.area}</span>
                  </div>
                  <span className="text-[9px] text-[#475569] leading-snug">{row.app}</span>
                  <span className="text-[9px] font-semibold leading-snug" style={{ color:row.color }}>{row.rel}</span>
                </div>
              )
            })}
          </div>
          {/* Automation imperative */}
          <div className="mx-3 mb-3 mt-2 rounded-xl px-3 py-2.5"
            style={{ background:'linear-gradient(135deg,#0B2545,#1e3a5f)', border:'1px solid rgba(56,189,248,.15)' }}>
            <p className="text-[8.5px] font-bold text-sky-300 mb-1.5 uppercase tracking-wider">The Automation Imperative</p>
            {[
              'SAP PS is the gold standard for Telco CapEx (Telco Mag, 2026)',
              '78% of global executives must reinvent operating models for agentic AI',
              'Month-end close: from weeks to days with automation (Bluefort, 2025)',
            ].map(s=>(
              <div key={s} className="flex items-start gap-1.5 mb-1">
                <div className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0"/>
                <p className="text-[8.5px] text-slate-300 leading-snug">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Roadmap */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B2545]">Strategic Roadmap — AI in Finance</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
          </div>
          {AI_ROADMAP.map(r => (
            <div key={r.num} className="rounded-2xl overflow-hidden border-2"
              style={{ borderColor:r.color+'30' }}>
              <div className="flex items-center gap-3 px-4 py-2.5"
                style={{ background:`linear-gradient(90deg,${r.color},${r.color}99)` }}>
                <span className="text-[28px] font-black leading-none text-white/25">{r.num}</span>
                <div>
                  <p className="text-[13px] font-extrabold text-white leading-none">{r.horizon}</p>
                  <p className="text-[8px] font-bold text-white/60 mt-0.5 uppercase tracking-wider">{r.period}</p>
                </div>
              </div>
              <div className="px-4 py-2.5" style={{ background:r.bg }}>
                <div className="space-y-1 mb-2.5">
                  {r.items.map(item=>(
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background:r.color }}/>
                      <p className="text-[9.5px] text-[#334155] leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg px-2.5 py-1.5 flex items-center gap-2"
                  style={{ background:r.color+'12', border:`1px solid ${r.color}25` }}>
                  <CheckCircle2 size={11} style={{ color:r.color }}/>
                  <p className="text-[9px] font-bold" style={{ color:r.color }}>{r.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── TAB 4: Decade of Value ─────────────────────────────────────────────── */
function TabDecade() {
  return (
    <div className="space-y-3">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background:'linear-gradient(118deg,#0B1426 0%,#0B2545 50%,#0f1a30 100%)' }}>
        <div className="absolute inset-0 opacity-[.04] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute right-0 top-0 w-96 h-96 pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(251,191,36,.12),transparent 65%)', transform:'translate(30%,-40%)' }}/>
        <div className="relative flex items-center gap-5 px-5 py-3.5">
          <div className="flex-1">
            <p className="text-[8.5px] font-bold tracking-[.2em] uppercase text-amber-300/80 mb-1">Ten Years. One Team.</p>
            <h2 className="text-[18px] font-extrabold text-white leading-tight mb-0.5">A Decade of Measurable Value</h2>
            <p className="text-[10px] text-slate-400 font-medium italic">
              What WNS built inside Telkom took ten years — and it is still building.
            </p>
          </div>
          <div className="w-px h-12 bg-white/10 shrink-0"/>
          <div className="flex gap-2.5 shrink-0">
            {[
              { val:'30,000', sub:'Active projects managed', c:'#FCD34D', bg:'rgba(251,191,36,.12)', bdr:'rgba(251,191,36,.25)' },
              { val:'1.2M',   sub:'Asset lines in register', c:'#A5B4FC', bg:'rgba(99,102,241,.14)', bdr:'rgba(99,102,241,.28)' },
              { val:'ZERO',   sub:'Audit issues — ever',    c:'#6EE7B7', bg:'rgba(52,211,153,.12)', bdr:'rgba(52,211,153,.26)' },
            ].map(s=>(
              <div key={s.val} className="rounded-xl px-3.5 py-2.5 text-center" style={{ background:s.bg, border:`1.5px solid ${s.bdr}` }}>
                <div className="text-[18px] font-black leading-none whitespace-nowrap" style={{ color:s.c }}>{s.val}</div>
                <div className="text-[7.5px] font-semibold text-white/50 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] gap-3">
        {/* KPI grid */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B2545]">Measurable Value Delivered</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {DECADE_STATS.map(s => (
              <div key={s.val}
                className="rounded-xl p-3 border transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background:s.bg, borderColor:s.border }}>
                <div className="text-[18px] font-black leading-none mb-1" style={{ color:s.color }}>{s.val}</div>
                <p className="text-[8px] text-[#64748B] leading-snug font-medium">{s.lbl}</p>
              </div>
            ))}
          </div>
          {/* Quote */}
          <div className="mt-2 rounded-xl px-4 py-2.5 text-center"
            style={{ background:'linear-gradient(90deg,#0B2545,#163b6e)', border:'1px solid rgba(56,189,248,.15)' }}>
            <p className="text-[10px] italic text-white/80 leading-relaxed">
              "This is a ten-year track record. It is testimony of the commitment from the people of WNS."
            </p>
          </div>
        </div>

        {/* Journey timeline */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B2545]">The Journey</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
          </div>
          <div className="relative space-y-1.5 pl-2">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#E2E8F0] to-transparent"/>
            {JOURNEY.map(j => (
              <div key={j.year} className="flex items-start gap-3 relative">
                <div className="w-3 h-3 rounded-full border-2 border-white z-10 mt-1.5 shrink-0 shadow-sm"
                  style={{ background:j.color, boxShadow:`0 0 0 2px ${j.color}30` }}/>
                <div className="flex-1 rounded-xl px-3 py-2 border transition-all hover:-translate-x-0.5"
                  style={{ background:j.color+'07', borderColor:j.color+'25', borderLeft:`3px solid ${j.color}` }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-black" style={{ color:j.color }}>{j.year}</span>
                    <span className="text-[9.5px] font-bold text-[#0F172A]">{j.title}</span>
                  </div>
                  <p className="text-[8.5px] text-[#64748B] leading-snug">{j.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy section */}
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B2545]">The Human-Centred Automation Model</span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
        </div>
        <div className="rounded-xl border border-[#E8ECF5] bg-[#0B2545] overflow-hidden px-3 py-2.5 mb-2"
          style={{ background:'linear-gradient(110deg,#0B2545,#1a1040)' }}>
          <p className="text-[11px] font-bold text-white/80 italic text-center">
            Automation should amplify human capacity —
            <span className="text-amber-300 not-italic font-extrabold"> never eliminate human dignity.</span>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {PHILOSOPHY.map(p => {
            const Icon = p.icon
            return (
              <div key={p.title} className="rounded-2xl overflow-hidden border-2"
                style={{ borderColor:p.color+'30' }}>
                <div className="px-4 py-3 flex items-center gap-2.5"
                  style={{ background:`linear-gradient(135deg,${p.color},${p.color}cc)` }}>
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{ background:'rgba(255,255,255,.15)' }}>
                    <Icon size={15} className="text-white"/>
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-white leading-none">{p.title}</p>
                    <p className="text-[8px] text-white/65 mt-0.5">{p.sub}</p>
                  </div>
                </div>
                <div className="p-3 space-y-1.5" style={{ background:p.bg }}>
                  {p.items.map(item=>(
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background:p.color }}/>
                      <p className="text-[9px] text-[#334155] leading-snug">{item}</p>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-white/60">
                    <p className="text-[9px] font-bold italic" style={{ color:p.color }}>{p.outcome}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════ */

const TABS = [
  { id:'automation', label:'Automation Pipeline', icon:Bot,        comp:TabAutomation },
  { id:'roadmap',    label:'Future Roadmap',       icon:Rocket,     comp:TabRoadmap },
  { id:'ai',         label:'AI in Finance',        icon:Brain,      comp:TabAI },
  { id:'decade',     label:'Decade of Value',      icon:Trophy,     comp:TabDecade },
]

export default function SlideAM() {
  const [tab, setTab] = useState('automation')
  const active = TABS.find(t => t.id === tab)!
  const Comp = active.comp

  return (
    <div className="am-root space-y-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .am-root { font-family:'Sora',system-ui,sans-serif; }
        .am-tab-btn { transition:all .18s ease; }
        .am-tab-btn:hover:not(.am-active) { background:#F1F5F9 !important; }
      `}</style>

      {/* Tab bar */}
      <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 border border-[#E8ECF5]"
        style={{ boxShadow:'0 1px 4px rgba(15,23,42,.05)' }}>
        {TABS.map(t => {
          const Icon = t.icon
          const isActive = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={clsx('am-tab-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[10.5px] font-bold transition-all', isActive ? 'am-active' : 'text-[#64748B]')}
              style={isActive ? { background:'#0B2545', color:'white', boxShadow:'0 2px 8px rgba(11,37,69,.25)' } : {}}>
              <Icon size={13}/>
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Active tab content */}
      <Comp/>
    </div>
  )
}
