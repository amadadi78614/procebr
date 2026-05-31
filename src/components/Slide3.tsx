'use client'
import { useState } from 'react'
import {
  AlertTriangle, BarChart3, Brain, CheckCircle2,
  ChevronRight, Clock3, FileText, Lightbulb,
  ShieldCheck, Sparkles, Target, type LucideIcon,
} from 'lucide-react'
import { FY27_PILLARS } from '@/data/ebr'
import clsx from 'clsx'

/* ── DATA ───────────────────────────────────────────────────────────────── */
const PILLAR_META: Record<string, {
  fy: string
  body: string
  metrics: { val: string; lbl: string }[]
  icon: LucideIcon
}> = {
  'Analytics Frontier': {
    fy: 'Q1 FY27',
    body: 'Predictive spend analysis, anomaly detection and category-level insights surfaced automatically across all procurement categories.',
    metrics: [{ val: 'R120M+', lbl: 'Addressable spend visibility' }, { val: '<2hr', lbl: 'Insight refresh cycle' }],
    icon: BarChart3,
  },
  'Intelligent Exception Mgmt': {
    fy: 'Q1 FY27',
    body: 'AI-driven flagging and routing eliminates manual triage. Exceptions auto-escalate with full context — who needs to act, by when, and the business impact.',
    metrics: [{ val: '80%', lbl: 'Auto-resolved exceptions' }, { val: '↓4hr', lbl: 'Mean resolution time' }],
    icon: AlertTriangle,
  },
  'Supplier Health & Risk': {
    fy: 'Q2 FY27',
    body: 'Real-time supplier risk monitoring with predictive alerts before disruptions materialise. Scores built from payment behaviour, SLA adherence and external signals.',
    metrics: [{ val: '450+', lbl: 'Suppliers scored' }, { val: '72hr', lbl: 'Early warning lead time' }],
    icon: ShieldCheck,
  },
  'Predictive Lead Time Learning': {
    fy: 'Q2 FY27',
    body: 'ML models trained on historical PO data to predict lead times with 90% accuracy. Proactively flags at-risk POs before SLA breach.',
    metrics: [{ val: '90%', lbl: 'Prediction accuracy' }, { val: '↓35%', lbl: 'Emergency PO reduction' }],
    icon: Clock3,
  },
  'Auto Budget & Policy': {
    fy: 'Q3 FY27',
    body: 'Pre-PO automated gate checks budget availability and policy compliance before requisition release. Zero manual validation steps.',
    metrics: [{ val: '100%', lbl: 'Pre-PO policy coverage' }, { val: '0', lbl: 'Manual validation steps' }],
    icon: Target,
  },
}

const OCR_POINTS = [
  { title: 'Domain expertise', body: 'WNS procurement and AP specialists embedded into the implementation support model.', color: '#1D4ED8' },
  { title: 'Phased approach', body: 'Implementation approach phased to reduce disruption and support adoption.', color: '#0F766E' },
  { title: 'Training readiness', body: 'Training activity positioned post go-live to support business uptake.', color: '#166534' },
]

/* ── MAIN ───────────────────────────────────────────────────────────────── */
export default function Slide3() {
  const [open, setOpen] = useState<string | null>(null)
  const pillars = FY27_PILLARS

  return (
    <div className="s3 space-y-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        .s3 { font-family:'Sora',system-ui,sans-serif; }
        .s3-heading {
          font-size:11px; font-weight:800; letter-spacing:.08em;
          text-transform:uppercase; color:#0B2545;
        }
        .s3-label {
          font-size:8.5px; font-weight:800; letter-spacing:.18em;
          text-transform:uppercase; color:#94A3B8;
        }
        .card-section {
          background:white; border-radius:20px;
          border:1px solid #E8ECF5;
          box-shadow:0 1px 3px rgba(15,23,42,.05),0 4px 12px rgba(15,23,42,.04);
          overflow:hidden;
        }
        .card-header {
          padding:10px 14px; border-bottom:1px solid #F1F5F9;
          display:flex; align-items:center; gap:8px;
          background:linear-gradient(90deg,#F8FAFC,white);
        }
        .pillar-row {
          display:flex; align-items:flex-start; gap:0;
          border-radius:12px; overflow:hidden;
          border:1px solid #E8ECF5;
          transition:all .18s ease;
          cursor:pointer;
        }
        .pillar-row:hover { border-color:#C7D2FE; box-shadow:0 2px 8px rgba(15,23,42,.07); }
        .pillar-row.open { border-color:transparent; box-shadow:0 4px 16px rgba(15,23,42,.1); }
        .pillar-accent {
          width:4px; flex-shrink:0; align-self:stretch;
        }
        .pillar-body-wrap {
          flex:1; min-width:0; padding:10px 12px;
        }
        .metric-chip {
          display:inline-flex; align-items:center; gap:5px;
          padding:4px 10px; border-radius:8px;
          font-size:9.5px;
        }
        .ocr-point {
          display:flex; align-items:flex-start; gap:10px;
          border-radius:12px; padding:10px 12px;
          border-left:3px solid transparent;
          transition:all .15s ease;
        }
        .ocr-point:hover { transform:translateX(2px); }
        .chevron {
          transition:transform .2s ease; flex-shrink:0;
          margin-top:1px;
        }
        .chevron.open { transform:rotate(90deg); }

        /* stagger */
        .s3-stagger > * { animation:su .38s ease both; }
        .s3-stagger > *:nth-child(1){animation-delay:.04s}
        .s3-stagger > *:nth-child(2){animation-delay:.09s}
        .s3-stagger > *:nth-child(3){animation-delay:.14s}
        .s3-stagger > *:nth-child(4){animation-delay:.19s}
        .s3-stagger > *:nth-child(5){animation-delay:.24s}
        @keyframes su{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

        .expand-body {
          overflow:hidden;
          animation: expandIn .22s ease forwards;
        }
        @keyframes expandIn {
          from{opacity:0;transform:translateY(-4px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>

      {/* ══ HERO BANNER ════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background:'linear-gradient(118deg,#0B2545 0%,#0f3565 55%,#0B2545 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[.04]"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute right-0 top-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(56,189,248,.13),transparent 65%)', transform:'translate(30%,-40%)' }}/>
        <div className="relative flex items-center gap-5 px-5 py-3.5">
          <div className="flex-1">
            <p className="text-[8.5px] font-bold tracking-[.18em] uppercase text-sky-400/80 mb-1">Way Forward</p>
            <h2 className="text-[17px] font-extrabold text-white leading-tight tracking-tight mb-0.5">
              FY27 Strategic Priorities
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">OCR / e-Invoicing status · Intelligent operations vision</p>
          </div>
          <div className="w-px h-12 bg-white/10 shrink-0"/>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="rounded-xl px-4 py-2.5 text-center"
              style={{ background:'rgba(139,92,246,.15)', border:'1.5px solid rgba(139,92,246,.3)' }}>
              <div className="text-[26px] font-black leading-none text-violet-300">5</div>
              <div className="text-[8.5px] font-semibold text-white/55 mt-0.5 whitespace-nowrap">AI Pillars</div>
            </div>
            <div className="rounded-xl px-4 py-2.5 text-center"
              style={{ background:'rgba(251,191,36,.12)', border:'1.5px solid rgba(251,191,36,.25)' }}>
              <div className="text-[26px] font-black leading-none text-amber-300">FY27</div>
              <div className="text-[8.5px] font-semibold text-white/55 mt-0.5 whitespace-nowrap">Go-live target</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN GRID ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-3">

        {/* ── LEFT: OCR / e-Invoicing ─────────────────────────────────── */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <span className="s3-heading">OCR / e-Invoicing</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
            <span className="s3-label">Current Status</span>
          </div>

          <div className="card-section">
            {/* Current position callout */}
            <div className="p-3.5">
              <div className="flex items-start gap-3 rounded-xl px-3.5 py-3 mb-3"
                style={{ background:'#EFF6FF', borderLeft:'3px solid #1D4ED8' }}>
                <FileText size={14} className="text-[#1D4ED8] mt-0.5 shrink-0"/>
                <div>
                  <p className="text-[10.5px] font-bold text-[#0B2545] mb-0.5">Current position</p>
                  <p className="text-[9.5px] text-[#475569] leading-relaxed">
                    OCR / e-Invoicing remains an active end-to-end S2P implementation focus, with WNS providing procurement and AP domain expertise to support solution direction and operational readiness.
                  </p>
                </div>
              </div>

              {/* 3 points */}
              <div className="space-y-1.5 s3-stagger">
                {OCR_POINTS.map(pt => (
                  <div key={pt.title} className="ocr-point"
                    style={{ background: pt.color + '07', borderLeftColor: pt.color }}>
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: pt.color + '15' }}>
                      <CheckCircle2 size={11} style={{ color: pt.color }}/>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#0F172A] mb-0.5">{pt.title}</p>
                      <p className="text-[9px] text-[#64748B] leading-snug">{pt.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Milestone strip */}
          <div className="card-section">
            <div className="card-header">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-[#0B2545]">
                <Target size={12} className="text-white"/>
              </div>
              <p className="text-[10px] font-bold text-[#0B2545] flex-1">Go-Live Milestones</p>
              <span className="text-[7.5px] font-black px-2 py-0.5 rounded-full"
                style={{ background:'#DCFCE7', color:'#15803D', border:'1px solid #86EFAC' }}>
                TARGET JUL 2025
              </span>
            </div>
            <div className="p-3 space-y-1.5">
              {[
                { name:'Blueprint Sign-Off',        date:'8–15 May',  status:'In Progress', sc:'#B45309', sb:'#FEF3C7' },
                { name:'APS Implementation',        date:'18–27 May', status:'Planned',     sc:'#6D28D9', sb:'#F5F3FF' },
                { name:'QA Testing (SAP ZP2)',       date:'29 May–29 Jun', status:'Planned', sc:'#6D28D9', sb:'#F5F3FF' },
                { name:'Solution UAT',              date:'1–14 Jul',  status:'Planned',     sc:'#6D28D9', sb:'#F5F3FF' },
                { name:'GO LIVE',                   date:'22 Jul',    status:'Target',      sc:'#166534', sb:'#F0FDF4' },
              ].map((m, i) => (
                <div key={m.name} className="flex items-center gap-2.5 rounded-xl px-3 py-2"
                  style={{ background: i === 4 ? '#F0FDF4' : '#F8FAFC', border: i === 4 ? '1px solid #86EFAC' : '1px solid #F1F5F9' }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: m.sc }}/>
                  <span className="text-[10px] font-semibold text-[#0F172A] flex-1">{m.name}</span>
                  <span className="text-[8.5px] text-[#94A3B8] font-medium">{m.date}</span>
                  <span className="text-[7.5px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: m.sb, color: m.sc }}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: FY27 Intelligent Operations ──────────────────────── */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <span className="s3-heading">FY27 Intelligent Operations</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
          </div>

          {/* Vision statement */}
          <div className="relative overflow-hidden rounded-xl"
            style={{ background:'linear-gradient(135deg,#0B2545,#163b6e)' }}>
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
              style={{ background:'radial-gradient(circle,rgba(139,92,246,.18),transparent 70%)' }}/>
            <div className="relative flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background:'rgba(139,92,246,.18)', border:'1px solid rgba(139,92,246,.3)' }}>
                <Brain size={16} className="text-violet-300"/>
              </div>
              <p className="text-[11px] font-bold italic text-white leading-snug flex-1">
                People manage strategy and exceptions —
                <span className="text-violet-300"> AI handles repeatable intelligence work.</span>
              </p>
            </div>
          </div>

          {/* Pillars accordion */}
          <div className="card-section">
            <div className="card-header">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-violet-700">
                <Sparkles size={12} className="text-white"/>
              </div>
              <p className="text-[10px] font-bold text-[#0B2545] flex-1">AI Strategic Pillars</p>
              <span className="s3-label">Click to expand</span>
            </div>

            <div className="p-2.5 space-y-1.5 s3-stagger">
              {pillars.map(p => {
                const meta = PILLAR_META[p.title]
                const isOpen = open === p.title
                const Icon = meta?.icon ?? Lightbulb

                return (
                  <div key={p.title}
                    className={clsx('pillar-row', isOpen && 'open')}
                    style={isOpen ? { boxShadow:`0 4px 20px ${p.color}18`, border:`1px solid ${p.color}35` } : {}}
                    onClick={() => setOpen(isOpen ? null : p.title)}
                  >
                    {/* Accent bar */}
                    <div className="pillar-accent" style={{ background: p.color }}/>

                    <div className="pillar-body-wrap">
                      {/* Header row */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: p.color + '14' }}>
                          <Icon size={13} style={{ color: p.color }}/>
                        </div>
                        <span className="text-[10.5px] font-bold flex-1 leading-tight"
                          style={{ color: p.color }}>{p.title}</span>
                        {meta && (
                          <span className="text-[7.5px] font-black px-2 py-0.5 rounded-full shrink-0"
                            style={{ background: p.color + '14', color: p.color }}>
                            {meta.fy}
                          </span>
                        )}
                        <ChevronRight size={13}
                          className={clsx('chevron text-[#CBD5E1]', isOpen && 'open')}/>
                      </div>

                      {/* Preview / expanded body */}
                      {!isOpen && (
                        <p className="text-[8.5px] text-[#94A3B8] mt-1 leading-snug line-clamp-1">{p.body}</p>
                      )}

                      {isOpen && meta && (
                        <div className="expand-body mt-2 pt-2 border-t border-[#F1F5F9]">
                          <p className="text-[9.5px] text-[#475569] leading-relaxed mb-2.5">{meta.body}</p>
                          <div className="flex gap-2 flex-wrap">
                            {meta.metrics.map(m => (
                              <div key={m.lbl} className="metric-chip"
                                style={{ background: p.color + '0e', border:`1px solid ${p.color}28` }}>
                                <span className="text-[13px] font-black leading-none" style={{ color: p.color }}>{m.val}</span>
                                <span className="text-[#64748B] text-[8.5px]">{m.lbl}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
