import { stack, ui } from '../data/content'
import { useLang } from '../i18n'
import { Reveal } from './ui'

export function Metrics() {
  const { tr } = useLang()

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pt-4 sm:px-8">
      <Reveal>
        <div className="panel grid grid-cols-2 divide-white/8 overflow-hidden sm:grid-cols-4 sm:divide-x">
          {ui.metrics.map((metric) => (
            <div key={metric.value} className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
                {metric.value}
              </div>
              <div className="mono-label mt-1.5">{tr(metric.label)}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6 flex items-center gap-4">
          <span className="mono-label hidden shrink-0 sm:block">{tr(ui.tickerLabel)}</span>
          <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track gap-2">
              {[...stack, ...stack].map((item, i) => (
                <span key={`${item}-${i}`} className="chip mr-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
