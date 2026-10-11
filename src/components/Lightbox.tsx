import { useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import type { Gallery } from '../data/content'
import { useLang } from '../i18n'
import { ui } from '../data/content'

export function Lightbox({
  gallery,
  index,
  onClose,
  onIndexChange,
}: {
  gallery: Gallery
  index: number
  onClose: () => void
  onIndexChange: (next: number) => void
}) {
  const { tr } = useLang()
  const shot = gallery.items[index]
  const total = gallery.items.length

  const step = useCallback(
    (delta: number) => onIndexChange((index + delta + total) % total),
    [index, total, onIndexChange],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, step])

  if (!shot) return null

  return (
    <div
      className="lightbox p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={tr(gallery.title)}
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <span className="truncate">{tr(gallery.title)}</span>
        <span className="flex items-center gap-3">
          <span className="tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost !px-3 !py-2"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous"
          className="absolute left-0 z-10 btn btn-ghost !rounded-full !px-3 !py-3 sm:left-2"
        >
          <ChevronLeft size={16} />
        </button>

        <figure className="m-0 flex max-h-full flex-col items-center gap-3">
          <img
            src={shot.src}
            alt={tr(shot.title)}
            className="max-h-[68vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]"
          />
          <figcaption className="flex flex-wrap items-center justify-center gap-3 px-12 text-center">
            <span className="text-sm text-slate-200">{tr(shot.title)}</span>
            {shot.duration && <span className="chip chip-amber">{shot.duration}</span>}
            <span className="chip">{gallery.resolution}</span>
            {shot.link && (
              <a className="chip chip-accent" href={shot.link} target="_blank" rel="noreferrer noopener">
                <ExternalLink size={11} /> {tr(ui.stock.viewLabel)}
              </a>
            )}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next"
          className="absolute right-0 z-10 btn btn-ghost !rounded-full !px-3 !py-3 sm:right-2"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex justify-center pt-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap justify-center gap-1.5">
          {gallery.items.map((item, i) => (
            <button
              key={item.src + i}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={tr(item.title)}
              className={`h-9 w-14 overflow-hidden rounded-md border transition ${
                i === index ? 'border-[var(--color-signal-400)] opacity-100' : 'border-white/10 opacity-45 hover:opacity-80'
              }`}
            >
              <img src={item.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
