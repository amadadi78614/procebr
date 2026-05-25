import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { PILLARS } from './data/content'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import CommandSphere from './components/CommandSphere'
import OrbitalPillars from './components/OrbitalPillars'
import PillarDetail from './components/PillarDetail'
import StateToggle from './components/StateToggle'
import ExecutiveNarrative from './components/ExecutiveNarrative'

export default function App() {
  const [mode, setMode] = useState('current') // 'current' | 'future'
  const [selectedId, setSelectedId] = useState(null)

  const selectedPillar = PILLARS.find((p) => p.id === selectedId)
  const futureMode = mode === 'future'

  return (
    <div className="relative min-h-screen w-full text-white font-body overflow-x-hidden">
      <AmbientBackground futureMode={futureMode} />

      <Header />

      <main className="relative z-10 px-6 lg:px-10 pb-8">
        {/* Hero command bar — Mode toggle is the most prominent control */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
            State Lens · Walk the Journey
          </div>
          <StateToggle mode={mode} setMode={setMode} />
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30 mt-1">
            {selectedPillar
              ? `Viewing ${selectedPillar.title} · ${
                  futureMode ? 'FY27+ Vision' : 'FY26 Performance'
                }`
              : futureMode
              ? 'FY27+ · The Autonomous Procurement Ecosystem'
              : 'FY26 · Governance Automation Active'}
          </div>
        </div>

        {/* COMMAND STAGE — sphere + pillars */}
        <LayoutGroup>
          <motion.div
            layout
            className="relative w-full mx-auto"
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            style={{
              // Constrained stage — keeps geometry consistent across resolutions
              maxWidth: '1400px',
              height: selectedPillar ? '420px' : 'min(68vh, 600px)',
            }}
          >
            {/* The orbital stage occupies the full container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                layout
                className="relative w-full h-full flex items-center justify-center"
                animate={{
                  scale: selectedPillar ? 0.72 : 1,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 26 }}
              >
                {/* Concentric guide rings — purely decorative */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ overflow: 'visible' }}
                  viewBox="-50 -50 100 100"
                  preserveAspectRatio="none"
                >
                  {[18, 28, 38].map((r, i) => (
                    <ellipse
                      key={r}
                      cx="0"
                      cy="0"
                      rx={r}
                      ry={r * 0.95}
                      fill="none"
                      stroke={
                        futureMode
                          ? `rgba(255,79,163,${0.10 - i * 0.025})`
                          : `rgba(34,225,255,${0.10 - i * 0.025})`
                      }
                      strokeWidth="0.15"
                      strokeDasharray="0.3 0.6"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>

                {/* Center — the sphere */}
                <CommandSphere
                  mode={mode}
                  selectedAccent={selectedPillar?.accent}
                  scale={selectedPillar ? 0.85 : 1}
                />

                {/* Orbital pillars — positioned around the sphere */}
                <OrbitalPillars
                  pillars={PILLARS}
                  selectedId={selectedId}
                  mode={mode}
                  onSelect={setSelectedId}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Pillar detail panel — appears below the stage when something is selected */}
          <AnimatePresence>
            {selectedPillar && (
              <motion.div
                key={selectedPillar.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <PillarDetail
                  pillar={selectedPillar}
                  mode={mode}
                  onClose={() => setSelectedId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Default helper — only shown when nothing is selected */}
          {!selectedPillar && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 flex justify-center"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35 text-center max-w-2xl">
                ◀ Select any pillar to explore · Toggle state to compare FY26 reality against the FY27+ agentic vision ▶
              </div>
            </motion.div>
          )}
        </LayoutGroup>

        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
            PROCUREMENT INTELLIGENCE COMMAND CENTER · v2.0 · FY26 EBR
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
            Telkom SA × WNS · Confidential · Executive Use Only
          </div>
        </div>
      </main>

      <ExecutiveNarrative selectedId={selectedId} mode={mode} />
    </div>
  )
}
