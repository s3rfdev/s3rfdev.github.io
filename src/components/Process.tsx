import { ui } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section, SectionHeader } from './ui'

export function Process() {
  const { tr } = useLang()

  return (
    <Section id="process">
      <SectionHeader label={tr(ui.process.label)} title={tr(ui.process.title)} />

      <ol className="mt-12 grid gap-5 lg:grid-cols-4">
        {ui.process.steps.map((step, i) => (
          <Reveal key={step.title.en} delay={i * 80} as="li">
            <div className="relative h-full">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(124,247,172,0.3)] bg-[rgba(124,247,172,0.08)] font-mono text-[12px] font-bold text-[var(--color-signal-300)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="hidden h-px flex-1 bg-gradient-to-r from-[rgba(124,247,172,0.35)] to-transparent lg:block" />
              </div>
              <h3 className="mt-5 text-[15.5px] font-semibold text-white">{tr(step.title)}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{tr(step.desc)}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
