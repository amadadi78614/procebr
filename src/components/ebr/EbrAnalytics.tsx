'use client'
import { CheckCircle2, Loader2, ChevronRight } from 'lucide-react'
import { MbrHero, HeroStat, Panel } from '@/components/mbr/shared'
import { ANALYTICS, MATURITY } from '@/data/ebrNov'

const done = ANALYTICS.filter(a => a.status === 'done')
const wip = ANALYTICS.filter(a => a.status === 'wip')

function Tile({ a }: { a: (typeof ANALYTICS)[number] }) {
  const isDone = a.status === 'done'
  return (
    <div className="rounded-xl border p-3 flex flex-col gap-1.5 h-full"
      style={{ background: isDone ? '#F0FDF4' : '#FFFBEB', borderColor: isDone ? '#BBF7D0' : '#FDE68A' }}>
      <div className="flex items-center gap-1.5">
        {isDone ? <CheckCircle2 size={14} className="text-[#15803D] shrink-0" /> : <Loader2 size={14} className="text-[#B45309] shrink-0" />}
        <span className="text-[12px] font-bold text-[#0B2545] leading-tight">{a.name}</span>
      </div>
      <p className="text-[10.5px] text-[#475569] leading-snug">{a.body}</p>
      <span className="mt-auto text-[10px] font-semibold italic" style={{ color: isDone ? '#15803D' : '#B45309' }}>{a.outcome}</span>
    </div>
  )
}

function Ring({ pct }: { pct: number }) {
  const r = 20, c = 2 * Math.PI * r
  const color = pct >= 100 ? '#16A34A' : pct >= 20 ? '#F59E0B' : '#DC2626'
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-label={`${pct}% complete`}>
      <circle cx="27" cy="27" r={r} fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <circle cx="27" cy="27" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 27 27)" />
      <text x="27" y="31" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">{pct}%</text>
    </svg>
  )
}

export default function EbrAnalytics() {
  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow="Analytics · six months in review"
        title="Strengthening control, visibility and decision support"
        sub="Joint initiatives improving source-to-pay visibility, risk prevention, reporting scale and decision support across Procurement."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val={`${done.length}`} lbl="Completed / expanding" tone="green" />
            <HeroStat val={`${wip.length}`} lbl="In progress" tone="amber" />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="Completed, expanding and continuous improvement" tag={`${done.length} initiatives`} accent="#16A34A" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {done.map(a => <Tile key={a.name} a={a} />)}
          </div>
        </Panel>
        <Panel title="In progress" tag={`${wip.length} initiatives`} accent="#F59E0B">
          <div className="grid grid-cols-1 gap-2">
            {wip.map(a => <Tile key={a.name} a={a} />)}
          </div>
        </Panel>
      </div>

      <Panel title="Data maturity curve: where Procurement is today" tag="Data → Data + AI" accent="#1670C0">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end">
          {MATURITY.map((m, i) => (
            <div key={m.stage} className="flex items-stretch gap-1">
              <div className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 flex flex-col items-center text-center gap-1"
                style={{ minHeight: 150 + i * 14 }}>
                <Ring pct={m.pct} />
                <div className="text-[12px] font-extrabold text-[#0B2545]">{m.stage}</div>
                <div className="text-[10px] font-semibold italic text-[#1670C0]">{m.q}</div>
                <div className="text-[10px] text-[#475569] leading-snug">{m.what}</div>
                <div className="mt-auto text-[9.5px] font-semibold text-[#15803D]">{m.tools}</div>
              </div>
              {i < MATURITY.length - 1 && <ChevronRight size={14} className="hidden sm:block self-center text-[#94A3B8] shrink-0" />}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-2 text-[10px] font-bold uppercase tracking-wider text-center">
          <div className="sm:col-span-3 rounded-lg bg-[#EFF6FF] text-[#1670C0] py-1">Data · achieved</div>
          <div className="sm:col-span-2 rounded-lg bg-[#FEF3C7] text-[#B45309] py-1">Data + artificial intelligence · next frontier</div>
        </div>
        <p className="text-[11px] text-[#475569] mt-2 leading-snug">
          Descriptive, diagnostic and predictive analytics are in place. The focus now moves to prescriptive (20%) and cognitive (5%) capability, with WNS acting as a trusted implementation partner.
        </p>
      </Panel>
    </div>
  )
}
