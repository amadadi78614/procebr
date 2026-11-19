'use client'
import { Ear, FlaskConical, Lightbulb, ArrowRight, ShieldCheck, Server, Bot, CheckCircle2, CircleDot } from 'lucide-react'
import { MbrHero, HeroStat, Panel } from '@/components/mbr/shared'
import { AI_STEPS, AI_LEARNINGS, ENTERPRISE_GAP, POC, AI_ASKS, AI_PATH, USE_CASES, RPA_BOTS, RPA_DELIVERED, RPA_IN_FLIGHT, MICROSOFT_ROUTE } from '@/data/ebrNov'
import { ProgressBar } from '@/components/ui'

const stepIcons = [Ear, FlaskConical, Lightbulb]

export default function EbrAI() {
  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow="AI transformation · WNS Transformation team"
        title="From RPA at scale to an enterprise AI proof of concept"
        sub="WNS (part of Capgemini) Transformation, with WNS Analytics, has moved Telkom Procurement from bots in production to AI tested in a real workflow."
        right={
          <div className="flex flex-wrap gap-2">
            {ENTERPRISE_GAP.map((g, i) => <HeroStat key={g.big} val={g.big} lbl={['Orgs experimenting', 'Individual gains', 'Scaled to enterprise'][i]} tone={i === 2 ? 'red' : 'sky'} />)}
            <span className="basis-full text-[9px] text-[#94A3B8] text-right">Global benchmark: McKinsey, 2026</span>
          </div>
        }
      />

      <Panel title="RPA and automation in production" tag="Foundation for AI" accent="#0EA5E9">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {RPA_BOTS.map(b => (
            <div key={b.name} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider" style={{ color: b.color }}>
                <Bot size={13} /> {b.name}
              </div>
              <div className="text-[26px] font-black leading-none mt-1" style={{ color: b.color }}>{b.stat}</div>
              <div className="text-[10px] text-[#64748B] mt-1 mb-2">{b.note}</div>
              <ProgressBar pct={b.pct} color={b.color} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] mr-1">Delivered</span>
            {RPA_DELIVERED.map(d => (
              <span key={d} className="inline-flex items-center gap-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#14532D] text-[10.5px] px-2.5 py-0.5"><CheckCircle2 size={11} />{d}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] mr-1">In flight</span>
            {RPA_IN_FLIGHT.map(d => (
              <span key={d} className="inline-flex items-center gap-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#78350F] text-[10.5px] px-2.5 py-0.5"><CircleDot size={11} />{d}</span>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {AI_STEPS.map((s, i) => {
          const Icon = stepIcons[i]
          return (
            <div key={s.t} className="rounded-2xl bg-white border border-[#E2E8F0] shadow-sm p-4 flex gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#1670C0]" />
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-[#0B2545]">{i + 1}. {s.t}</div>
                <p className="text-[11px] text-[#475569] leading-snug mt-0.5">{s.b}</p>
              </div>
            </div>
          )
        })}
      </div>

      <Panel title={`Enterprise AI proof of concept: ${POC.name}`} tag="Transformation-led · with Analytics and the Telkom team" accent="#7C3AED">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="space-y-2">
            <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#B91C1C] mb-1">Problem</div>
              <p className="text-[11px] text-[#334155] leading-snug">{POC.problem}</p>
            </div>
            <div className="rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] p-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#1670C0] mb-1">Objective</div>
              <p className="text-[11px] text-[#334155] leading-snug">{POC.objective}</p>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#64748B] mb-1.5">How the capability is built</div>
            <ol className="space-y-1.5">
              {POC.steps.map((s, i) => (
                <li key={s.t} className="flex gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-2">
                  <span className="h-6 w-6 rounded-md bg-[#1670C0] text-white text-[11px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <div className="text-[11px] font-bold text-[#0B2545]">{s.t}</div>
                    <div className="text-[10px] text-[#64748B] leading-snug">{s.b}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#64748B] mb-1.5">Value demonstrated</div>
            <div className="grid grid-cols-1 gap-1.5">
              {POC.value.map(v => (
                <div key={v} className="flex items-start gap-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1.5">
                  <ShieldCheck size={13} className="text-[#15803D] mt-0.5 shrink-0" />
                  <span className="text-[11px] text-[#14532D]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3">
          <div className="text-[10px] font-black uppercase tracking-wider text-[#1670C0] mb-2">Microsoft route: next step</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {MICROSOFT_ROUTE.map((m, i) => (
              <div key={m.t} className="flex items-start gap-2">
                <span className="h-6 w-6 rounded-full bg-[#1670C0] text-white text-[11px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <div className="text-[11.5px] font-bold text-[#0B2545]">{m.t}</div>
                  <div className="text-[10.5px] text-[#475569] leading-snug">{m.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {AI_LEARNINGS.map((l, i) => (
          <Panel key={l.t} title={`${i + 1}. ${l.t}`} accent="#B45309">
            <ul className="space-y-1">
              {l.items.map(it => (
                <li key={it} className="flex gap-1.5 text-[11px] text-[#334155] leading-snug">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#B45309] shrink-0" />{it}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>

      <Panel title="Tangible use cases to unlock" tag="Procurement first" accent="#0D9488">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-[11px] border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#64748B] px-2">Domain</th>
                {USE_CASES.cols.map(c => (
                  <th key={c} className="text-left text-[10px] uppercase tracking-wider text-[#0B2545] bg-[#EFF6FF] rounded-md px-2 py-1.5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USE_CASES.rows.map(r => (
                <tr key={r.domain}>
                  <td className={`px-2 py-1.5 font-bold rounded-md ${r.focus ? 'bg-[#0D9488] text-white' : 'text-[#0B2545]'}`}>{r.domain}</td>
                  {r.cells.map((c, j) => (
                    <td key={j} className={`px-2 py-1.5 rounded-md leading-snug ${r.focus ? 'bg-[#F0FDFA] text-[#134E4A] font-semibold border border-[#99F6E4]' : 'bg-[#F8FAFC] text-[#475569]'}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="What we need to move from learning to value" tag="Executive sponsorship" accent="#1670C0">
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {AI_PATH.map((p, i) => (
            <span key={p} className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1670C0] text-[10.5px] font-bold px-3 py-1">{p}</span>
              {i < AI_PATH.length - 1 && <ArrowRight size={13} className="text-[#94A3B8]" />}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {AI_ASKS.map((a, i) => {
            const Icon = i === 0 ? ShieldCheck : Server
            return (
              <div key={a.t} className="rounded-xl border border-[#E2E8F0] bg-white p-3 flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#0B2545] flex items-center justify-center shrink-0"><Icon size={16} className="text-white" /></div>
                <div>
                  <div className="text-[12px] font-extrabold text-[#0B2545]">Ask {i + 1}: {a.t}</div>
                  <p className="text-[11px] text-[#475569] leading-snug mt-0.5">{a.b}</p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[11px] text-[#334155] mt-2 font-medium">
          Our commitment: tie every investment to a defined use case, measurable outcomes and evidence of value, not technology experimentation for its own sake.
        </p>
      </Panel>
    </div>
  )
}
