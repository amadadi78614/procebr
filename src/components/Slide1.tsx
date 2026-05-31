'use client'
import { Card, Pill, BeforeAfter, ProgressBar, KpiChip, Bullet, HighlightBox } from '@/components/ui'
import { KPI_HIGHLIGHTS_1, COLORS } from '@/data/ebr'

export default function Slide1() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1.15fr_0.9fr] gap-3 slide-enter">

      <Card accent={COLORS.sky}>
        <Pill label="BOT PR CREATE PERFORMANCE" color={COLORS.sky} />
        <BeforeAfter
          from="8%" to="88%"
          fromLabel="FY25 Start" toLabel="FY26 Achieved"
          color={COLORS.sky}
        />
        <ProgressBar pct={88} color={COLORS.sky} className="mb-1" />
        <HighlightBox color={COLORS.sky}>Performance trajectory moved to Highlights II for the expanded six-block view.</HighlightBox>
        <div className="border-t border-[#F1F5F9] pt-3 space-y-1.5">
          <Bullet title="Change management" body="structured adoption across Openserve" color={COLORS.sky} />
          <Bullet title="Scope expansion" body="continuous bot coverage analysis" color={COLORS.sky} />
          <Bullet title="2 FTE redeployed" body="to higher-value roles" color={COLORS.sky} />
        </div>
      </Card>

      <Card accent={COLORS.teal}>
        <Pill label="PR → PO RELEASE TAT" color={COLORS.teal} />
        <BeforeAfter
          from="25.3" to="17.9"
          fromLabel="Mins FY25" toLabel="Mins FY26"
          color={COLORS.teal}
        />
        <HighlightBox color={COLORS.amber}>↓ 29% reduction in release turnaround time</HighlightBox>
        <div className="border-t border-[#F1F5F9] pt-3 space-y-1.5">
          <Bullet title="Release 31 & 37" body="extended into bot scope" color={COLORS.teal} />
          <Bullet title="SAP automation" body="enhanced via TBI & IE195" color={COLORS.teal} />
          <Bullet title="2 FTE released" body="with pass-back benefit to Telkom" color={COLORS.teal} />
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
        {KPI_HIGHLIGHTS_1.map(k => (
          <KpiChip key={k.big} big={k.big} label={k.label} color={k.color} fill={k.fill} />
        ))}
      </div>
    </div>
  )
}
