'use client'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react'
import { MbrHero, HeroStat, Panel } from '@/components/mbr/shared'
import { OPS_KPIS, OPS_CALLOUTS, OpsKpi } from '@/data/ebrNov'

function KpiCompare({ k }: { k: OpsKpi }) {
  const data = [
    { p: 'FY26', v: k.fy26 },
    { p: 'FY27 H1', v: k.fy27 },
  ]
  const fmt = (v: number) => (k.unit === '%' ? `${v}%` : `${v.toFixed(1)}h`)
  const Arrow = k.better === 'up' ? ArrowUpRight : ArrowDownRight
  return (
    <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
      <div className="h-1" style={{ background: k.color }} />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="text-[10px] font-black tracking-[1.3px] uppercase" style={{ color: k.color }}>{k.title}</div>
        <div className="flex items-end gap-2">
          <span className="text-[34px] font-black leading-none text-[#0B2545]">{k.headline}</span>
          <span className="mb-1 inline-flex items-center gap-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 text-[10px] font-bold">
            <Arrow size={12} /> improved
          </span>
        </div>
        <div className="text-[11px] text-[#64748B]">{k.sub}</div>
        <div className="h-[130px] mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 18, right: 8, left: 8, bottom: 0 }}>
              <XAxis dataKey="p" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, (max: number) => max * 1.1]} />
              <Bar dataKey="v" radius={[8, 8, 0, 0]} barSize={56}>
                <Cell fill="#CBD5E1" />
                <Cell fill={k.color} />
                <LabelList dataKey="v" position="top" formatter={fmt} style={{ fontSize: 12, fontWeight: 800, fill: '#0F172A' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-auto space-y-1 pt-1">
          {k.bullets.map(b => (
            <li key={b} className="flex gap-1.5 text-[11px] leading-snug text-[#334155]">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: k.color }} />{b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function EbrHighlights() {
  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow="Operations highlights · FY26 vs FY27 H1"
        title="Results driven by collaboration and teamwork"
        sub="Bot adoption is up, and spot buy and PO acknowledgement cycle times are down across the procurement value chain."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val="91%" lbl="PR Create bot" tone="sky" />
            <HeroStat val="89%" lbl="PO Create bot" tone="violet" />
            <HeroStat val="↓46%" lbl="PO ack TAT" tone="green" />
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {OPS_KPIS.map(k => <KpiCompare key={k.title} k={k} />)}
      </div>

      <Panel title="Additional call-outs" accent="#1670C0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {OPS_CALLOUTS.map(c => (
            <div key={c} className="flex items-start gap-2 rounded-xl px-3 py-2 bg-[#F8FAFC] border border-[#F1F5F9]">
              <CheckCircle2 size={15} className="text-[#1670C0] mt-0.5 shrink-0" />
              <span className="text-[12px] text-[#0F172A]">{c}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
