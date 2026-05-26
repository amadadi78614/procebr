import { motion } from 'framer-motion'
import { PILLARS, APP_INTRO } from '../data/content'
import RotatingSphereCarousel from './RotatingSphereCarousel'
import MaturityGauge from './MaturityGauge'
import HeroMetricsRow from './HeroMetricsRow'
import StateToggle from './StateToggle'

export default function HomeView({ mode, setMode, onPillarClick }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* State toggle */}
      <div className="flex flex-col items-center gap-2 mb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-powder-700">
          State Lens · Walk the Journey
        </div>
        <StateToggle mode={mode} setMode={setMode} />
      </div>

      {/* TWO-COLUMN HERO: rotating sphere (left) + maturity gauge (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* LEFT — rotating sphere carousel */}
        <div className="lg:col-span-7">
          <div
            className="relative w-full rounded-2xl border backdrop-blur-md overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.35)',
              borderColor: 'rgba(143,178,194,0.30)',
              height: 'min(72vh, 620px)',
              minHeight: '520px',
            }}
          >
            <RotatingSphereCarousel
              pillars={PILLARS}
              mode={mode}
              onPillarClick={onPillarClick}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-[12.5px] text-powder-700 max-w-xl mx-auto mt-3"
          >
            {APP_INTRO[mode]}
          </motion.p>
        </div>

        {/* RIGHT — maturity gauge (vertical thermometer) */}
        <div className="lg:col-span-5">
          <MaturityGauge mode={mode} />
        </div>
      </div>

      {/* Hero metrics row */}
      <HeroMetricsRow />
    </motion.div>
  )
}
