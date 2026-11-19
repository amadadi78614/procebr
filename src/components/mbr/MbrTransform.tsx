'use client'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Cell } from 'recharts'
import { CheckCircle2, CircleDot, Archive, AlertTriangle } from 'lucide-react'
import { MbrHero, HeroStat, Panel, Delta } from './shared'
import { ProgressBar } from '@/components/ui'
import { AUTOMATIONS, IN_PRODUCTION, NEW_INITIATIVES, AUCTIONS, VAT_PROJECT, CALL_OUTS, OCR_UPDATE, MBR_PERIOD } from '@/data/mbr'

const auctionTotal = AUCTIONS.reduce((a, b) => a + b.rm, 0)
const vatDrop = Math.round((1 - VAT_PROJECT[1].vendors / VAT_PROJECT[0].vendors) * 100)

export default function MbrTransform() {
  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow={`Transformation & value · ${MBR_PERIOD.long}`}
        title="All four purchasing automations are running smoothly"
        sub="Covers automation coverage, production and new initiatives, auction value, the VAT clean-up and the OCR e-Invoicing go-live."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val={`R${auctionTotal.toFixed(1)}M`} lbl="Auction value FY27 YTD" tone="green" />
            <HeroStat val="49" lbl="Auctions run" tone="sky" />
            <HeroStat val="LIVE" lbl="OCR · 22 Aug 2026" tone="amber" />
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {AUTOMATIONS.map(a => (
          <div key={a.name} className="relative rounded-xl border border-[#E2E8F0] bg-white p-3 pl-4 shadow-sm overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: a.color }} />
            <div className="text-[9px] font-black tracking-[1.3px] uppercase" style={{ color: a.color }}>{a.name} automation</div>
            <div className="text-[28px] font-black leading-none mt-1" style={{ color: a.color }}>{a.stat}</div>
            <div className="text-[10px] text-[#64748B] mt-1 mb-2.5">{a.note}</div>
            <ProgressBar pct={a.pct} color={a.color} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Panel title="In production" tag="Delivered" accent="#059669">
          <div className="space-y-1.5">
            {IN_PRODUCTION.map(p => (
              <div key={p.name} className="flex items-center gap-2.5 rounded-xl px-3 py-2 bg-[#F8FAFC] border border-[#F1F5F9]">
                {p.tone === 'muted'
                  ? <Archive size={14} className="text-[#94A3B8] shrink-0" />
                  : <CheckCircle2 size={14} className="text-[#059669] shrink-0" />}
                <span className="text-[11px] font-semibold text-[#0F172A] flex-1">{p.name}</span>
                <span className="text-[10px] text-[#475569] text-right">{p.status}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="New initiatives" tag="Work in progress" accent="#B45309">
          <div className="space-y-1.5">
            {NEW_INITIATIVES.map(p => (
              <div key={p.name} className="flex items-center gap-2.5 rounded-xl px-3 py-2 bg-[#FFFBEB] border border-[#FEF3C7]">
                <CircleDot size={14} className="text-[#B45309] shrink-0" />
                <span className="text-[11px] font-semibold text-[#0F172A] flex-1">{p.name}</span>
                <span className="text-[10px] text-[#92400E] text-right">{p.status}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-2 leading-snug">
            The Virtual Pay Solution is the Telkom Purchasing Card (ABSA VCN) process. AS-IS and TO-BE are documented and the solution build is in progress.
          </p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="Value realisation" tag="FY27 YTD · R million" accent="#059669">
          <div className="text-[11px] text-[#475569] mb-1"><b className="text-[#0F172A]">41 reverse</b> and <b className="text-[#0F172A]">8 forward</b> auctions</div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AUCTIONS} layout="vertical" margin={{ top: 4, right: 40, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10, fill: '#334155' }} axisLine={false} tickLine={false} />
                <Bar dataKey="rm" radius={[0, 6, 6, 0]} barSize={26}>
                  {AUCTIONS.map(a => <Cell key={a.name} fill={a.color} />)}
                  <LabelList dataKey="rm" position="right" formatter={(v: number) => `R${v}M`} style={{ fontSize: 11, fontWeight: 800, fill: '#0F172A' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Delta text={`R${auctionTotal.toFixed(1)}M total`} />
        </Panel>

        <Panel title="Vendor VAT number project" tag="SAP MDM update" accent="#1670C0">
          <div className="flex items-end justify-around h-[120px] pt-2">
            {VAT_PROJECT.map((v, i) => (
              <div key={v.d} className="flex flex-col items-center gap-1 w-20">
                <span className="text-[13px] font-black text-[#0F172A]">{v.vendors}</span>
                <div className="w-12 rounded-t-lg" style={{ height: `${(v.vendors / 44) * 80}px`, background: i === 0 ? '#1670C0' : '#22C55E' }} />
                <span className="text-[10px] text-[#64748B]">{v.d}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Delta text={`↓${vatDrop}% outstanding`} />
            <span className="text-[10px] text-[#475569]">vendors still to update</span>
          </div>
        </Panel>

        <Panel title="OCR e-Invoicing" tag={`Go-live ${OCR_UPDATE.goLive}`} accent="#B45309">
          <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Vendor onboarding</div>
          <ul className="space-y-1 mb-2">
            {OCR_UPDATE.onboarding.map(o => (
              <li key={o} className="flex gap-1.5 text-[10.5px] text-[#334155]">
                <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#B45309] shrink-0" />{o}
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-2 rounded-lg px-2.5 py-1.5 bg-[#FEF2F2] border border-[#FECACA]">
            <AlertTriangle size={13} className="text-[#B91C1C] mt-0.5 shrink-0" />
            <span className="text-[10.5px] text-[#7F1D1D]"><b>Challenge:</b> {OCR_UPDATE.challenge}</span>
          </div>
        </Panel>
      </div>

      <Panel title="Call-outs" accent="#0B2545">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {CALL_OUTS.map(c => (
            <div key={c} className="flex items-start gap-2 rounded-xl px-3 py-2 bg-[#F8FAFC] border border-[#F1F5F9]">
              <CheckCircle2 size={14} className="text-[#1670C0] mt-0.5 shrink-0" />
              <span className="text-[11px] text-[#0F172A] font-medium">{c}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
