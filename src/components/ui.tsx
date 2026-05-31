'use client'
import { ReactNode } from 'react'
import clsx from 'clsx'

// ── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, accent, className, style }: {
  children: ReactNode
  accent?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={clsx('bg-white rounded-xl border border-[#E2E8F0] overflow-hidden relative shadow-sm', className)} style={style}>
      {accent && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: accent }} />
      )}
      <div className={clsx('p-3', accent && 'pl-4')}>
        {children}
      </div>
    </div>
  )
}

// ── Pill label ───────────────────────────────────────────────────────────────
export function Pill({ label, color, bg }: { label: string; color: string; bg?: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
      style={{ color, background: bg || color + '1A' }}
    >
      {label}
    </span>
  )
}

// ── Progress bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ pct, color, className }: { pct: number; color: string; className?: string }) {
  return (
    <div className={clsx('relative h-1.5 rounded-full bg-[#E2E8F0] overflow-visible', className)}>
      <div
        className="h-1.5 rounded-full progress-animated relative"
        style={{ width: `${pct}%`, background: color }}
      >
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full border-2 border-white"
          style={{ background: color, boxShadow: `0 0 0 1px ${color}` }}
        />
      </div>
    </div>
  )
}

// ── Before → After display ───────────────────────────────────────────────────
export function BeforeAfter({ from, to, fromLabel, toLabel, color }: {
  from: string; to: string; fromLabel?: string; toLabel?: string; color: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 py-2">
        <span className="text-3xl font-light text-[#CBD5E1]">{from}</span>
        <span className="text-xl text-[#CBD5E1]">→</span>
        <span className="text-5xl font-bold leading-none" style={{ color }}>{to}</span>
      </div>
      {(fromLabel || toLabel) && (
        <div className="flex justify-between text-[9px] font-semibold tracking-wider uppercase text-[#94A3B8]">
          <span>{fromLabel}</span>
          <span style={{ color }}>{toLabel}</span>
        </div>
      )}
    </div>
  )
}

// ── KPI chip ─────────────────────────────────────────────────────────────────
export function KpiChip({ big, label, color, fill }: {
  big: string; label: string; color: string; fill: string
}) {
  return (
    <div
      className="rounded-xl border border-[#E2E8F0] p-3 flex-1 relative overflow-hidden shadow-sm"
      style={{ background: fill }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: color }} />
      <div className="pl-1">
        <div className="text-2xl font-bold leading-none mb-1" style={{ color }}>{big}</div>
        <div className="text-[10px] text-[#94A3B8] leading-tight">{label}</div>
      </div>
    </div>
  )
}

// ── Bullet row ───────────────────────────────────────────────────────────────
export function Bullet({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
      <p className="text-[11px] leading-snug text-[#334155]">
        <span className="font-semibold text-[#0F172A]">{title}</span>
        {' '}{body}
      </p>
    </div>
  )
}

// ── Section highlight box ─────────────────────────────────────────────────────
export function HighlightBox({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div
      className="rounded-lg px-3 py-1.5 text-[11px] font-semibold my-2"
      style={{ background: color + '15', border: `1px solid ${color}40`, color }}
    >
      {children}
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px flex-1 bg-[#E2E8F0]" />
      <span className="text-[9px] font-bold tracking-[1.5px] uppercase text-[#94A3B8]">{children}</span>
      <div className="h-px flex-1 bg-[#E2E8F0]" />
    </div>
  )
}
