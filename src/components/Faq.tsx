import { Plus } from 'lucide-react'
import { ui } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section, SectionHeader } from './ui'

export function Faq() {
  const { tr } = useLang()

  return (
    <Section id="faq">
      <SectionHeader label={tr(ui.faq.label)} title={tr(ui.faq.title)} />

      <div className="mt-10 max-w-3xl space-y-3">
        {ui.faq.items.map((item, i) => (
          <Reveal key={item.q.en} delay={i * 50}>
            <details className="panel group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15px] font-medium text-slate-100 marker:hidden">
                <span>{tr(item.q)}</span>
                <Plus
                  size={16}
                  className="shrink-0 text-[var(--color-signal-300)] transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 border-t border-white/8 pt-3 text-[13.5px] leading-relaxed text-slate-400">
                {tr(item.a)}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
