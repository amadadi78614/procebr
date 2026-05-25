import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { NARRATIVES } from '../data/content'
import { MessageSquare, X, Sparkles } from 'lucide-react'

export default function ExecutiveNarrative({ selectedId, mode }) {
  const [open, setOpen] = useState(true)

  // Resolve narrative copy
  let title, body
  if (!selectedId) {
    title = NARRATIVES.default.title
    body = NARRATIVES.default.body
  } else {
    title = `${selectedId.charAt(0).toUpperCase() + selectedId.slice(1)} — ${
      mode === 'future' ? 'Future Lens' : 'Current Lens'
    }`
    body = NARRATIVES[selectedId]?.[mode] || ''
  }

  const isFuture = mode === 'future'
  const accent = isFuture ? '#FF4FA3' : '#22E1FF'

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full border bg-ink-900/90 backdrop-blur-lg flex items-center justify-center transition-colors"
            style={{
              borderColor: `${accent}66`,
              boxShadow: `0 0 28px -4px ${accent}80`,
            }}
            aria-label="Open executive narrative"
          >
            <Sparkles size={20} style={{ color: accent }} />
            <span
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-hud-mint animate-pulse-soft"
              style={{ boxShadow: '0 0 10px rgba(16,244,166,0.9)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed bottom-6 right-6 z-40 w-[330px] max-w-[calc(100vw-2rem)] rounded-2xl border backdrop-blur-2xl p-4 corner-frame"
            style={{
              borderColor: `${accent}40`,
              background:
                'linear-gradient(135deg, rgba(15,42,72,0.85), rgba(22,62,107,0.75))',
              boxShadow: `0 24px 60px -20px rgba(5,18,40,0.6), 0 0 28px -10px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center"
                  style={{ borderColor: `${accent}55`, background: `${accent}1a` }}
                >
                  <MessageSquare size={14} style={{ color: accent }} />
                </div>
                <div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: `${accent}cc` }}
                  >
                    Executive Narrative
                  </div>
                  <div className="font-display font-semibold text-white text-[13px] leading-tight">
                    {title}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Close narrative panel"
              >
                <X size={16} />
              </button>
            </div>
            <div
              className="h-px mb-3"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={`${selectedId}-${mode}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[12.5px] text-white/75 leading-relaxed"
              >
                {body}
              </motion.p>
            </AnimatePresence>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/30">
                Briefing · v1.0
              </span>
              <span
                className="flex items-center gap-1.5 text-[10px] font-mono"
                style={{ color: '#10F4A6' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-soft"
                  style={{
                    background: '#10F4A6',
                    boxShadow: '0 0 8px rgba(16,244,166,0.9)',
                  }}
                />
                STREAMING
              </span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
