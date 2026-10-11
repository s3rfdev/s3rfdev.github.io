import { useEffect, useState } from 'react'
import { Menu, Send, X } from 'lucide-react'
import { profile, ui } from '../data/content'
import { useLang } from '../i18n'

const links = [
  { href: '#about', key: 'about' as const },
  { href: '#services', key: 'services' as const },
  { href: '#work', key: 'work' as const },
  { href: '#stock', key: 'stock' as const },
  { href: '#process', key: 'process' as const },
  { href: '#contact', key: 'contact' as const },
]

export function Nav() {
  const { tr, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-[#05070a]/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center gap-3 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-white/[0.04] p-1 font-mono text-[13px] font-bold text-[var(--color-signal-400)] transition hover:border-[var(--color-signal-400)]/40">
            <svg viewBox="0 0 64 64" className="h-5 w-5" fill="none">
              <path d="M16 46V18h12c5.5 0 9.5 3 9.5 8 0 3.8-2.5 6.6-6.2 7.6L41 46h-6.2l-8.5-11.2H22V46H16zm6-16.8h5.8c2.8 0 4.6-1.5 4.6-3.8s-1.8-3.8-4.6-3.8H22v7.6z" fill="#4ade80"/>
              <polygon points="41,18 47,18 47,34 41,27" fill="#56d9fe"/>
              <circle cx="48" cy="45" r="2.5" fill="#4ade80"/>
            </svg>
          </span>
          <span className="font-mono text-[13px] font-bold tracking-[0.16em] text-white">{profile.brand}</span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {tr(ui.nav[link.key])}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-white/12 bg-white/[0.03] p-0.5 font-mono text-[10.5px] sm:flex">
            {(['en', 'ru'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-[6px] px-2.5 py-1.5 uppercase tracking-[0.14em] transition ${
                  lang === code ? 'bg-[var(--color-signal-400)]/15 text-[var(--color-signal-300)]' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            className="btn btn-primary hidden !px-4 !py-2.5 md:inline-flex"
            href={profile.telegram}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Send size={13} />
            {tr(ui.nav.order)}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="btn btn-ghost !px-3 !py-2.5 lg:hidden"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#05070a]/97 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {tr(ui.nav[link.key])}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              {(['en', 'ru'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`btn ${lang === code ? 'btn-primary' : 'btn-ghost'} flex-1`}
                >
                  {code}
                </button>
              ))}
            </div>
            <a className="btn btn-primary mt-1" href={profile.telegram} target="_blank" rel="noreferrer noopener">
              <Send size={13} />
              {tr(ui.nav.order)}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
