import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PILLARS } from './data/content'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import HomeView from './components/HomeView'
import DrillView from './components/DrillView'

export default function App() {
  const [mode, setMode] = useState('current') // 'current' | 'future'
  const [selectedId, setSelectedId] = useState(null) // null = home view

  const selectedPillar = PILLARS.find((p) => p.id === selectedId)
  const futureMode = mode === 'future'

  const drillDown = (id) => setSelectedId(id)
  const drillUp = () => setSelectedId(null)

  return (
    <div className="relative min-h-screen w-full text-powder-950 font-body overflow-x-hidden">
      <AmbientBackground futureMode={futureMode} />
      <Header />

      <main className="relative z-10 px-6 lg:px-10 pb-10">
        <AnimatePresence mode="wait">
          {selectedPillar ? (
            <DrillView
              key="drill"
              pillar={selectedPillar}
              mode={mode}
              setMode={setMode}
              onBack={drillUp}
            />
          ) : (
            <HomeView
              key="home"
              mode={mode}
              setMode={setMode}
              onPillarClick={drillDown}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-powder-400/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-700">
            Procurement Intelligence · v3.0 · FY26 EBR
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-700">
            Telkom SA × WNS · Confidential · Executive Use Only
          </div>
        </div>
      </main>
    </div>
  )
}
