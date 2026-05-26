import { motion, AnimatePresence } from 'framer-motion'
import { PILLARS } from '../data/content'
import PillarDetail from './PillarDetail'

export default function DrillView({ pillarId, mode }) {
  const pillar = PILLARS.find((p) => p.id === pillarId)
  if (!pillar) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pillar.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.35 }}
        className="relative rounded-2xl border bg-white/80 backdrop-blur-md px-6 py-5 overflow-y-auto"
        style={{
          borderColor: 'rgba(143,178,194,0.40)',
          boxShadow:
            '0 8px 24px -6px rgba(15,60,80,0.10), 0 2px 4px rgba(15,60,80,0.04), inset 0 1px 0 rgba(255,255,255,0.85)',
          maxHeight: 'calc(min(80vh, 740px))',
        }}
      >
        <PillarDetail pillar={pillar} mode={mode} />
      </motion.div>
    </AnimatePresence>
  )
}
