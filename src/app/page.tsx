'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ChevronLeft, ChevronRight, BarChart2, Zap, Route, Gauge, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'

const EbrHighlights = dynamic(() => import('@/components/ebr/EbrHighlights'), { ssr: false })
const EbrAnalytics = dynamic(() => import('@/components/ebr/EbrAnalytics'), { ssr: false })
const EbrAI = dynamic(() => import('@/components/ebr/EbrAI'), { ssr: false })
const EbrWayForward = dynamic(() => import('@/components/ebr/EbrWayForward'), { ssr: false })
const MbrSla = dynamic(() => import('@/components/mbr/MbrSla'), { ssr: false })

const SLIDES = [
  { id: 1, label: 'Operations', group: 'FY27 H1 EBR', tag: 'OPERATIONS',
    hl: 'FY26 vs FY27 H1 · PR Create · PO Create · Spot buy TAT · PO acknowledgement TAT',
    icon: BarChart2, component: EbrHighlights },
  { id: 2, label: 'Analytics', group: 'FY27 H1 EBR', tag: 'ANALYTICS',
    hl: 'Six months in review · Data maturity curve',
    icon: Gauge, component: EbrAnalytics },
  { id: 3, label: 'AI Transformation', group: 'FY27 H1 EBR', tag: 'AI TRANSFORMATION',
    hl: 'RPA in production · Enterprise AI proof of concept · Microsoft route · Use cases · What we need',
    icon: Zap, component: EbrAI },
  { id: 4, label: 'Way Forward', group: 'FY27 H1 EBR', tag: 'WAY FORWARD',
    hl: 'Operational excellence initiatives · Operational shift',
    icon: Route, component: EbrWayForward },
  { id: 5, label: 'SLAs', group: 'Appendix', tag: 'APPENDIX',
    hl: "Service level agreements · August '26 performance · 19 critical SLAs",
    icon: ShieldCheck, component: MbrSla },
]

export default function Dashboard() {
  const [current, setCurrent] = useState(0)
  const [renderKey, setRenderKey] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (idx: number) => {
    setCurrent(idx)
    setRenderKey(k => k + 1)
    setMenuOpen(false)
  }
  const prev = () => go((current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => go((current + 1) % SLIDES.length)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  const slide = SLIDES[current]
  const ActiveSlide = slide.component

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">

      {/* ── Top header ─────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* WNS wordmark */}
          <span className="font-mono font-bold text-xl tracking-tight text-[#0F172A] select-none">
            W<span className="text-[#F97316]">N</span>S
          </span>
          <div className="w-px h-5 bg-[#E2E8F0]" />
          <div className="hidden sm:block">
            <p className="text-[13px] font-semibold text-[#0B2545] leading-tight">
              Procurement Executive Business Review
            </p>
            <p className="text-[10px] text-[#94A3B8]">FY27 H1 · November 2026 · Telkom SA · Confidential</p>
          </div>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden md:flex gap-1 items-center">
          {SLIDES.map((s, i) => {
            const Icon = s.icon
            const newGroup = i === 0 || SLIDES[i - 1].group !== s.group
            return (
              <span key={s.id} className="flex items-center gap-1">
              {newGroup && (
                <span className={clsx('text-[8.5px] font-bold tracking-[1.2px] uppercase text-[#94A3B8] whitespace-nowrap', i > 0 && 'ml-2 pl-3 border-l border-[#E2E8F0]')}>{s.group}</span>
              )}
              <button
                onClick={() => go(i)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150',
                  i === current
                    ? 'bg-[#0B2545] text-white'
                    : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#334155]'
                )}
              >
                <Icon size={13} />
                {s.label}
              </button>
              </span>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Arrow nav */}
          <div className="hidden sm:flex gap-1">
            <button onClick={prev} aria-label="Previous slide"
              className="w-7 h-7 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button onClick={next} aria-label="Next slide"
              className="w-7 h-7 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="w-px h-5 bg-[#E2E8F0] hidden sm:block" />

          {/* Telkom logo */}
          <span className="text-[14px] font-bold text-[#1670C0] tracking-tight hidden sm:block">Telkom</span>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={clsx('w-5 h-0.5 bg-[#475569] transition-all', menuOpen && 'rotate-45 translate-y-[6px]')} />
            <span className={clsx('w-5 h-0.5 bg-[#475569] transition-all', menuOpen && 'opacity-0')} />
            <span className={clsx('w-5 h-0.5 bg-[#475569] transition-all', menuOpen && '-rotate-45 -translate-y-[6px]')} />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 py-3 flex flex-col gap-1">
          {SLIDES.map((s, i) => {
            const Icon = s.icon
            return (
              <button key={s.id} onClick={() => go(i)}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-left transition-all',
                  i === current ? 'bg-[#0B2545] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
                )}>
                <Icon size={15} />
                {s.label}
                <span className="ml-auto text-[10px] opacity-60">{s.group}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Tag banner ─────────────────────────────────────────────────────── */}
      <div className="bg-[#EFF6FF] border-b border-[#DBEAFE] px-4 py-1.5 flex items-center gap-2">
        <span className="text-[9px] font-bold tracking-[1.5px] uppercase text-[#0B2545] whitespace-nowrap">{slide.tag}</span>
        <span className="text-[#94A3B8] text-xs">·</span>
        <span className="text-[10px] font-semibold text-[#1670C0] truncate">{slide.hl}</span>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={clsx('rounded-full transition-all duration-200',
                i === current ? "w-4 h-1.5 bg-[#1670C0]" : "w-1.5 h-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Slide content ─────────────────────────────────────────────────── */}
      <main className="flex-1 p-3 md:p-4">
        <div key={renderKey}>
          <ActiveSlide />
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#E2E8F0] bg-white px-4 py-2 flex items-center justify-between">
        <p className="text-[10px] text-[#94A3B8]">WNS (part of Capgemini) × Telkom SA · Procurement EBR FY27 H1 · November 2026 · Confidential</p>
        <div className="flex items-center gap-3">
          <p className="text-[10px] text-[#94A3B8]">{current + 1} / {SLIDES.length}</p>
          <div className="flex gap-1 sm:hidden">
            <button onClick={prev} className="w-6 h-6 rounded border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8]"><ChevronLeft size={12} /></button>
            <button onClick={next} className="w-6 h-6 rounded border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8]"><ChevronRight size={12} /></button>
          </div>
        </div>
      </footer>
    </div>
  )
}
