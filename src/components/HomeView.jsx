import { motion } from 'framer-motion'
import { PILLARS, APP_INTRO } from '../data/content'
import CommandSphere from './CommandSphere'
import PillarBadges from './PillarBadges'
import MaturityLadder from './MaturityLadder'
import StateToggle from './StateToggle'
import { ChevronDown } from 'lucide-react'

export default function HomeView({ mode, setMode, onPillarClick }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Hero command bar — state toggle */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-powder-700">
          State Lens · Walk the Journey
        </div>
        <StateToggle mode={mode} setMode={setMode} />
      </div>

      {/* THE STAGE — sphere with anchored pillar badges */}
      <div
        className="relative w-full mx-auto"
        style={{
          maxWidth: '1180px',
          height: 'min(60vh, 540px)',
          minHeight: '420px',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* The sphere is sized as a square at 65% of container height */}
          <div className="relative" style={{ height: '65%', aspectRatio: '1' }}>
            <CommandSphere mode={mode} size="large" />
          </div>
        </div>

        {/* Pillar badges anchored around the sphere */}
        <PillarBadges
          pillars={PILLARS}
          mode={mode}
          onPillarClick={onPillarClick}
        />
      </div>

      {/* Intro caption */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-[13px] text-powder-700 max-w-2xl mx-auto mt-4 mb-2"
      >
        {APP_INTRO[mode]}
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex justify-center mb-3"
      >
        <ChevronDown size={18} className="text-powder-500" />
      </motion.div>

      {/* MATURITY LADDER — the strategic frame */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <MaturityLadder mode={mode} />
      </motion.div>
    </motion.div>
  )
}
