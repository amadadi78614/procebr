'use client'
import { Quote } from 'lucide-react'
import { MbrHero, HeroStat, Panel } from './shared'
import { FOCUS, COMPLIMENTS, MBR_PERIOD } from '@/data/mbr'

export default function MbrFocus() {
  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow={`Current key activities · ${MBR_PERIOD.long}`}
        title="Focus for the current month"
        sub="Monthly operational plan across Sourcing Support, PO Management, Master Data and cross-stream work."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val="30→15" lbl="Overdue PO target (days)" tone="amber" />
            <HeroStat val="12 Oct" lbl="Ariba demo to COP" tone="sky" />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {FOCUS.map(f => (
          <Panel key={f.no} title={f.stream} tag={f.no} accent={f.color}>
            <div className="space-y-1.5">
              {f.items.map(it => (
                <div key={it.t + it.b} className="flex items-start gap-2 rounded-lg px-2.5 py-1.5"
                  style={{ background: f.color + '0A', borderLeft: `3px solid ${f.color}` }}>
                  <p className="text-[11px] leading-snug text-[#334155]">
                    <b className="text-[#0F172A]">{it.t}:</b> {it.b}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="What people are saying about our service" tag="People" accent="#E11D48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {COMPLIMENTS.map(c => (
            <figure key={c.from} className="rounded-xl px-3 py-2.5 bg-[#FFF1F2] border border-[#FECDD3]">
              <Quote size={13} className="text-[#E11D48] mb-1" />
              <blockquote className="text-[11px] text-[#334155] leading-snug">{c.quote}</blockquote>
              <figcaption className="text-[10px] font-bold text-[#9F1239] mt-1.5">
                {c.who ? `${c.who} · ` : ''}{c.from}
              </figcaption>
            </figure>
          ))}
        </div>
      </Panel>
    </div>
  )
}
