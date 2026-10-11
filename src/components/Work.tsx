import { useState } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import { ui, works, type WorkGroup } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section, SectionHeader } from './ui'

type Filter = 'all' | WorkGroup

export function Work() {
  const { tr } = useLang()
  const [filter, setFilter] = useState<Filter>('all')

  const filters: Filter[] = ['all', 'web', 'ai', 'mobile']
  const visible = filter === 'all' ? works : works.filter((work) => work.group === filter)

  return (
    <Section id="work">
      <SectionHeader label={tr(ui.work.label)} title={tr(ui.work.title)} lead={tr(ui.work.lead)} />

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((key) => {
          const count = key === 'all' ? works.length : works.filter((w) => w.group === key).length
          const active = filter === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={`btn ${active ? 'btn-primary' : 'btn-ghost'} !py-2.5`}
            >
              {tr(ui.work.groups[key])}
              <span className="tabular-nums opacity-60">{String(count).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((work, i) => (
          <Reveal key={work.id} delay={Math.min(i, 5) * 60}>
            <article className="panel panel-hover group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-16/10 overflow-hidden border-b border-white/8">
                <img
                  src={work.cover}
                  alt={tr(work.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/25 to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="chip chip-accent !text-[10px]">{tr(ui.work.groups[work.group])}</span>
                  {work.featured && (
                    <span className="chip chip-amber !text-[10px]">
                      <Star size={10} /> {tr(ui.work.caseLabel)}
                    </span>
                  )}
                </div>
                <span className="absolute bottom-3 left-3 right-3 font-mono text-[11px] text-[var(--color-signal-300)]">
                  ▸ {tr(work.metric)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[16px] font-semibold text-white">{tr(work.title)}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{tr(work.summary)}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <span key={tag} className="chip !text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <div className="mono-label mb-2">{tr(ui.work.stackLabel)}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {work.stack.map((tech) => (
                      <span key={tech} className="font-mono text-[10.5px] text-slate-500">
                        {tech}
                        {tech !== work.stack[work.stack.length - 1] && <span className="text-slate-700"> ·</span>}
                      </span>
                    ))}
                  </div>
                  {work.link && (
                    <a
                      className="btn btn-ghost mt-4 !px-3.5 !py-2"
                      href={work.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {tr(ui.work.visitLabel)}
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
