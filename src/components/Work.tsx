import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Star, X, ChevronDown, ChevronUp, Send, ExternalLink } from 'lucide-react'
import { ui, works, type WorkGroup, type Work } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section, SectionHeader } from './ui'

type Filter = 'all' | WorkGroup

export function Work() {
  const { tr } = useLang()
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState<boolean>(false)
  const [activeCase, setActiveCase] = useState<Work | null>(null)

  const filters: Filter[] = ['all', 'web', 'ai', 'mobile']
  const visible = filter === 'all' ? works : works.filter((work) => work.group === filter)
  const displayed = expanded ? visible : visible.slice(0, 9)

  // Close modal on Escape, lock background scroll, close on nav click
  useEffect(() => {
    if (!activeCase) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCase(null)
    }
    window.addEventListener('keydown', onKey)
    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('header, nav, a[href^="#"], a[href^="http"], button[aria-label="Menu"]')) {
        setActiveCase(null)
      }
    }
    window.addEventListener('click', handleGlobalClick, true)
    window.addEventListener('hashchange', () => setActiveCase(null))

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', handleGlobalClick, true)
      window.removeEventListener('hashchange', () => setActiveCase(null))
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
    }
  }, [activeCase])

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
              onClick={() => {
                setFilter(key)
                setExpanded(false)
              }}
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
        {displayed.map((work, i) => (
          <Reveal key={work.id} delay={Math.min(i, 5) * 60}>
            <article
              onClick={() => setActiveCase(work)}
              className="panel panel-hover group flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="relative aspect-16/10 overflow-hidden border-b border-white/8 bg-slate-950">
                <img
                  src={work.cover}
                  alt={tr(work.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />
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
                <h3 className="text-[16px] font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {tr(work.title)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400 line-clamp-3">{tr(work.summary)}</p>

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
                    {work.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="font-mono text-[10.5px] text-slate-500">
                        {tech}
                        {tech !== work.stack[Math.min(3, work.stack.length - 1)] && <span className="text-slate-700"> ·</span>}
                      </span>
                    ))}
                    {work.stack.length > 4 && (
                      <span className="font-mono text-[10.5px] text-slate-600">+{work.stack.length - 4}</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-2">
                    <button
                      type="button"
                      className="btn btn-ghost !px-3 !py-1.5 text-xs text-cyan-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCase(work)
                      }}
                    >
                      {tr(ui.work.visitLabel)}
                      <ArrowUpRight size={12} />
                    </button>
                    {work.link && (
                      <a
                        className="text-xs text-slate-500 hover:text-slate-300 p-1"
                        href={work.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="External link"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {visible.length > 9 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="btn btn-ghost !px-6 !py-3 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40"
          >
            {expanded ? (
              <span className="inline-flex items-center gap-2">
                <ChevronUp size={14} />
                {tr(ui.work.showLess)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <ChevronDown size={14} />
                {tr(ui.work.showMore)} ({visible.length - 9})
              </span>
            )}
          </button>
        </div>
      )}

      {/* Interactive Case Study Modal */}
      {activeCase &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="lightbox fixed inset-0 z-[95] flex flex-col bg-[#030509]/95 p-3 pt-20 sm:p-6 sm:pt-24 md:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={tr(activeCase.title)}
            onClick={() => setActiveCase(null)}
          >
            <div
              className="panel relative mx-auto my-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden border border-white/15 bg-[#090d14] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="chip chip-accent !text-[11px]">{tr(ui.work.groups[activeCase.group])}</span>
                  {activeCase.featured && (
                    <span className="chip chip-amber !text-[11px]">
                      <Star size={11} /> {tr(ui.work.caseLabel)}
                    </span>
                  )}
                  <span className="font-mono text-xs text-[var(--color-signal-300)]">▸ {tr(activeCase.metric)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCase(null)}
                  className="btn btn-ghost !p-2 text-slate-400 hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Cover screenshot */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-inner">
                  <img
                    src={activeCase.cover}
                    alt={tr(activeCase.title)}
                    className="w-full object-contain max-h-[55vh]"
                  />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{tr(activeCase.title)}</h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">{tr(activeCase.summary)}</p>
                </div>

                {/* Stack & Architecture */}
                <div>
                  <div className="mono-label mb-2.5 text-xs text-slate-400">{tr(ui.work.modalStack)}</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCase.stack.map((item) => (
                      <span key={item} className="chip chip-ghost font-mono text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCase.tags.map((tag) => (
                    <span key={tag} className="chip !text-[11px] text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <a
                    href={`https://t.me/s3rf_im?text=${encodeURIComponent(
                      `Привет, Сергей! Интересует кейс: ${activeCase.title.ru}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-primary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider"
                  >
                    <Send size={13} />
                    {tr(ui.work.modalRequestNda)}
                  </a>

                  {activeCase.link && (
                    <a
                      href={activeCase.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn btn-ghost !px-4 !py-2.5 text-xs font-mono"
                    >
                      <ExternalLink size={13} /> Live Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Section>
  )
}
