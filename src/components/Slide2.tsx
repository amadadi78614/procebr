'use client'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { BOT_TRAJECTORY, VENDOR_ONBOARDING, SPOT_BUY_TAT, PO_ACK, SUPPLIER_PRIVACY, COLORS } from '@/data/ebr'

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold mb-1 text-[#0F172A]">{label}</p>
      {payload.map((p: any) => {
        const value = p.value
        const suffix = p.name?.toLowerCase().includes('days') ? ' days' : '%'
        return <p key={p.name} style={{ color: p.color }}>{p.name}: {value}{suffix}</p>
      })}
    </div>
  )
}

type HighlightCard = {
  domain: string
  title: string
  metric: string
  sub: string
  color: string
  fill: string
  bullets: string[]
  visual?: React.ReactNode
}

function MiniLine({ data, dataKey, color, target }: { data: any[]; dataKey: string; color: string; target?: number }) {
  return (
    <div className="h-[48px] mt-1.5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <Tooltip content={<TT />} />
          {target !== undefined && <ReferenceLine y={target} stroke="#CBD5E1" strokeDasharray="3 3" />}
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.3} dot={false} name={dataKey} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function MiniBar({ data, dataKey, color }: { data: any[]; dataKey: string; color: string }) {
  return (
    <div className="h-[48px] mt-1.5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <Tooltip content={<TT />} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} name={dataKey} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const highlightCards: HighlightCard[] = [
  {
    domain: 'Purchasing Excellence',
    title: 'PR Create Bot', metric: '88%', sub: '8% → 88% achieved',
    color: COLORS.blue, fill: '#EFF6FF',
    bullets: ['Change management', 'Scope expanded', '2 FTE moved in Openserve'],
    visual: <MiniLine data={BOT_TRAJECTORY} dataKey="pct" color={COLORS.blue} target={80} />,
  },
  {
    domain: 'Purchasing Excellence',
    title: 'PR → PO Release TAT', metric: '↓29%', sub: '25.3 mins → 17.9 mins',
    color: COLORS.teal, fill: '#F0FDFA',
    bullets: ['Release 31 & 37 scope increased', 'TBI & IE195 SAP automation', '2 WNS FTE pass-back benefit'],
  },
  {
    domain: 'Purchasing Excellence',
    title: 'Spot Buy Approval TAT', metric: '↓48%', sub: '4.2 days → 2.2 days',
    color: COLORS.orange, fill: '#FFF7ED',
    bullets: ['Cost centre owner training', 'Proactive engagement', '2-day turnaround improvement'],
    visual: <MiniBar data={SPOT_BUY_TAT} dataKey="days" color={COLORS.orange} />,
  },
  {
    domain: 'Purchasing Excellence',
    title: 'PO Acknowledgements', metric: '↓36%', sub: 'Non-acknowledged POs reduced',
    color: COLORS.amber, fill: '#FEF3C7',
    bullets: ['Bot reminder mails', 'Auto acknowledgement capture', 'Supplier compliance strengthened'],
    visual: <MiniLine data={PO_ACK} dataKey="rate" color={COLORS.amber} />,
  },
  {
    domain: 'Supplier Enablement',
    title: 'Vendor Onboarding', metric: '↓63%', sub: '7.8 days → 2.9 days',
    color: COLORS.green, fill: '#F0FDF4',
    bullets: ['ARS tickets monitored', 'Priority follow-up', '1 FTE saving outcome'],
    visual: <MiniLine data={VENDOR_ONBOARDING} dataKey="days" color={COLORS.green} />,
  },
  {
    domain: 'Supplier Enablement',
    title: 'Vendor NPS', metric: '75→91%', sub: 'VOS satisfaction improvement',
    color: COLORS.sky, fill: '#EFF6FF',
    bullets: ['Supplier experience improved', 'Faster onboarding support', 'Better operational discipline'],
  },
  {
    domain: 'Supplier Enablement',
    title: 'Supplier Profile Privacy', metric: '+38%', sub: 'Current adoption status: 55%',
    color: COLORS.purple, fill: '#FAF5FF',
    bullets: ['Rigorous supplier follow-up', 'Compliance driven', 'Excludes directors/government'],
    visual: <MiniLine data={SUPPLIER_PRIVACY} dataKey="pct" color={COLORS.purple} />,
  },
  {
    domain: 'Commercial Value',
    title: 'Payment Term Rationalisation', metric: 'R42M', sub: 'Free cashflow benefit',
    color: COLORS.gold, fill: '#FFFBEB',
    bullets: ['Focused sessions with sourcing leads', 'Tracking of deviations', '85 contracts converted'],
    visual: (
      <div className="mt-2 rounded-xl border border-[#FDE68A] bg-white/80 px-3 py-2">
        <div className="text-[9px] font-black tracking-[1.3px] uppercase text-[#92400E]">Business Outcome</div>
        <div className="text-[13px] font-black text-[#0F172A]">Improved Free Cashflow</div>
      </div>
    ),
  },
  {
    domain: 'Automation & Transformation',
    title: 'Overall Automation', metric: '80%', sub: 'Coverage · 93% achieved',
    color: COLORS.purple, fill: '#FAF5FF',
    bullets: ['RPA 76', 'SAP 15', 'Manual 9'],
  },
  {
    domain: 'Automation & Transformation',
    title: 'FTE Redeployment', metric: '5 FTE', sub: 'Moved to value roles',
    color: COLORS.green, fill: '#F0FDF4',
    bullets: ['2 Openserve roles', '2 WNS pass-back benefit', '1 onboarding saving'],
  },
  {
    domain: 'Automation & Transformation',
    title: 'Live Automations', metric: '5+', sub: 'Procurement automations live',
    color: COLORS.navy, fill: '#F8FAFC',
    bullets: ['PR Create', 'PO Release', 'PO Ack / SAP Auto-Create'],
  },
]

const domainMeta: Record<string, { summary: string; color: string; fill: string; cols: string }> = {
  'Purchasing Excellence': {
    summary: 'PR Create, PR→PO, Spot Buy and PO Acknowledgements',
    color: COLORS.blue,
    fill: '#EFF6FF',
    cols: 'lg:grid-cols-4',
  },
  'Supplier Enablement': {
    summary: 'Vendor onboarding, VOS NPS and Supplier Privacy adoption',
    color: COLORS.green,
    fill: '#F0FDF4',
    cols: 'lg:grid-cols-3',
  },
  'Commercial Value': {
    summary: 'Payment term rationalisation and cashflow benefit',
    color: COLORS.gold,
    fill: '#FFFBEB',
    cols: 'lg:grid-cols-1',
  },
  'Automation & Transformation': {
    summary: 'Automation coverage, FTE redeployment and live bot portfolio',
    color: COLORS.purple,
    fill: '#FAF5FF',
    cols: 'lg:grid-cols-3',
  },
}

const domainOrder = [
  'Purchasing Excellence',
  'Supplier Enablement',
  'Commercial Value',
  'Automation & Transformation',
]

function CompactCard({ card }: { card: HighlightCard }) {
  return (
    <div
      className="relative rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[118px]"
      style={{ background: card.fill }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: card.color }} />
      <div className="p-2.5 pl-4 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="text-[9px] font-black tracking-[1.3px] uppercase leading-tight" style={{ color: card.color }}>
            {card.title}
          </div>
          <div className="h-1.5 w-1.5 rounded-full shrink-0 mt-1" style={{ background: card.color }} />
        </div>
        <div className="flex items-end gap-2 mt-1">
          <div className="text-[23px] md:text-[26px] font-black leading-none" style={{ color: card.color }}>{card.metric}</div>
          <div className="text-[10px] text-[#64748B] leading-tight pb-0.5">{card.sub}</div>
        </div>
        {card.visual}
        <div className="mt-auto pt-1.5 grid grid-cols-1 gap-1">
          {card.bullets.slice(0, 3).map(b => (
            <div key={b} className="flex items-start gap-1.5 text-[10px] leading-tight text-[#334155]">
              <span className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: card.color }} />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DomainPanel({ domain, children }: { domain: string; children: React.ReactNode }) {
  const meta = domainMeta[domain]
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center md:justify-between gap-1" style={{ background: meta.fill }}>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: meta.color }} />
          <h2 className="text-[18px] md:text-[22px] font-black tracking-tight text-[#0B2545]">{domain}</h2>
        </div>
        <p className="text-[11px] md:text-xs font-semibold text-[#475569]">{meta.summary}</p>
      </div>
      <div className={`p-3 grid grid-cols-1 sm:grid-cols-2 ${meta.cols} gap-2`}>
        {children}
      </div>
    </section>
  )
}

export default function Slide2() {
  return (
    <div className="slide-enter space-y-3">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-2.5 shadow-sm">
        <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#1670C0]">FY26 Highlights</div>
        <div className="text-xl md:text-2xl font-black text-[#0B2545] leading-tight">Domain-led procurement outcomes</div>
        <p className="text-[11px] md:text-xs text-[#64748B] mt-1 max-w-5xl">
          Highlights are sequenced by domain, with compact executive cards and no duplicate PR Create / PR Release storytelling.
        </p>
      </div>

      {domainOrder.map(domain => {
        const cards = highlightCards.filter(c => c.domain === domain)
        return (
          <DomainPanel key={domain} domain={domain}>
            {cards.map(card => <CompactCard key={card.title} card={card} />)}
          </DomainPanel>
        )
      })}
    </div>
  )
}
