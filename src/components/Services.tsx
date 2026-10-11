import {
  Bot,
  BrainCircuit,
  Check,
  Clapperboard,
  Code2,
  Layers,
  LayoutDashboard,
  Send,
  Server,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { profile, ui, type L } from '../data/content'
import { useLang } from '../i18n'
import { Reveal, Section, SectionHeader } from './ui'

const ICONS: Record<string, LucideIcon> = {
  video: Clapperboard,
  smartphone: Smartphone,
  server: Server,
  layers: Layers,
  code: Code2,
  bot: Bot,
  brain: BrainCircuit,
  layout: LayoutDashboard,
}

type Service = (typeof ui.services.items)[number]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { tr } = useLang()
  const Icon = ICONS[service.icon] ?? Code2
  const featured = service.featured

  return (
    <article
      className={`panel panel-hover flex h-full flex-col p-6 ${
        featured ? 'border-[rgba(124,247,172,0.24)]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl border ${
            featured
              ? 'border-[rgba(124,247,172,0.35)] bg-[rgba(124,247,172,0.1)] text-[var(--color-signal-300)]'
              : 'border-white/10 bg-white/[0.04] text-slate-300'
          }`}
        >
          <Icon size={19} />
        </span>
        <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <h3 className="mt-5 text-[17px] font-semibold text-white">{tr(service.title)}</h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-400">{tr(service.desc)}</p>

      {featured && (
        <ul className="mt-5 space-y-2 border-t border-white/8 pt-5">
          {service.points.map((point: L) => (
            <li key={point.en} className="flex gap-2.5 text-[13px] text-slate-300">
              <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-signal-400)]" />
              <span>{tr(point)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/8 pt-5 pb-1">
        <span className={`chip ${featured ? 'chip-amber' : ''} !text-[11px]`}>{tr(service.price)}</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-slate-500">
          {tr(service.priceMeta)}
        </span>
        <a
          className="btn btn-ghost ml-auto !px-3.5 !py-2"
          href={profile.telegram}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${tr(ui.services.cta)} — ${tr(service.title)}`}
        >
          <Send size={12} />
          {tr(ui.services.cta)}
        </a>
      </div>
    </article>
  )
}

export function Services() {
  const { tr } = useLang()
  const featured = ui.services.items.filter((item) => item.featured)
  const rest = ui.services.items.filter((item) => !item.featured)

  return (
    <Section id="services" className="!pt-4">
      <SectionHeader
        label={tr(ui.services.label)}
        title={tr(ui.services.title)}
        lead={tr(ui.services.lead)}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {featured.map((service, i) => (
          <Reveal key={service.id} delay={i * 70}>
            <ServiceCard service={service} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {rest.map((service, i) => (
          <Reveal key={service.id} delay={i * 60}>
            <ServiceCard service={service} index={featured.length + i} />
          </Reveal>
        ))}
      </div>

      <p className="mono-label mt-8 text-center">{tr(ui.services.priceNote)}</p>
    </Section>
  )
}
