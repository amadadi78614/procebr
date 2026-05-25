import { motion } from 'framer-motion'
import { ChevronLeft, Home } from 'lucide-react'
import CommandSphere from './CommandSphere'
import PillarDetail from './PillarDetail'
import StateToggle from './StateToggle'

export default function DrillView({ pillar, mode, setMode, onBack }) {
  return (
    <motion.div
      key="drill"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      {/* Breadcrumb + Toggle bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white/70 hover:bg-white transition-colors"
            style={{
              borderColor: 'rgba(143,178,194,0.40)',
              boxShadow: '0 1px 3px rgba(15,60,80,0.06)',
            }}
          >
            <ChevronLeft
              size={15}
              className="text-powder-700 group-hover:-translate-x-0.5 transition-transform"
            />
            <Home size={13} className="text-powder-700" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-powder-800 font-semibold">
              Home
            </span>
          </button>
          <span className="text-powder-500 font-mono text-xs">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-powder-900 font-semibold px-3 py-1.5">
            {pillar.title}
          </span>
        </div>

        {/* State toggle stays accessible */}
        <StateToggle mode={mode} setMode={setMode} />
      </div>

      {/* Content area with sphere thumbnail */}
      <div className="flex flex-col lg:flex-row gap-6 mb-4">
        {/* Sphere thumbnail — contextual indicator */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.04 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 22 }}
          className="shrink-0 relative group focus:outline-none"
          style={{ width: '140px', height: '140px' }}
          aria-label="Back to home"
          title="Back to home"
        >
          <CommandSphere mode={mode} size="small" />
          {/* Back overlay on hover */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              className="px-2.5 py-1 rounded-md text-[9.5px] font-mono uppercase tracking-[0.18em] font-semibold"
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#0E2A3D',
                boxShadow: '0 2px 8px rgba(15,60,80,0.18)',
              }}
            >
              ← Back
            </div>
          </div>
        </motion.button>

        {/* Pillar content */}
        <div className="flex-1 min-w-0">
          <PillarDetail pillar={pillar} mode={mode} />
        </div>
      </div>
    </motion.div>
  )
}
