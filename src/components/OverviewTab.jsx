import { motion } from 'framer-motion'
import OperationsPulse from './OperationsPulse'
import MaturityPyramid from './MaturityPyramid'
import TransformationEngine from './TransformationEngine'
import IntelligenceLayer from './IntelligenceLayer'
import FutureRoadmap from './FutureRoadmap'

export default function OverviewTab({ mode }) {
  return (
    <motion.div
      key={`overview-${mode}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-2 min-h-0"
    >
      {/* MAIN ROW — 3 columns, equal height */}
      <div
        className="grid grid-cols-12 gap-2"
        style={{ height: 'min(58vh, 560px)', minHeight: '440px' }}
      >
        <div className="col-span-12 lg:col-span-3 min-h-0">
          <OperationsPulse mode={mode} />
        </div>
        <div className="col-span-12 lg:col-span-6 min-h-0">
          <MaturityPyramid mode={mode} />
        </div>
        <div className="col-span-12 lg:col-span-3 min-h-0">
          <TransformationEngine mode={mode} />
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div
        className="grid grid-cols-12 gap-2"
        style={{ height: 'min(22vh, 180px)', minHeight: '150px' }}
      >
        <div className="col-span-12 lg:col-span-6 min-h-0">
          <IntelligenceLayer mode={mode} />
        </div>
        <div className="col-span-12 lg:col-span-6 min-h-0">
          <FutureRoadmap mode={mode} />
        </div>
      </div>
    </motion.div>
  )
}
