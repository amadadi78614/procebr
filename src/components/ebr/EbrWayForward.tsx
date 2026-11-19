'use client'
import { ArrowRight, Target } from 'lucide-react'
import { MbrHero, HeroStat, Panel } from '@/components/mbr/shared'
import { WAY_FORWARD, ART_OF_POSSIBLE } from '@/data/ebrNov'

export default function EbrWayForward() {
  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow="Way forward · FY27"
        title="Operational excellence now, autonomous operations next"
        sub="Three operational initiatives for the rest of FY27, and the shift to an operating model where people manage strategy and exceptions."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val="3" lbl="Operational initiatives" tone="sky" />
            <HeroStat val="Phase 2" lbl="e-Invoicing: EDI" tone="amber" />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {WAY_FORWARD.map(w => (
          <Panel key={w.t} title={w.t} accent={w.color}>
            <ul className="space-y-1.5">
              {w.items.map(it => (
                <li key={it} className="flex gap-2 rounded-lg px-2.5 py-1.5 text-[11.5px] text-[#334155] leading-snug"
                  style={{ background: w.color + '0D', borderLeft: `3px solid ${w.color}` }}>
                  {it}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>

      <Panel title="Operational shift: what is possible" tag="Today → next" accent="#7C3AED">
        <div className="space-y-2">
          {ART_OF_POSSIBLE.map(a => (
            <div key={a.from} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.6fr] items-stretch gap-2">
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="text-[9.5px] font-black uppercase tracking-wider text-[#94A3B8] mb-0.5">Today</div>
                <div className="text-[12px] font-semibold text-[#334155]">{a.from}</div>
              </div>
              <div className="hidden md:flex items-center"><ArrowRight size={18} className="text-[#7C3AED]" /></div>
              <div className="rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] p-3">
                <div className="text-[9.5px] font-black uppercase tracking-wider text-[#7C3AED] mb-0.5">Next</div>
                <div className="text-[12px] font-semibold text-[#3B0764]">{a.to}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#0B2545] px-4 py-2.5">
          <Target size={16} className="text-[#7DD3FC] shrink-0" />
          <span className="text-[12.5px] font-bold text-white">Objective: people manage strategy and exceptions only.</span>
        </div>
      </Panel>
    </div>
  )
}
