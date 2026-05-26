import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import TabNav from './components/TabNav'
import OverviewTab from './components/OverviewTab'
import DrillView from './components/DrillView'
import FooterMetrics from './components/FooterMetrics'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [mode, setMode] = useState('current') // 'current' | 'future'

  // 'future' tab forces future mode internally for the view
  const effectiveMode = activeTab === 'future' ? 'future' : mode

  return (
    <div className="relative min-h-screen w-full text-powder-950 font-body overflow-x-hidden flex flex-col">
      <AmbientBackground futureMode={effectiveMode === 'future'} />
      <Header />

      <main className="relative z-10 px-4 pb-3 flex-1 flex flex-col gap-2 min-h-0">
        {/* Tab navigation */}
        <TabNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mode={mode}
          setMode={setMode}
        />

        {/* Tab content */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewTab key="overview" mode={effectiveMode} />
            )}
            {activeTab === 'future' && (
              <OverviewTab key="future" mode="future" />
            )}
            {['operations', 'transformation', 'analytics'].includes(activeTab) && (
              <DrillView key={activeTab} pillarId={activeTab} mode={effectiveMode} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer hero metrics strip */}
        <FooterMetrics mode={effectiveMode} />
      </main>
    </div>
  )
}
