import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts'

export default function CompositionDonut({ composition, accent = '#0891B2', height = 280 }) {
  const { title, unit, slices } = composition
  const dominant = [...slices].sort((a, b) => b.value - a.value)[0]

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
          Composition
        </div>
        <div className="font-display font-bold text-powder-950 text-[15px] tracking-tight">
          {title}
        </div>
      </div>

      <div className="px-2 pb-2 flex items-center gap-2" style={{ height: height - 50 }}>
        <div className="relative" style={{ width: '55%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="92%"
                paddingAngle={2}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={2}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {slices.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
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
                formatter={(value, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div
              className="font-display font-bold tabular-nums leading-none"
              style={{ fontSize: 32, color: dominant.color }}
            >
              {dominant.value}%
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-powder-800 font-bold text-center max-w-[80%] leading-tight mt-1">
              {dominant.name}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2 pr-2 overflow-y-auto">
          {slices.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center gap-2"
            >
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ background: s.color, boxShadow: `0 0 6px ${s.color}55` }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-[12.5px] text-powder-950 truncate leading-tight">
                  {s.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.10em] text-powder-700 leading-tight font-semibold">
                  {s.value}% · {unit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
