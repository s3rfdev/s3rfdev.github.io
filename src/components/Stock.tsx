import { useMemo, useState } from 'react'
import { Expand, ExternalLink, Film, ImageIcon, Play, Send } from 'lucide-react'
import { galleries, marketplaces, profile, ui, type Gallery } from '../data/content'
import { useLang } from '../i18n'
import { Lightbox } from './Lightbox'
import { Reveal, Section, SectionHeader } from './ui'

type Tab = 'photo' | 'video'
type OpenState = { galleryId: string; index: number }

function GalleryPanel({ gallery, onOpen }: { gallery: Gallery; onOpen: (index: number) => void }) {
  const { tr } = useLang()
  const isVideo = gallery.kind === 'video'
  const Icon = isVideo ? Film : ImageIcon

  return (
    <article className="panel overflow-hidden">
      <div className="chrome-bar flex-wrap justify-between gap-y-2">
        <span className="flex items-center gap-2">
          <Icon size={12} />
          {tr(isVideo ? ui.stock.videoLabel : ui.stock.photoLabel)}
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{gallery.id}</span>
        </span>
        <span className="flex flex-wrap items-center gap-2 text-slate-500">
          <span>{gallery.meta}</span>
          {gallery.link ? (
            <a
              className="chip chip-accent !text-[10px]"
              href={gallery.link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ExternalLink size={10} /> {tr(ui.work.visitLabel)}
            </a>
          ) : null}
        </span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[260px_1fr] lg:gap-6 lg:p-6">
        <div className="lg:border-r lg:border-white/8 lg:pr-6">
          <h3 className="text-[17px] font-semibold text-white">{tr(gallery.title)}</h3>
          <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{tr(gallery.summary)}</p>

          <dl className="mt-5 space-y-2.5 border-t border-white/8 pt-4 font-mono text-[11px]">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500 uppercase tracking-[0.12em]">{tr(ui.stock.resolutionLabel)}</dt>
              <dd className="text-right text-slate-300">{gallery.resolution}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500 uppercase tracking-[0.12em]">{tr(ui.stock.formatsLabel)}</dt>
              <dd className="text-right text-slate-300">{gallery.formats}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500 uppercase tracking-[0.12em]">{tr(ui.stock.licenseLabel)}</dt>
              <dd className="text-right text-slate-300">{tr(ui.stock.licenseValue)}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => onOpen(0)}
            className="btn btn-ghost mt-5 w-full !py-2.5"
          >
            {isVideo ? <Play size={12} /> : <Expand size={12} />}
            {tr(isVideo ? ui.stock.playLabel : ui.stock.viewLabel)}
            <span className="tabular-nums opacity-60">
              {gallery.items.length} {tr(isVideo ? ui.stock.clipsWord : ui.stock.photosWord)}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {gallery.items.map((shot, index) => (
            <button
              key={shot.src + index}
              type="button"
              onClick={() => onOpen(index)}
              className="thumb group aspect-16/10 rounded-lg border border-white/8"
              aria-label={tr(shot.title)}
            >
              <img src={shot.src} alt={tr(shot.title)} loading="lazy" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pt-6 pb-1.5 text-left text-[10.5px] leading-tight text-slate-200 opacity-0 transition group-hover:opacity-100">
                {tr(shot.title)}
              </span>
              {isVideo && (
                <>
                  <span className="pointer-events-none absolute inset-0 grid place-items-center">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition group-hover:border-[var(--color-signal-400)] group-hover:text-[var(--color-signal-300)]">
                      <Play size={13} />
                    </span>
                  </span>
                  <span className="pointer-events-none absolute right-1.5 top-1.5 rounded bg-black/65 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    {shot.duration}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Stock() {
  const { tr } = useLang()
  const [tab, setTab] = useState<Tab>('photo')
  const [openState, setOpenState] = useState<OpenState | null>(null)

  const photoGalleries = useMemo(() => galleries.filter((g) => g.kind === 'photo'), [])
  const videoGalleries = useMemo(() => galleries.filter((g) => g.kind === 'video'), [])
  const visible = tab === 'photo' ? photoGalleries : videoGalleries

  const openGallery = openState ? galleries.find((g) => g.id === openState.galleryId) ?? null : null

  const photoTotal = photoGalleries.reduce((n, g) => n + g.items.length, 0)
  const videoTotal = videoGalleries.reduce((n, g) => n + g.items.length, 0)
  const counts = tab === 'photo'
    ? `${photoTotal} ${tr(ui.stock.photosWord)}`
    : `${videoTotal} ${tr(ui.stock.clipsWord)}`

  return (
    <Section id="stock">
      <SectionHeader label={tr(ui.stock.label)} title={tr(ui.stock.title)} lead={tr(ui.stock.lead)} />

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {(['photo', 'video'] as Tab[]).map((key) => {
          const active = tab === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-pressed={active}
              className={`btn ${active ? 'btn-primary' : 'btn-ghost'} !py-2.5`}
            >
              {key === 'photo' ? <ImageIcon size={13} /> : <Film size={13} />}
              {tr(key === 'photo' ? ui.stock.photoTab : ui.stock.videoTab)}
              <span className="tabular-nums opacity-60">
                {key === 'photo' ? photoGalleries.length : videoGalleries.length}
              </span>
            </button>
          )
        })}
        <span className="mono-label ml-1">{counts}</span>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {visible.map((gallery, i) => (
          <Reveal key={gallery.id} delay={i * 80}>
            <GalleryPanel
              gallery={gallery}
              onOpen={(index) => setOpenState({ galleryId: gallery.id, index })}
            />
          </Reveal>
        ))}
      </div>

      {/* -------------------------------- author profiles -------------------------------- */}
      <Reveal>
        <div className="panel mt-6 p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mono-label">{tr(ui.stock.authorLabel)}</span>
              <p className="mt-2 max-w-xl text-[13px] text-slate-400">{tr(ui.stock.authorNote)}</p>
            </div>
            <a className="btn btn-primary" href={profile.telegram} target="_blank" rel="noreferrer noopener">
              <Send size={13} />
              {tr(ui.stock.getInTouch)}
            </a>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {marketplaces.map((market) => {
              const content = (
                <>
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-medium text-white">{market.name}</span>
                    {market.href ? (
                      <ExternalLink size={13} className="text-[var(--color-signal-300)]" />
                    ) : (
                      <span className="chip !text-[9.5px]">link pending</span>
                    )}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-slate-500">{tr(market.kind)}</span>
                </>
              )
              return market.href ? (
                <a
                  key={market.name}
                  href={market.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="panel-flat panel-hover block p-4"
                >
                  {content}
                </a>
              ) : (
                <div key={market.name} className="panel-flat block p-4 opacity-70">
                  {content}
                </div>
              )
            })}
          </div>

          <p className="mt-5 border-t border-white/8 pt-4 text-[13px] leading-relaxed text-slate-400">
            {tr(ui.stock.reviewNote)}
          </p>
        </div>
      </Reveal>

      {openGallery && openState && (
        <Lightbox
          gallery={openGallery}
          index={openState.index}
          onClose={() => setOpenState(null)}
          onIndexChange={(index) => setOpenState({ galleryId: openGallery.id, index })}
        />
      )}
    </Section>
  )
}
