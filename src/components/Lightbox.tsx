import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
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

    // 1. Lock background scrolling on html & body
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverscroll = document.body.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'

    // 2. Close gallery if user clicks any menu link, header button, or UI navigation item
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('header, nav, a[href^="#"], a[href^="http"], button[aria-label="Menu"]')) {
        onClose()
      }
    }
    window.addEventListener('click', handleGlobalClick, true)
    window.addEventListener('hashchange', onClose)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', handleGlobalClick, true)
      window.removeEventListener('hashchange', onClose)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overscrollBehavior = prevBodyOverscroll
    }
  }, [onClose, step])

  if (!shot || typeof document === 'undefined') return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).getAttribute('data-backdrop') === 'true') {
      onClose()
    }
  }

  return createPortal(
    <div
      className="lightbox fixed inset-0 z-[95] flex flex-col bg-[#030509]/95 backdrop-blur-xl pt-[60px] sm:pt-[64px]"
      role="dialog"
      aria-modal="true"
      aria-label={tr(gallery.title)}
      onClick={handleBackdropClick}
      data-backdrop="true"
    >
      {/* Lightbox Action Header Bar: prominent Back & Close buttons */}
      <div
        className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#090d14]/90 px-4 py-3 backdrop-blur-md sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost !py-2 !px-3 font-mono text-xs text-slate-300 hover:text-white"
          aria-label="Back"
        >
          <ArrowLeft size={15} />
          <span>{tr({ en: 'Back', ru: 'Назад' })}</span>
        </button>

        <div className="flex min-w-0 items-center gap-2.5 truncate text-center">
          <span className="truncate font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
            {tr(gallery.title)}
          </span>
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-300">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary !py-2 !px-4 text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-black/50"
          aria-label="Close"
        >
          <X size={15} />
          <span>{tr({ en: 'Close (Esc)', ru: 'Закрыть (Esc)' })}</span>
        </button>
      </div>

      {/* Main View Area */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-4"
        onClick={handleBackdropClick}
        data-backdrop="true"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            step(-1)
          }}
          aria-label="Previous"
          className="absolute left-2 z-10 btn btn-ghost !rounded-full !px-3 !py-3 sm:left-4"
        >
          <ChevronLeft size={18} />
        </button>

        <figure
          className="m-0 flex max-h-full flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {shot.videoSrc ? (
            <video
              key={shot.videoSrc}
              src={shot.videoSrc}
              poster={shot.src}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[62vh] sm:max-h-[66vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]"
            />
          ) : (
            <img
              src={shot.src}
              alt={tr(shot.title)}
              className="max-h-[62vh] sm:max-h-[66vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]"
            />
          )}

          <figcaption className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-8 text-center">
            <span className="text-sm font-medium text-slate-200">{tr(shot.title)}</span>
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
          onClick={(e) => {
            e.stopPropagation()
            step(1)
          }}
          aria-label="Next"
          className="absolute right-2 z-10 btn btn-ghost !rounded-full !px-3 !py-3 sm:right-4"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnails strip at the bottom */}
      <div
        className="flex shrink-0 justify-center border-t border-white/8 bg-[#090d14]/70 px-4 py-2.5 backdrop-blur-md"
        onClick={handleBackdropClick}
        data-backdrop="true"
      >
        <div
          className="flex flex-wrap justify-center gap-1.5 max-h-[14vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {gallery.items.map((item, i) => (
            <button
              key={item.src + i}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={tr(item.title)}
              className={`h-9 w-14 overflow-hidden rounded-md border transition ${
                i === index
                  ? 'border-[var(--color-signal-400)] ring-1 ring-[var(--color-signal-400)] opacity-100 scale-105'
                  : 'border-white/10 opacity-50 hover:opacity-90'
              }`}
            >
              <img src={item.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
