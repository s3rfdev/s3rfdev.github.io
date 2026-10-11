import { useState } from 'react'
import { Clock3, Globe2, Mail, Send } from 'lucide-react'
import { profile, ui, type L } from '../data/content'
import { useLang } from '../i18n'
import { CopyButton, Reveal, Section, useCopy } from './ui'

const COPY_BRIEF: L = { en: 'Copy brief', ru: 'Скопировать бриф' }

const BRIEF: { title: L; body: string } = {
  title: { en: 'Brief template', ru: 'Шаблон брифа' },
  body: `1) Goal / product:
2) Deliverable (video / site / app / AI system / pack):
3) References I like:
4) Deadline:
5) Budget range:
6) Where the result will be used (marketplace / ads / internal):`,
}

export function Contact() {
  const { tr, lang } = useLang()
  const { copy, copied } = useCopy()
  const [showBrief, setShowBrief] = useState(false)
  const briefCopied = copied === BRIEF.body

  return (
    <Section id="contact">
      <Reveal>
        <div className="panel relative overflow-hidden p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.35), transparent 70%)' }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="mono-label flex items-center gap-2">
                <span className="h-px w-8 bg-[var(--color-signal-400)]/60" />
                {tr(ui.contact.label)}
              </span>
              <h2 className="display mt-4 text-3xl sm:text-[2.6rem]">{tr(ui.contact.title)}</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-400">{tr(ui.contact.lead)}</p>

              <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-slate-300">
                  <Globe2 size={14} className="text-[var(--color-cyan-glow)]" />
                  {tr(profile.location)}
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-slate-300">
                  <Clock3 size={14} className="text-[var(--color-cyan-glow)]" />
                  {tr(ui.contact.responseNote)}
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-slate-300">
                  <Send size={14} className="text-[var(--color-signal-400)]" />
                  {profile.telegramLabel}
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-slate-300">
                  <Mail size={14} className="text-[var(--color-signal-400)]" />
                  {profile.email}
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-3">
              <a
                className="btn btn-primary !py-3.5 !text-[13px]"
                href={profile.telegram}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Send size={15} />
                {tr(ui.contact.telegram)}
              </a>
              <a className="btn btn-ghost !py-3.5 !text-[13px]" href={`mailto:${profile.email}`}>
                <Mail size={15} />
                {tr(ui.contact.email)}
              </a>

              <div className="mt-1 grid gap-2 sm:grid-cols-2">
                <CopyButton value={profile.telegramLabel} label={ui.contact.copyTelegram} />
                <CopyButton value={profile.email} label={ui.contact.copyEmail} />
              </div>

              <button
                type="button"
                onClick={() => setShowBrief((v) => !v)}
                className="mono-label mt-2 self-start underline-slide"
              >
                {tr(BRIEF.title)} {lang === 'ru' ? (showBrief ? '−' : '+') : showBrief ? '−' : '+'}
              </button>

              {showBrief && (
                <div className="panel-flat relative">
                  <pre className="m-0 overflow-x-auto p-4 font-mono text-[11.5px] leading-relaxed text-slate-300">
                    {BRIEF.body}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copy(BRIEF.body)}
                    className="btn btn-ghost absolute right-3 top-3 !px-3 !py-1.5"
                  >
                    {briefCopied ? tr(ui.contact.copied) : tr(COPY_BRIEF)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
