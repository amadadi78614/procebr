import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts'

export default function TrendChart({ title, series, accent = '#0891B2', height = 280, subtitle = 'Trajectory' }) {
  const gradId = `tg-${accent.replace('#', '')}`

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
      <div className="px-4 pt-3 pb-1">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-powder-700 font-semibold">
          {subtitle}
        </div>
        <div className="font-display font-bold text-powder-950 text-[15px] tracking-tight">
          {title}
        </div>
      </div>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={series}
            margin={{ top: 14, right: 22, bottom: 10, left: 6 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity={0.50} />
                <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="2 4"
              stroke="rgba(143,178,194,0.30)"
              vertical={false}
            />
            <XAxis
              dataKey="m"
              tick={{ fill: '#0C2A3E', fontSize: 13, fontFamily: 'JetBrains Mono', fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(143,178,194,0.5)' }}
              interval="preserveStartEnd"
              tickMargin={8}
            />
            <YAxis
              tick={{ fill: '#0C2A3E', fontSize: 13, fontFamily: 'JetBrains Mono', fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
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
              labelStyle={{ color: '#0C2A3E', fontWeight: 700, fontSize: 13 }}
              itemStyle={{ color: accent, fontSize: 13 }}
              cursor={{ stroke: accent, strokeWidth: 1.5, strokeDasharray: '2 3' }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke={accent}
              strokeWidth={3}
              fill={`url(#${gradId})`}
              dot={{ fill: accent, r: 4, strokeWidth: 0 }}
              activeDot={{ r: 7, fill: accent, stroke: '#fff', strokeWidth: 2 }}
              animationDuration={1200}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
