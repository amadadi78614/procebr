'use client'
import { ReactNode } from 'react'
import {
  ComposedChart, Bar, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

export function MbrHero({ eyebrow, title, sub, right }: { eyebrow: string; title: string; sub: string; right?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1670C0]" />
      <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(14,165,233,.10), transparent 60%)' }} />
      <div className="relative flex flex-col md:flex-row md:items-center gap-3 pl-6 pr-5 py-3.5">
        <div className="flex-1 min-w-0">
          <p className="text-[9.5px] font-bold tracking-[.16em] uppercase text-[#1670C0] mb-1">{eyebrow}</p>
          <h2 className="text-[19px] md:text-[22px] font-extrabold text-[#0B2545] leading-tight tracking-tight">{title}</h2>
          <p className="text-[11.5px] text-[#64748B] font-medium mt-0.5">{sub}</p>
        </div>
        {right}
      </div>
    </div>
  )
}

export function HeroStat({ val, lbl, tone = 'sky' }: { val: string; lbl: string; tone?: 'sky' | 'green' | 'amber' | 'violet' | 'red' }) {
  const t = {
    sky: ['#EFF6FF', '#BFDBFE', '#1670C0'],
    green: ['#ECFDF5', '#A7F3D0', '#047857'],
    amber: ['#FFFBEB', '#FDE68A', '#B45309'],
    violet: ['#F5F3FF', '#DDD6FE', '#6D28D9'],
    red: ['#FEF2F2', '#FECACA', '#B91C1C'],
  }[tone]
  return (
    <div className="rounded-xl px-3.5 py-2 text-center" style={{ background: t[0], border: `1.5px solid ${t[1]}` }}>
      <div className="text-[22px] font-black leading-none" style={{ color: t[2] }}>{val}</div>
      <div className="text-[8.5px] font-semibold text-[#64748B] mt-1 whitespace-nowrap">{lbl}</div>
    </div>
  )
}

export function Panel({ title, tag, children, className = '', accent = '#0B2545' }: {
  title: string; tag?: string; children: ReactNode; className?: string; accent?: string
}) {
  return (
    <section className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden ${className}`}>
      <div className="px-3.5 py-2 border-b border-[#F1F5F9] flex items-center gap-2" style={{ background: 'linear-gradient(90deg,#F8FAFC,white)' }}>
        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: accent }} />
        <h3 className="text-[11px] font-extrabold tracking-wide uppercase text-[#0B2545] flex-1 truncate">{title}</h3>
        {tag && <span className="text-[8.5px] font-bold tracking-wider uppercase text-[#94A3B8] whitespace-nowrap">{tag}</span>}
      </div>
      <div className="p-3">{children}</div>
    </section>
  )
}

export function Stat({ big, label, color, sub }: { big: string; label: string; color: string; sub?: string }) {
  return (
    <div className="relative rounded-xl border border-[#E2E8F0] bg-white p-3 pl-4 shadow-sm overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: color }} />
      <div className="text-[24px] font-black leading-none" style={{ color }}>{big}</div>
      <div className="text-[10.5px] font-semibold text-[#0F172A] mt-1 leading-tight">{label}</div>
      {sub && <div className="text-[9.5px] text-[#64748B] mt-0.5 leading-tight">{sub}</div>}
    </div>
  )
}

const Tip = ({ active, payload, label, units }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-lg text-[11px]">
      <p className="font-semibold mb-1 text-[#0F172A]">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color || p.fill }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString('en-ZA') : p.value}{units?.[p.dataKey] ?? ''}
        </p>
      ))}
    </div>
  )
}

/** Bars = volume (right axis), lines = TAT (left axis). Last bar (current month) highlighted. */
export function ComboChart({ data, bar, lines, height = 170, units }: {
  data: any[]
  bar: { key: string; name: string; color: string }
  lines: { key: string; name: string; color: string }[]
  height?: number
  units?: Record<string, string>
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="p" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="l" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="r" orientation="right" hide />
          <Tooltip content={<Tip units={units} />} cursor={{ fill: '#F8FAFC' }} />
          <Legend iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 2 }} />
          <Bar yAxisId="r" dataKey={bar.key} name={bar.name} fill={bar.color} radius={[4, 4, 0, 0]} barSize={18} opacity={0.35} />
          {lines.map(l => (
            <Line key={l.key} yAxisId="l" type="monotone" dataKey={l.key} name={l.name} stroke={l.color}
              strokeWidth={2.4} dot={{ r: 2.5, fill: l.color }} activeDot={{ r: 4 }} />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MultiLine({ data, lines, height = 170, unit = '' }: {
  data: any[]; lines: { key: string; color: string }[]; height?: number; unit?: string
}) {
  const units = Object.fromEntries(lines.map(l => [l.key, unit]))
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="p" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip units={units} />} />
          <Legend iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 2 }} />
          {lines.map(l => (
            <Line key={l.key} type="monotone" dataKey={l.key} name={l.key} stroke={l.color}
              strokeWidth={2.2} dot={{ r: 2.5, fill: l.color }} activeDot={{ r: 4 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function Delta({ text, good = true }: { text: string; good?: boolean }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold"
      style={{ background: good ? '#DCFCE7' : '#FEE2E2', color: good ? '#15803D' : '#B91C1C' }}>
      {text}
    </span>
  )
}
