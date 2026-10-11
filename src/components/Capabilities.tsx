import { BrainCircuit, Check, Clapperboard, Code2 } from 'lucide-react'
import { ui } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section, SectionHeader } from './ui'

const ICONS: Record<string, typeof BrainCircuit> = {
  'AI/ML': BrainCircuit,
  'FULL-STACK': Code2,
  CONTENT: Clapperboard,
}

export function Capabilities() {
  const { tr } = useLang()

  return (
    <Section id="capabilities">
      <SectionHeader label={tr(ui.capabilities.label)} title={tr(ui.capabilities.title)} lead={tr(ui.capabilities.lead)} />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {ui.capabilities.items.map((item, i) => {
          const Icon = ICONS[item.code] ?? BrainCircuit
          return (
            <Reveal key={item.code} delay={i * 90}>
              <article className="panel panel-hover h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--color-signal-300)]">
                    <Icon size={20} />
                  </span>
                  <span className="mono-label">{item.code}</span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">{tr(item.title)}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-400">{tr(item.desc)}</p>

                <ul className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                  {item.points.map((point) => (
                    <li key={point.en} className="flex gap-2.5 text-[13px] text-slate-300">
                      <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-signal-400)]" />
                      <span>{tr(point)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
