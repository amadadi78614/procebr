import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Cell, LabelList, Tooltip,
} from 'recharts'

export default function PerformanceBars({ metrics, accent = '#0891B2', height = 320 }) {
  const data = metrics.map((m, i) => ({
    name: m.label,
    value: m.value,
    from: m.from || 0,
    max: m.max || 100,
    suffix: m.suffix || '%',
    delta: m.delta || '',
    fill: accent,
    idx: i,
  }))

  const renderValueLabel = (props) => {
    const { x, y, width, height, value, index } = props
    const m = data[index]
    if (!m) return null
    return (
      <g>
        <text
          x={x + width + 8}
          y={y + height / 2 + 2}
          fill={accent}
          fontSize={14}
          fontWeight={800}
          fontFamily="Plus Jakarta Sans"
        >
          {value}{m.suffix}
        </text>
        {m.delta && (
          <text
            x={x + width + 8}
            y={y + height / 2 + 18}
            fill="#5A8194"
            fontSize={11}
            fontWeight={600}
            fontFamily="JetBrains Mono"
            style={{ letterSpacing: '0.10em', textTransform: 'uppercase' }}
          >
            {m.delta}
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
            Performance KPIs
          </div>
          <div className="font-display font-bold text-powder-950 text-[15px] tracking-tight">
            All metrics, at a glance
          </div>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-powder-600 font-semibold">
          {metrics.length} indicators
        </div>
      </div>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 6, right: 110, bottom: 6, left: 12 }}
            barCategoryGap="20%"
          >
            <defs>
              <linearGradient id={`pbgrad-${accent.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
                <stop offset="100%" stopColor={accent} stopOpacity="1" />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} stroke="rgba(143,178,194,0.22)" strokeDasharray="2 3" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: '#0C2A3E', fontSize: 12, fontFamily: 'JetBrains Mono', fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(143,178,194,0.5)' }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#0C2A3E', fontSize: 13, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(143,178,194,0.5)' }}
              width={140}
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
              formatter={(value, name, props) => [`${value}${props.payload.suffix}`, props.payload.name]}
              labelFormatter={() => ''}
            />
            <Bar
              dataKey="value"
              fill={`url(#pbgrad-${accent.replace('#', '')})`}
              radius={[4, 4, 4, 4]}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={`url(#pbgrad-${accent.replace('#', '')})`} />
              ))}
              <LabelList dataKey="value" content={renderValueLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
