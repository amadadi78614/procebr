'use client'
import { useState } from 'react'
import {
  Activity, Bot, CheckCircle2, ChevronRight,
  Cpu, FileText, GitMerge, Package, Rocket,
  ShieldCheck, TrendingUp, Users, Brain,
} from 'lucide-react'
import clsx from 'clsx'

/* ── DATA ───────────────────────────────────────────────────────────────── */
const JOURNEY = [
  { id:'overall',  label:'Overall',          sub:'RPA 76 · SAP 15 · Manual 9',   cov:80,  ach:93,  color:'#0369A1', bg:'#F0F9FF', bar:'#0EA5E9', icon:Cpu,          tag:'OVERALL'   },
  { id:'prcreate', label:'PR Create',         sub:'Bot-driven requisition create', cov:60,  ach:88,  color:'#1E40AF', bg:'#EEF2FF', bar:'#6366F1', icon:FileText,     tag:'RPA'       },
  { id:'prpo',     label:'PR → PO',           sub:'RPA 49 · SAP 44 · Man 7',      cov:80,  ach:93,  color:'#6D28D9', bg:'#F5F3FF', bar:'#8B5CF6', icon:GitMerge,     tag:'PO CREATE' },
  { id:'por31',    label:'PO Release 31',      sub:'Release strategy 31',          cov:78,  ach:98,  color:'#C2410C', bg:'#FFF7ED', bar:'#F97316', icon:ShieldCheck,  tag:'RPA'       },
  { id:'por37',    label:'PO Release 37',      sub:'Release strategy 37',          cov:100, ach:100, color:'#166534', bg:'#F0FDF4', bar:'#22C55E', icon:CheckCircle2, tag:'RPA'       },
  { id:'poack',    label:'PO Ack',             sub:'Auto-acknowledgement capture',  cov:98,  ach:99,  color:'#134E4A', bg:'#F0FDFA', bar:'#14B8A6', icon:Activity,     tag:'RPA'       },
]

const BOTS_LIVE = [
  { name:'PR Create Bot',          detail:'88% coverage · scope analysed & continuously expanded',  color:'#1E40AF' },
  { name:'PO Release Bot',         detail:'Release 31 & 37 added to BOT scope',                    color:'#C2410C' },
  { name:'PO Acknowledgement Bot', detail:'Reminder-mail enhancement · ↓36% non-ack',              color:'#134E4A' },
  { name:'SAP Auto-Create (ROMC)', detail:'BOT ↔ SAP auto-create collaboration fully operational',  color:'#166534' },
]

const FY27_PIPE = [
  { name:'IT PR Upfront Approval',        detail:'Automate the IT requisition approval gate',            fy:'Q1 FY27', color:'#1E40AF' },
  { name:'PO Acknowledgement Automation', detail:'Auto-capture & match Apple acknowledgements',          fy:'Q1 FY27', color:'#134E4A' },
  { name:'Release 31 — Mobile POs',       detail:'Extend R31 automation to mobile PO scope',             fy:'Q2 FY27', color:'#C2410C' },
  { name:'UiPath Enterprise Migration',   detail:'Community → Enterprise edition, governed platform',    fy:'Q2 FY27', color:'#6D28D9' },
  { name:'E-Invoicing / OCR',             detail:'End-to-end S2P implementation, domain-led',            fy:'Q3 FY27', color:'#92400E' },
]

const IMPACT = [
  { big:'5 FTE',   label:'Redeployed to value roles',      color:'#0369A1', bg:'#F0F9FF', border:'#BAE6FD', icon:Users     },
  { big:'75→91%',  label:'Vendor NPS (VOS)',               color:'#166534', bg:'#F0FDF4', border:'#86EFAC', icon:TrendingUp },
  { big:'5+',      label:'Automations live',               color:'#6D28D9', bg:'#F5F3FF', border:'#C4B5FD', icon:Cpu       },
  { big:'↓36%',    label:'Non-ack POs reduced',            color:'#C2410C', bg:'#FFF7ED', border:'#FDBA74', icon:Package   },
]

/* ── PROGRESS BAR ───────────────────────────────────────────────────────── */
function Bar({ pct, color, thin }: { pct: number; color: string; thin?: boolean }) {
  return (
    <div className={clsx('w-full rounded-full overflow-hidden', thin ? 'h-1' : 'h-1.5')}
      style={{ background: color + '1a' }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

/* ── JOURNEY CARD ───────────────────────────────────────────────────────── */
function JCard({ n, active, onClick }: { n: typeof JOURNEY[0]; active: boolean; onClick: () => void }) {
  const Icon = n.icon
  return (
    <button onClick={onClick}
      className={clsx(
        'group relative flex flex-col rounded-2xl p-3 text-left w-full transition-all duration-200',
        active
          ? 'shadow-lg scale-[1.02] z-10'
          : 'bg-white border border-[#E8ECF5] hover:shadow-md hover:-translate-y-0.5 hover:border-[#C7D2FE]'
      )}
      style={active ? {
        background: n.bg,
        border: `2px solid ${n.color}`,
        boxShadow: `0 8px 28px ${n.color}20, 0 2px 8px ${n.color}12`,
      } : {}}
    >
      {/* Top accent line on active */}
      {active && (
        <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${n.color}, ${n.bar})` }} />
      )}

      {/* Tag + icon row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[7.5px] font-black tracking-widest uppercase rounded-md px-1.5 py-0.5"
          style={{ color: n.color, background: n.color + '14' }}>
          {n.tag || 'OVERALL'}
        </span>
        <div className="w-5 h-5 rounded-lg flex items-center justify-center"
          style={{ background: active ? n.color : n.color + '15' }}>
          <Icon size={11} style={{ color: active ? '#fff' : n.color }} />
        </div>
      </div>

      {/* Label */}
      <p className="text-[10.5px] font-extrabold text-[#0F172A] leading-tight mb-2.5">{n.label}</p>

      {/* Stats block */}
      <div className="grid grid-cols-2 gap-1.5 mb-2.5">
        <div className="rounded-xl p-2 text-center" style={{ background: active ? n.color + '14' : '#F8FAFC' }}>
          <div className="text-[20px] font-black leading-none" style={{ color: n.color }}>{n.cov}%</div>
          <div className="text-[7px] font-bold uppercase tracking-wider text-[#94A3B8] mt-0.5">Coverage</div>
        </div>
        <div className="rounded-xl p-2 text-center" style={{ background: active ? '#0F172A0d' : '#F8FAFC' }}>
          <div className="text-[20px] font-black leading-none text-[#0F172A]">{n.ach}%</div>
          <div className="text-[7px] font-bold uppercase tracking-wider text-[#94A3B8] mt-0.5">Achieved</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-1.5">
        <Bar pct={n.cov} color={n.bar} />
        <Bar pct={n.ach} color="#94A3B8" thin />
      </div>

      <p className="text-[7.5px] text-[#94A3B8] mt-2 leading-tight">{n.sub}</p>
    </button>
  )
}

/* ── MAIN ───────────────────────────────────────────────────────────────── */
export default function Slide4() {
  const [sel, setSel] = useState('overall')
  const active = JOURNEY.find(n => n.id === sel) ?? JOURNEY[0]

  return (
    <div className="s4 space-y-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        .s4 { font-family:'Sora',system-ui,sans-serif; }

        .s4-label {
          font-size:9px; font-weight:800; letter-spacing:.18em;
          text-transform:uppercase; color:#94A3B8;
        }
        .s4-heading {
          font-size:11px; font-weight:800; letter-spacing:.08em;
          text-transform:uppercase; color:#0B2545;
        }
        .live-ring {
          display:inline-block; width:7px; height:7px; border-radius:50%;
          background:#22C55E;
          box-shadow:0 0 0 0 #86efac88;
          animation: lp 2s ease-in-out infinite;
        }
        @keyframes lp {
          0%,100%{ box-shadow:0 0 0 0 #86efac88 }
          50%{ box-shadow:0 0 0 5px #86efac00 }
        }
        .flow-arrow {
          color:#CBD5E1; flex-shrink:0; align-self:center; margin-top:-8px;
        }
        .bot-row {
          display:flex; align-items:flex-start; gap:10px;
          border-radius:12px; padding:9px 12px;
          transition:all .15s ease;
        }
        .bot-row:hover { transform:translateX(3px); background:#F1F5F9 !important; }
        .pipe-row {
          display:flex; align-items:center; gap:10px;
          border-radius:10px; padding:7px 10px;
          transition:all .15s ease;
        }
        .pipe-row:hover { transform:translateX(3px); }
        .kpi-tile {
          border-radius:16px; padding:14px 10px;
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; text-align:center;
          transition:transform .2s, box-shadow .2s;
          position:relative; overflow:hidden;
        }
        .kpi-tile::after {
          content:''; position:absolute; bottom:-16px; right:-16px;
          width:64px; height:64px; border-radius:50%;
          background:currentColor; opacity:.06;
        }
        .kpi-tile:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.1); }
        .card-section {
          background:white; border-radius:20px;
          border:1px solid #E8ECF5;
          box-shadow:0 1px 3px rgba(15,23,42,.05), 0 4px 12px rgba(15,23,42,.04);
        }
        .card-header {
          padding:10px 14px; border-bottom:1px solid #F1F5F9;
          display:flex; align-items:center; gap:8px;
          background:linear-gradient(90deg,#F8FAFC,white);
          border-radius:20px 20px 0 0;
        }
        /* stagger in */
        .s4-journey > * { animation: su .4s ease both; }
        .s4-journey > *:nth-child(1){animation-delay:.04s}
        .s4-journey > *:nth-child(2){animation-delay:.08s}
        .s4-journey > *:nth-child(3){animation-delay:.12s}
        .s4-journey > *:nth-child(4){animation-delay:.16s}
        .s4-journey > *:nth-child(5){animation-delay:.20s}
        .s4-journey > *:nth-child(6){animation-delay:.24s}
        .s4-journey > *:nth-child(7){animation-delay:.28s}
        .s4-journey > *:nth-child(8){animation-delay:.32s}
        .s4-journey > *:nth-child(9){animation-delay:.36s}
        .s4-journey > *:nth-child(10){animation-delay:.40s}
        .s4-journey > *:nth-child(11){animation-delay:.44s}
        @keyframes su {
          from{opacity:0;transform:translateY(10px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background:'linear-gradient(118deg,#0B2545 0%,#0f3565 55%,#0B2545 100%)' }}>
        {/* Texture grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[.04]"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        {/* Bloom */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(56,189,248,.14),transparent 65%)', transform:'translate(30%,-40%)' }}/>

        <div className="relative flex items-center gap-5 px-5 py-3.5">
          {/* Title */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="live-ring"/>
              <span className="text-[8.5px] font-bold tracking-[.18em] uppercase text-green-400">All Systems Live</span>
              <span className="w-px h-3 bg-white/20 mx-1"/>
              <span className="text-[8.5px] font-bold tracking-[.12em] uppercase text-sky-400/80">Automation Command Centre</span>
            </div>
            <h2 className="text-[17px] font-extrabold text-white leading-tight tracking-tight mb-0.5">
              Purchasing Automation Value Chain
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">
              RPA &amp; SAP · full PR → PO → Acknowledgement journey
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-white/10 shrink-0"/>

          {/* Hero stats */}
          <div className="flex gap-2.5 shrink-0">
            {[
              { val:'80%', sub:'Automation Coverage', c:'#38BDF8', bg:'rgba(56,189,248,.11)', border:'rgba(56,189,248,.22)' },
              { val:'93%', sub:'Overall Achieved',    c:'#4ADE80', bg:'rgba(74,222,128,.11)', border:'rgba(74,222,128,.22)' },
            ].map(s => (
              <div key={s.val} className="rounded-xl px-4 py-2.5 text-center"
                style={{ background:s.bg, border:`1.5px solid ${s.border}` }}>
                <div className="text-[28px] font-black leading-none" style={{ color:s.c }}>{s.val}</div>
                <div className="text-[8.5px] font-semibold text-white/55 mt-0.5 whitespace-nowrap">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 1: VALUE CHAIN ════════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="s4-heading">Purchasing Automation Value Chain</span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
          <span className="s4-label">Coverage vs Achieved</span>
        </div>

        {/* Cards + connectors */}
        <div className="flex items-stretch s4-journey">
          {JOURNEY.map((n, idx) => (
            <>
              <div key={n.id} className="flex-1 min-w-0">
                <JCard n={n} active={sel === n.id} onClick={() => setSel(n.id)} />
              </div>
              {idx < JOURNEY.length - 1 && (
                <div key={`c-${idx}`} className="flow-arrow flex items-center px-0.5">
                  <ChevronRight size={13} />
                </div>
              )}
            </>
          ))}
        </div>

        {/* Active stage detail strip */}
        <div className="mt-2 flex items-center gap-3 rounded-xl px-4 py-2 transition-all duration-300"
          style={{ background:`${active.color}09`, border:`1px solid ${active.color}25` }}>
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: active.color }}/>
          <span className="text-[11px] font-bold text-[#0F172A]">{active.label}</span>
          <div className="flex items-center gap-2 text-[10px] font-semibold">
            <span style={{ color: active.color }}>{active.cov}%</span>
            <span className="text-[#CBD5E1]">coverage</span>
            <span className="text-[#E2E8F0]">·</span>
            <span className="text-[#0F172A]">{active.ach}%</span>
            <span className="text-[#CBD5E1]">achieved</span>
          </div>
          <div className="ml-auto w-32">
            <Bar pct={active.ach} color={active.bar} />
          </div>
        </div>
      </div>

      {/* ══ SECTION 2: PORTFOLIO + PIPELINE ══════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="s4-heading">Automation Portfolio &amp; FY27 Pipeline</span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent"/>
        </div>

        <div className="grid grid-cols-2 gap-2.5">

          {/* Bots live */}
          <div className="card-section overflow-hidden">
            <div className="card-header">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-[#0B2545]">
                <Bot size={12} className="text-white"/>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-[#0B2545]">Bots in production</p>
                <p className="text-[8px] text-[#94A3B8] font-semibold">Delivering today</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="live-ring"/>
                <span className="text-[8px] font-bold text-green-600">4 LIVE</span>
              </div>
            </div>
            <div className="p-3 space-y-1.5">
              {BOTS_LIVE.map(b => (
                <div key={b.name} className="bot-row" style={{ background: b.color + '07', borderLeft: `3px solid ${b.color}` }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10.5px] font-bold text-[#0F172A] leading-tight">{b.name}</span>
                      <span className="text-[7px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background:'#DCFCE7', color:'#15803D' }}>LIVE</span>
                    </div>
                    <p className="text-[9px] text-[#64748B] leading-snug">{b.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FY27 pipeline */}
          <div className="card-section overflow-hidden">
            <div className="card-header" style={{ background:'linear-gradient(90deg,#FFFBEB,white)', borderBottom:'1px solid #FEF3C7' }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-amber-600">
                <Rocket size={12} className="text-white"/>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-amber-900">New initiatives</p>
                <p className="text-[8px] text-[#94A3B8] font-semibold">FY27 transformation pipeline</p>
              </div>
              <span className="text-[7.5px] font-black px-2 py-0.5 rounded-full"
                style={{ background:'#FEF3C7', color:'#92400E', border:'1px solid #FDE68A' }}>5 ITEMS</span>
            </div>
            <div className="p-3 space-y-1.5">
              {FY27_PIPE.map(b => (
                <div key={b.name} className="pipe-row" style={{ background: b.color + '07', borderLeft:`3px solid ${b.color}` }}>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#0F172A]">{b.name} </span>
                    <span className="text-[9px] text-[#64748B]">— {b.detail}</span>
                  </div>
                  <span className="text-[8px] font-black rounded-lg px-2 py-0.5 shrink-0 whitespace-nowrap"
                    style={{ background: b.color + '15', color: b.color }}>{b.fy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 3: WNS ENABLEMENT + KPIs ════════════════════════════ */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-2.5">

        {/* WNS narrative */}
        <div className="relative overflow-hidden rounded-2xl"
          style={{ background:'linear-gradient(135deg,#0B2545 0%,#163b6e 100%)' }}>
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
            style={{ background:'radial-gradient(circle,rgba(56,189,248,.12),transparent 70%)' }}/>
          <div className="p-4 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background:'rgba(56,189,248,.14)', border:'1px solid rgba(56,189,248,.25)' }}>
                <Brain size={14} className="text-sky-300"/>
              </div>
              <span className="text-[11.5px] font-bold text-white">WNS Enabled Automation</span>
            </div>
            <p className="text-[9.5px] font-bold mb-3 pl-2"
              style={{ color:'#FCD34D', borderLeft:'2px solid #FCD34D' }}>
              Bots scale on our people's process knowledge — not in spite of it
            </p>
            <div className="space-y-2.5">
              {[
                { title:'Deep domain expertise is the engine', body:'Our AP & procurement specialists identify, design and validate every bot — automation scales on their process knowledge.', c:'#38BDF8' },
                { title:'WNS AI Enablement — training live now', body:"WNS is rolling out structured AI awareness & upskilling sessions so staff understand AI's impact on their roles.", c:'#4ADE80' },
              ].map(pt => (
                <div key={pt.title} className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-3 h-3 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: pt.c + '20', border:`1.5px solid ${pt.c}` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: pt.c }}/>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white mb-0.5">{pt.title}</p>
                    <p className="text-[8.5px] leading-snug text-slate-300/80">{pt.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2×2 KPI grid */}
        <div className="grid grid-cols-2 gap-2">
          {IMPACT.map(k => {
            const Icon = k.icon
            return (
              <div key={k.label} className="kpi-tile"
                style={{ background:k.bg, border:`1px solid ${k.border}`, color:k.color }}>
                <Icon size={13} style={{ color:k.color, opacity:.65, marginBottom:4 }}/>
                <div className="text-[22px] font-black leading-none mb-1" style={{ color:k.color }}>{k.big}</div>
                <div className="text-[8.5px] font-semibold text-[#64748B] leading-tight">{k.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
