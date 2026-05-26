import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Tooltip, LabelList,
} from 'recharts'

export default function ComparisonChart({ comparisons, accent = '#0891B2', height = 280 }) {
  const data = comparisons.map((c) => {
    const max = Math.max(c.before, c.after) || 1
    return {
      name: c.label,
      beforeRaw: c.before,
      afterRaw: c.after,
      before: Math.round((c.before / max) * 100),
      after: Math.round((c.after / max) * 100),
      suffix: c.suffix || '',
      delta: c.delta || '',
      reverse: c.reverse,
    }
  })

  const renderBeforeLabel = (props) => {
    const { x, y, width, height, index } = props
    const d = data[index]
    if (!d || width < 22) return null
    return (
      <text
        x={x + width - 8}
        y={y + height / 2 + 4}
        fill="#FFFFFF"
        fontSize={12}
        fontWeight={800}
        fontFamily="Plus Jakarta Sans"
        textAnchor="end"
      >
        {d.beforeRaw}{d.suffix}
      </text>
    )
  }

  const renderAfterLabel = (props) => {
    const { x, y, width, height, index } = props
    const d = data[index]
    if (!d) return null
    return (
      <g>
        <text
          x={x + width - 8}
          y={y + height / 2 + 4}
          fill="#FFFFFF"
          fontSize={12}
          fontWeight={800}
          fontFamily="Plus Jakarta Sans"
          textAnchor="end"
        >
          {d.afterRaw}{d.suffix}
        </text>
        {d.delta && (
          <text
            x={x + width + 8}
            y={y + height / 2 + 4}
            fill={accent}
            fontSize={11}
            fontFamily="JetBrains Mono"
            fontWeight={700}
            style={{ letterSpacing: '0.10em', textTransform: 'uppercase' }}
          >
            {d.delta}
          </text>
        )}
      </g>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl border bg-white/85 backdrop-blur-sm overflow-hidden h-full"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 2px 6px -1px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-powder-700 font-semibold">
            Before · After
          </div>
          <div className="font-display font-bold text-powder-950 text-[15px] tracking-tight">
            The Journey, Quantified
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-powder-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#94A3B8' }} /> Before
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-powder-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: accent }} /> After
          </span>
        </div>
      </div>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 6, right: 100, bottom: 6, left: 12 }}
            barCategoryGap="22%"
            barGap={5}
          >
            <defs>
              <linearGradient id={`cmpa-${accent.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
                <stop offset="100%" stopColor={accent} stopOpacity="1" />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} stroke="rgba(143,178,194,0.20)" strokeDasharray="2 3" />
            <XAxis
              type="number"
              domain={[0, 100]}
              hide
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#0C2A3E', fontSize: 13, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(143,178,194,0.5)' }}
              width={160}
            />
            <Tooltip
              cursor={{ fill: 'rgba(143,178,194,0.10)' }}
              contentStyle={{
                background: 'rgba(255,255,255,0.97)',
                border: `1px solid ${accent}55`,
                borderRadius: 8,
                fontSize: 13,
                fontFamily: 'JetBrains Mono',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(15,60,80,0.12)',
                padding: '8px 12px',
              }}
              formatter={(value, name, props) => {
                if (name === 'before') return [`${props.payload.beforeRaw}${props.payload.suffix}`, 'Before']
                if (name === 'after')  return [`${props.payload.afterRaw}${props.payload.suffix}`, 'After']
                return value
              }}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="before" fill="#94A3B8" radius={[3, 3, 3, 3]} animationDuration={900}>
              <LabelList dataKey="before" content={renderBeforeLabel} />
            </Bar>
            <Bar
              dataKey="after"
              fill={`url(#cmpa-${accent.replace('#', '')})`}
              radius={[3, 3, 3, 3]}
              animationDuration={1200}
            >
              <LabelList dataKey="after" content={renderAfterLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
