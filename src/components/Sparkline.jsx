import { motion } from 'framer-motion'

/*
  Sparkline — tiny inline SVG line chart.
  Animates the polyline drawing from left to right.
*/
export default function Sparkline({
  data,
  color = '#0891B2',
  width = 88,
  height = 26,
  strokeWidth = 1.5,
  fill = true,
}) {
  if (!data?.length) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 2) + 1
    const y = height - 1 - ((v - min) / range) * (height - 2)
    return [x, y]
  })

  const polyPoints = points.map(([x, y]) => `${x},${y}`).join(' ')

  // Area fill polygon (close back along the bottom)
  const areaPoints = [
    ...points.map(([x, y]) => `${x},${y}`),
    `${width - 1},${height - 1}`,
    `1,${height - 1}`,
  ].join(' ')

  const gradId = `sparkfill-${color.replace('#', '')}`
  const lastX = points[points.length - 1][0]
  const lastY = points[points.length - 1][1]

  return (
    <svg width={width} height={height} className="block">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && (
        <motion.polygon
          points={areaPoints}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}
      <motion.polyline
        points={polyPoints}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      {/* End-point dot */}
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="2.2"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 300 }}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  )
}
