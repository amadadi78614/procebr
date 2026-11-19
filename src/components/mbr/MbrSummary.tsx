'use client'
import { MbrHero, HeroStat, Panel, Stat, ComboChart, MultiLine, Delta } from './shared'
import {
  MBR_PERIOD, SR1_TAT, SR1_YTD, PR2PO, PR2PO_YTD, PR2PO_SEP_MIX, PR_REL_HOURS,
  SPOT_BUY, SPOT_BUY_YTD, SR9, SR9_YTD,
} from '@/data/mbr'

const sepMixTotal = PR2PO_SEP_MIX.reduce((a, b) => a + b.pos, 0)
const automatedShare = Math.round(((PR2PO_SEP_MIX[0].pos + PR2PO_SEP_MIX[1].pos) / sepMixTotal) * 100)

export default function MbrSummary() {
  const sep = (arr: any[]) => arr[arr.length - 1]
  const aug = (arr: any[]) => arr[arr.length - 2]

  return (
    <div className="slide-enter space-y-3">
      <MbrHero
        eyebrow={`Monthly Business Review · ${MBR_PERIOD.long}`}
        title="Executive summary: SLA turnaround performance"
        sub="SLA TAT dashboards are built and published. Each SLA shows a table and TAT trend for FY27 YTD (Apr–Sep '26)."
        right={
          <div className="flex flex-wrap gap-2">
            <HeroStat val={`${automatedShare}%`} lbl="Sep POs auto / bot" tone="sky" />
            <HeroStat val="-0.03d" lbl="Sep PR→PO TAT" tone="green" />
            <HeroStat val="2.67d" lbl="Onboarding TAT · YTD low" tone="violet" />
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Stat big={sep(PR2PO).pos.toLocaleString('en-ZA')} label="POs converted in Sep" sub={`${PR2PO_YTD.pos.toLocaleString('en-ZA')} FY27 YTD · avg ${PR2PO_YTD.tat} days`} color="#1670C0" />
        <Stat big={`${sep(PR_REL_HOURS).BOT}h`} label="Bot PR→PO release TAT" sub={`Down from ${aug(PR_REL_HOURS).BOT}h in Aug (business hours)`} color="#0D9488" />
        <Stat big={`${sep(SPOT_BUY).pos}`} label="Spot buy POs in Sep" sub={`WNS ${sep(SPOT_BUY).wns}d · cost centre ${sep(SPOT_BUY).cc}d`} color="#EA580C" />
        <Stat big={`${sep(SR1_TAT).tat}d`} label="First-inquiry resolution TAT" sub={`${sep(SR1_TAT).count} inquiries in Sep · YTD ${SR1_YTD.tat}d`} color="#7C3AED" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Panel title="PR → PO conversion" tag="SLA-TAT · days" accent="#1670C0">
          <ComboChart data={PR2PO} bar={{ key: 'pos', name: 'PO count', color: '#1670C0' }}
            lines={[{ key: 'tat', name: 'Avg TAT (days)', color: '#0B2545' }]} units={{ tat: ' days' }} />
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#64748B]">Sep channel mix · {sepMixTotal.toLocaleString('en-ZA')} POs</span>
              <Delta text={`${automatedShare}% auto + bot`} />
            </div>
            <div className="flex h-3 rounded-full overflow-hidden">
              {PR2PO_SEP_MIX.map(m => (
                <div key={m.name} style={{ width: `${(m.pos / sepMixTotal) * 100}%`, background: m.color }} title={`${m.name}: ${m.pos}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 mt-1.5">
              {PR2PO_SEP_MIX.map(m => (
                <div key={m.name} className="text-[9.5px] text-[#475569] leading-tight">
                  <span className="inline-block h-2 w-2 rounded-sm mr-1 align-middle" style={{ background: m.color }} />
                  <b className="text-[#0F172A]">{m.name}</b> {m.pos.toLocaleString('en-ZA')} · {m.tat}d
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="PR release → PO release TAT" tag="business hours" accent="#0D9488">
          <MultiLine data={PR_REL_HOURS} unit="h" height={210} lines={[
            { key: 'AUTO', color: '#0EA5E9' }, { key: 'BOT', color: '#1E3A8A' },
            { key: 'NON-BOT', color: '#EA580C' }, { key: 'RFQ', color: '#7C3AED' },
          ]} />
          <p className="text-[10px] text-[#475569] mt-1.5 leading-snug">
            Sep recovered sharply after the Aug spike. Non-bot dropped from <b>74h → 13h</b> and bot from <b>33h → 8h</b>. Auto-created POs stay near zero. RFQ remains the slowest channel at <b>44h</b>.
          </p>
        </Panel>

        <Panel title="Spot buy" tag="SLA-TAT · days" accent="#EA580C">
          <ComboChart data={SPOT_BUY} bar={{ key: 'pos', name: 'PO count', color: '#EA580C' }}
            lines={[{ key: 'cc', name: 'Cost centre approval', color: '#0EA5E9' }, { key: 'wns', name: 'WNS', color: '#0B2545' }]}
            units={{ cc: ' days', wns: ' days' }} />
          <p className="text-[10px] text-[#475569] mt-1.5 leading-snug">
            Volume is at a YTD high (<b>355 POs</b>). WNS TAT is <b>1.50d</b> against <b>2.29d</b> cost-centre approval. YTD: {SPOT_BUY_YTD.pos.toLocaleString('en-ZA')} POs · WNS {SPOT_BUY_YTD.wns}d · CC {SPOT_BUY_YTD.cc}d ({SPOT_BUY_YTD.note}).
          </p>
        </Panel>

        <div className="grid grid-cols-1 gap-3">
          <Panel title="SR9 · Supplier onboarding (transactional)" tag="SLA-TAT · days" accent="#7C3AED">
            <ComboChart data={SR9} height={130} bar={{ key: 'count', name: 'Requests', color: '#7C3AED' }}
              lines={[{ key: 'tat', name: 'Avg TAT (days)', color: '#4C1D95' }]} units={{ tat: ' days' }} />
            <div className="flex items-center gap-2 mt-1">
              <Delta text={`Sep ${sep(SR9).tat}d vs YTD ${SR9_YTD.tat}d`} />
              <span className="text-[10px] text-[#475569]">Lowest month YTD · {SR9_YTD.count} requests YTD</span>
            </div>
          </Panel>
          <Panel title="SR1 · First “inquiry” resolution" tag="SLA-TAT · days" accent="#0EA5E9">
            <ComboChart data={SR1_TAT} height={120} bar={{ key: 'count', name: 'Inquiries', color: '#0EA5E9' }}
              lines={[{ key: 'tat', name: 'Avg TAT (days)', color: '#0B2545' }]} units={{ tat: ' days' }} />
            <div className="flex items-center gap-2 mt-1">
              <Delta text={`YTD ${SR1_YTD.count} inquiries · ${SR1_YTD.tat}d`} />
              <span className="text-[10px] text-[#475569]">Sep {sep(SR1_TAT).tat}d (Aug {aug(SR1_TAT).tat}d)</span>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
