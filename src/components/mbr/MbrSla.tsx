'use client'
import { useState } from 'react'
import { MbrHero, HeroStat } from './shared'
import { SLAS, MBR_PERIOD, SlaRow } from '@/data/mbr'
import clsx from 'clsx'

const measured = SLAS.filter(s => s.num !== undefined)
const met = measured.filter(s => s.wns === '100%')
const missed = measured.filter(s => s.wns !== '100%')
const noActivity = SLAS.filter(s => s.wns === 'No activity')

function pctNum(v?: string) {
  if (!v) return null
  const m = v.match(/^(\d+)%$/)
  return m ? Number(m[1]) : null
}

function Badge({ v, kind }: { v?: string; kind: 'wns' | 'actual' }) {
  if (!v) return <span className="text-[#CBD5E1]">—</span>
  const n = pctNum(v)
  if (n === null) return <span className="text-[10px] text-[#94A3B8] italic">{v}</span>
  const tone = n >= 95 ? ['#DCFCE7', '#15803D'] : n >= 80 ? ['#FEF3C7', '#B45309'] : ['#FEE2E2', '#B91C1C']
  return (
    <span className={clsx('inline-block min-w-[44px] text-center px-2 py-0.5 rounded-full font-bold', kind === 'wns' ? 'text-[10.5px]' : 'text-[10px]')}
      style={{ background: tone[0], color: tone[1] }}>{v}</span>
  )
}

const FILTERS = ['All', 'Exceptions', 'Purchasing', 'Supplier', 'Master Data & Contracts', 'P-Card', 'Sourcing', 'Governance & Reporting'] as const

export default function MbrSla() {
  const [f, setF] = useState<(typeof FILTERS)[number]>('All')
  const rows: SlaRow[] = SLAS.filter(s => {
    if (f === 'All') return true
    if (f === 'Exceptions') { const a = pctNum(s.actual); const w = pctNum(s.wns); return (w !== null && w < 95) || (a !== null && a < 95) }
    return s.group === f
  })

  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow={`Service level agreements · ${MBR_PERIOD.slaMonth}`}
        title={`${met.length} of ${measured.length} measured SLAs at 100%`}
        sub="19 critical SLAs, 0 non-critical. WNS performance includes valid exceptions for Telkom dependencies. Actual process performance excludes them."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val="19" lbl="Critical SLAs" tone="sky" />
            <HeroStat val={`${met.length}/${measured.length}`} lbl="Met (WNS)" tone="green" />
            <HeroStat val={`${missed.length}`} lbl="Missed" tone="red" />
            <HeroStat val={`${noActivity.length}`} lbl="No activity" tone="violet" />
          </div>
        }
      />

      {missed.length > 0 && (
        <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-2.5 text-[11px] text-[#7F1D1D]">
          <b>Exception: SLA {missed.map(m => `${m.no} ${m.name}`).join(', ')}</b> is at {missed[0].wns} against a {missed[0].std} standard. The numerator ({missed[0].num?.toLocaleString('en-ZA')}) is far larger than the denominator ({missed[0].den}). Validate the measure before the review. Actual process performance is also below standard for #6 spot buy PR→quote (85%), #8a prospective onboarding (66%) and #9a transactional onboarding (90%).
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map(x => (
          <button key={x} onClick={() => setF(x)}
            className={clsx('px-3 py-1 rounded-full text-[10.5px] font-semibold border transition-colors',
              f === x ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]')}>
            {x}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-x-auto">
        <table className="w-full text-[11px] min-w-[720px]">
          <thead>
            <tr className="bg-[#0B2545] text-white text-left">
              <th className="px-3 py-2 font-semibold w-10">#</th>
              <th className="px-3 py-2 font-semibold">Service level</th>
              <th className="px-3 py-2 font-semibold">Min. standard</th>
              <th className="px-3 py-2 font-semibold text-right">Num</th>
              <th className="px-3 py-2 font-semibold text-right">Den</th>
              <th className="px-3 py-2 font-semibold text-center">WNS SLA</th>
              <th className="px-3 py-2 font-semibold text-center">Actual process</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => (
              <tr key={s.no} className={clsx('border-t border-[#F1F5F9]', pctNum(s.wns) !== null && pctNum(s.wns)! < 95 ? 'bg-[#FEF2F2]' : i % 2 ? 'bg-[#F8FAFC]' : 'bg-white')}>
                <td className="px-3 py-1.5 font-bold text-[#0B2545]">{s.no}</td>
                <td className="px-3 py-1.5 text-[#0F172A]">{s.name}<div className="text-[9px] text-[#94A3B8]">{s.group}</div></td>
                <td className="px-3 py-1.5 text-[#475569]">{s.std}</td>
                <td className="px-3 py-1.5 text-right tabular-nums text-[#334155]">{s.num?.toLocaleString('en-ZA') ?? '—'}</td>
                <td className="px-3 py-1.5 text-right tabular-nums text-[#334155]">{s.den?.toLocaleString('en-ZA') ?? '—'}</td>
                <td className="px-3 py-1.5 text-center"><Badge v={s.wns} kind="wns" /></td>
                <td className="px-3 py-1.5 text-center"><Badge v={s.actual} kind="actual" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-[#94A3B8]">Source: Procurement MBR deck dated {MBR_PERIOD.deckDate}. The SLA tables in the deck are labelled {MBR_PERIOD.slaMonth}.</p>
    </div>
  )
}
