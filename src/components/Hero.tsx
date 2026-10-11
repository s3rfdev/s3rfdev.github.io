import { useEffect, useState } from 'react'
import { ArrowRight, BadgeCheck, Clock3, Globe2, Send } from 'lucide-react'
import { profile, ui, type L } from '../data/content'
import { useLang } from '../i18n'
import { Panel } from './ui'

const ROLE_LABEL: L = { en: 'role', ru: 'роль' }
const REPLY_LABEL: L = { en: 'reply time', ru: 'ответ' }

const LOG_LINES: { time: string; text: string; level: 'ok' | 'warn' | 'wait' }[] = [
  { time: '00:00:01', text: '$ rendermind inspect sergei_fomenko', level: 'ok' },
  { time: '00:00:02', text: 'role: Senior Dev (15+ yrs) · AI Architect', level: 'ok' },
  { time: '00:00:03', text: 'focus: Photo/Video Models · GenAI & MLOps', level: 'ok' },
  { time: '00:00:04', text: 'stack: Flutter · Node · Java · Python · DB', level: 'ok' },
  { time: '00:00:05', text: 'devops: High-Speed CI/CD · GPU Clusters', level: 'ok' },
  { time: '00:00:06', text: 'automation: Admin Panels · Flows · Unity', level: 'ok' },
  { time: '00:00:07', text: 'ships: Turnkey Web, Mobile & High-Load', level: 'ok' },
  { time: '00:00:08', text: 'status: available → telegram @s3rf_im', level: 'wait' },
]

const LEVEL_COLOR: Record<'ok' | 'warn' | 'wait', string> = {
  ok: 'text-[var(--color-signal-300)]',
  warn: 'text-[var(--color-amber-glow)]',
  wait: 'text-[var(--color-cyan-glow)]',
}

export function Hero() {
  const { lang, tr } = useLang()
  const [visibleLines, setVisibleLines] = useState(1)

  useEffect(() => {
    if (visibleLines >= LOG_LINES.length) {
      const reset = window.setTimeout(() => setVisibleLines(1), 10000)
      return () => window.clearTimeout(reset)
    }
    const timer = window.setTimeout(() => setVisibleLines((n) => n + 1), visibleLines === 1 ? 400 : 520)
    return () => window.clearTimeout(timer)
  }, [visibleLines])

  return (
    <div id="top" className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pt-28 pb-8 sm:px-8 sm:pt-36">
      <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        {/* ------------------------------------------------ left column */}
        <div className="rise min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="chip chip-accent">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-signal-400)]" />
              {tr(ui.hero.availability)}
            </span>
            <span className="chip">
              <Globe2 size={11} /> {tr(profile.location)}
            </span>
          </div>

          <h1 className="display mt-6 text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[2.85rem] leading-[1.14]">
            {lang === 'ru' ? (
              <>
                <span className="text-gradient block">Собираю весь</span>
                <span className="text-gradient">ваш продукт </span>
                <span className="text-slate-500">и пайплайн.</span>
              </>
            ) : (
              <>
                <span className="text-gradient block">Building your full</span>
                <span className="text-gradient">product </span>
                <span className="text-slate-500">&amp; pipeline.</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400">{tr(ui.hero.lead)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="btn btn-primary" href={profile.telegram} target="_blank" rel="noreferrer noopener">
              <Send size={14} />
              {tr(ui.hero.ctaPrimary)}
            </a>
            <a className="btn btn-ghost" href="#work">
              {tr(ui.hero.ctaSecondary)}
              <ArrowRight size={14} />
            </a>
          </div>

          <dl className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-white/8 pt-6 sm:grid-cols-3">
            <div>
              <dt className="mono-label">{tr(ROLE_LABEL)}</dt>
              <dd className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-200">
                <BadgeCheck size={14} className="shrink-0 text-[var(--color-signal-400)]" />
                {tr(profile.role)}
              </dd>
            </div>
            <div>
              <dt className="mono-label">{tr(REPLY_LABEL)}</dt>
              <dd className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-200">
                <Clock3 size={14} className="shrink-0 text-[var(--color-cyan-glow)]" />
                &lt; 2h · {profile.timezone}
              </dd>
            </div>
          </dl>
        </div>

        {/* ------------------------------------------------ right column */}
        <div className="rise flex min-w-0 flex-col gap-4" style={{ animationDelay: '120ms' }}>
          <Panel
            className="scanline floaty min-w-0"
            title={
              <span className="flex items-center gap-2">
                server.log
                <span className="text-[var(--color-signal-400)]">● {tr(ui.terminal.title)}</span>
              </span>
            }
            right={<span className="text-[10px] text-slate-500">tail -f</span>}
          >
            <div className="min-h-[220px] sm:min-h-[240px] overflow-hidden px-4 py-3.5 font-mono text-[11px] leading-[1.8] sm:text-[12px]">
              {LOG_LINES.slice(0, visibleLines).map((line) => (
                <div key={line.time + line.text} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="shrink-0 select-none text-slate-600">{line.time}</span>
                  {line.level === 'wait' ? (
                    <a
                      href={profile.telegram}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`truncate underline-slide ${LEVEL_COLOR[line.level]}`}
                    >
                      {line.text}
                    </a>
                  ) : (
                    <span className={`truncate ${LEVEL_COLOR[line.level]}`}>{line.text}</span>
                  )}
                </div>
              ))}
              <span className="caret" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
