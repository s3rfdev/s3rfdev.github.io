import { ArrowUp, Mail, Send } from 'lucide-react'
import { profile, ui } from '../data/content'
import { useLang } from '../i18n'

export function Footer() {
  const { tr } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-8 border-t border-white/8 bg-[#05070a]/70">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-white/[0.04] p-1 font-mono text-[13px] font-bold text-[var(--color-signal-400)]">
              <svg viewBox="0 0 64 64" className="h-5 w-5" fill="none">
                <path d="M16 46V18h12c5.5 0 9.5 3 9.5 8 0 3.8-2.5 6.6-6.2 7.6L41 46h-6.2l-8.5-11.2H22V46H16zm6-16.8h5.8c2.8 0 4.6-1.5 4.6-3.8s-1.8-3.8-4.6-3.8H22v7.6z" fill="#4ade80"/>
                <polygon points="41,18 47,18 47,34 41,27" fill="#56d9fe"/>
                <circle cx="48" cy="45" r="2.5" fill="#4ade80"/>
              </svg>
            </span>
            <span className="font-mono text-[13px] font-bold tracking-[0.16em] text-white">{profile.brand}</span>
          </div>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-slate-400">{tr(profile.tagline)}</p>
          <p className="mono-label mt-4">
            {profile.owner} · {tr(ui.footer.rights)} {year}
          </p>
        </div>

        <div>
          <div className="mono-label">{tr(ui.nav.contact)}</div>
          <div className="mt-4 flex flex-col gap-2 font-mono text-[12px]">
            <a className="underline-slide text-slate-300" href={profile.telegram} target="_blank" rel="noreferrer noopener">
              <Send size={11} className="mr-2 inline" />
              {profile.telegramLabel}
            </a>
            <a className="underline-slide text-slate-300" href={`mailto:${profile.email}`}>
              <Mail size={11} className="mr-2 inline" />
              {profile.email}
            </a>
          </div>
        </div>

        <div>
          <div className="mono-label">{tr(ui.tickerLabel)}</div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {['Flutter', 'Node.js', 'Python', 'Java', 'Docker', 'MLOps', 'ComfyUI', 'Unity'].map((item) => (
              <span key={item} className="chip !text-[10px]">
                {item}
              </span>
            ))}
          </div>
          <a href="#top" className="btn btn-ghost mt-5 !px-3.5 !py-2">
            <ArrowUp size={12} />
            {tr(ui.footer.top)}
          </a>
        </div>
      </div>

      <div className="border-t border-white/8">
        <p className="mx-auto w-full max-w-[1180px] px-5 py-5 font-mono text-[11px] text-slate-600 sm:px-8">
          {tr(ui.footer.builtWith)}
        </p>
      </div>
    </footer>
  )
}
