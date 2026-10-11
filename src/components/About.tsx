import { ArrowRight, BadgeCheck, Cpu, Database, Layers, Mail, Send, Zap } from 'lucide-react'
import { profile, ui } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section } from './ui'

const ICONS = [Cpu, Zap, Database, Layers]

export function About() {
  const { tr } = useLang()

  return (
    <Section id="about">
      <Reveal>
        <div className="panel relative overflow-hidden p-6 sm:p-10">
          {/* subtle ambient backlight */}
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.22), transparent 70%)' }}
          />

          <div className="relative grid items-start gap-10 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr]">
            {/* ----------------- Left: photo in cyber frame ----------------- */}
            <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#080c13]/90 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
                {/* terminal chrome */}
                <div className="chrome-bar flex items-center justify-between bg-white/[0.03] px-3.5 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="dot bg-[#ff5f56]" />
                    <span className="dot bg-[#ffbd2e]" />
                    <span className="dot bg-[#27c93f]" />
                  </div>
                  <span className="font-mono text-[10.5px] tracking-wider text-slate-400">
                    sergei_fomenko2.jpg
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-[var(--color-signal-400)]">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-signal-400)]" />
                    verified
                  </span>
                </div>

                {/* photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={profile.portrait}
                    alt={profile.owner}
                    className="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="scanline pointer-events-none absolute inset-0" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080c13] via-transparent to-transparent opacity-60" />
                </div>

                {/* frame footer credentials */}
                <div className="border-t border-white/8 bg-white/[0.02] p-4 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-white">{profile.owner}</span>
                    <span className="text-[var(--color-cyan-glow)]">15+ yrs exp</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="chip chip-accent !py-0.5 !text-[9.5px]">AI/ML</span>
                    <span className="chip !py-0.5 !text-[9.5px]">MLOps</span>
                    <span className="chip !py-0.5 !text-[9.5px]">DevOps Speed</span>
                    <span className="chip !py-0.5 !text-[9.5px]">Flutter</span>
                    <span className="chip !py-0.5 !text-[9.5px]">Node.js</span>
                    <span className="chip !py-0.5 !text-[9.5px]">Java</span>
                    <span className="chip !py-0.5 !text-[9.5px]">Python</span>
                  </div>
                </div>
              </div>

              {/* quick badges */}
              <div className="mt-3 flex flex-col gap-2">
                {ui.about.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-slate-300"
                  >
                    <BadgeCheck size={13} className="shrink-0 text-[var(--color-signal-400)]" />
                    <span>{tr(badge)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------- Right: bio & technical pillars ----------------- */}
            <div className="min-w-0">
              <span className="mono-label flex items-center gap-2">
                <span className="h-px w-8 bg-[var(--color-signal-400)]/60" />
                {tr(ui.about.label)}
              </span>

              <h2 className="display mt-3 text-2xl sm:text-3xl md:text-[2.35rem]">
                {tr(ui.about.title)}
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-[15.5px]">
                {tr(ui.about.lead)}
              </p>

              {/* technical highlights grid */}
              <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                {ui.about.items.map((item, index) => {
                  const Icon = ICONS[index % ICONS.length]
                  return (
                    <div
                      key={item.tag}
                      className="panel-hover rounded-xl border border-white/8 bg-white/[0.025] p-4 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-[var(--color-signal-400)]">
                          <Icon size={13} />
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="mt-2 text-[14px] font-semibold text-white">
                        {tr(item.title)}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">
                        {tr(item.desc)}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/8 pt-6">
                <a
                  className="btn btn-primary"
                  href={profile.telegram}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Send size={14} />
                  {profile.telegramLabel}
                </a>
                <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                  <Mail size={14} />
                  {profile.email}
                </a>
                <a className="btn btn-ghost" href="#contact">
                  <ArrowRight size={14} />
                  {tr(ui.nav.contact)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
