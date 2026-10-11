import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { useLang } from '../i18n'

/* ------------------------------------------------------------------ *
 * Reveal on scroll
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ *
 * Panel with a faux window chrome bar
 * ------------------------------------------------------------------ */
export function Panel({
  children,
  title,
  right,
  className = '',
  bodyClassName = '',
  hover = false,
}: {
  children: ReactNode
  title?: ReactNode
  right?: ReactNode
  className?: string
  bodyClassName?: string
  hover?: boolean
}) {
  return (
    <div className={`panel ${hover ? 'panel-hover' : ''} ${className}`}>
      {title !== undefined && (
        <div className="chrome-bar justify-between">
          <span className="flex min-w-0 items-center gap-2 truncate">
            <span className="dot shrink-0" style={{ background: '#f87171' }} />
            <span className="dot shrink-0" style={{ background: '#fbbf24' }} />
            <span className="dot shrink-0" style={{ background: '#4ade80' }} />
            <span className="ml-2 truncate">{title}</span>
          </span>
          {right && <span className="shrink-0 whitespace-nowrap">{right}</span>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Section header: mono label + big title + lead
 * ------------------------------------------------------------------ */
export function SectionHeader({
  label,
  title,
  lead,
  align = 'left',
  id,
}: {
  label: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  id?: string
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`} id={id}>
      <span className="mono-label flex items-center gap-2">
        <span className="h-px w-8 bg-[var(--color-signal-400)]/60" />
        {label}
      </span>
      <h2 className="display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {lead && <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{lead}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Section wrapper
 * ------------------------------------------------------------------ */
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative z-10 mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 sm:py-24 ${className}`}>
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Copy-to-clipboard hook + button
 * ------------------------------------------------------------------ */
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(null), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async (value: string, key = value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const area = document.createElement('textarea')
      area.value = value
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(key)
  }

  return { copy, copied }
}

export function CopyButton({
  value,
  label,
  className = '',
}: {
  value: string
  label: { en: string; ru: string }
  className?: string
}) {
  const { tr } = useLang()
  const { copy, copied } = useCopy()
  const isCopied = copied === value

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={`btn btn-ghost ${className}`}
      aria-live="polite"
      title={`${tr(label)}: ${value}`}
    >
      {isCopied ? <Check size={14} /> : <Copy size={14} />}
      <span>{isCopied ? tr({ en: 'Copied', ru: 'Скопировано' }) : tr(label)}</span>
    </button>
  )
}
