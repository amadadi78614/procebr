'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ChevronLeft, ChevronRight, BarChart2, Zap, Route } from 'lucide-react'
import clsx from 'clsx'

const Slide2 = dynamic(() => import('@/components/Slide2'), { ssr: false })
const Slide3 = dynamic(() => import('@/components/Slide3'), { ssr: false })
const Slide4 = dynamic(() => import('@/components/Slide4'), { ssr: false })

const SLIDES = [
  {
    id: 0, label: 'Highlights',
    tag: 'FY26 HIGHLIGHTS',
    hl: 'Merged domain-led view · Purchasing Excellence · Supplier Enablement · Commercial Value',
    icon: BarChart2,
    component: Slide2,
  },
  {
    id: 1, label: 'Automation',
    tag: 'TRANSFORMATION',
    hl: 'RPA & Automation Journey · Purchasing Automation Value Chain',
    icon: Zap,
    component: Slide4,
  },
  {
    id: 2, label: 'Way Forward',
    tag: 'WAY FORWARD',
    hl: 'FY27 Strategic Priorities · Current OCR / e-Invoicing Status · Intelligent Operations',
    icon: Route,
    component: Slide3,
  },
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
            <p className="text-[10px] text-[#94A3B8]">FY26 · Telkom SA · Confidential</p>
          </div>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden md:flex gap-1">
          {SLIDES.map((s, i) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
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
                <span className="ml-auto text-[10px] opacity-60">{s.tag}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Tag banner ─────────────────────────────────────────────────────── */}
      <div className="bg-[#0B2545] px-4 py-1.5 flex items-center gap-2">
        <span className="text-[9px] font-bold tracking-[1.5px] uppercase text-white/80">{slide.tag}</span>
        <span className="text-white/30 text-xs">·</span>
        <span className="text-[10px] font-semibold text-[#38BDF8] truncate">{slide.hl}</span>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={clsx('rounded-full transition-all duration-200',
                i === current ? 'w-4 h-1.5 bg-[#38BDF8]' : 'w-1.5 h-1.5 bg-[#334155] hover:bg-[#475569]'
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
        <p className="text-[10px] text-[#94A3B8]">WNS × Telkom SA · Procurement EBR · May 2026 · Confidential</p>
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
