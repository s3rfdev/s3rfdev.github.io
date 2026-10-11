import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Metrics } from './components/Metrics'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Stock } from './components/Stock'
import { Work } from './components/Work'
import { LangProvider } from './i18n'

export default function App() {
  return (
    <LangProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* ambience */}
        <div className="grid-backdrop" />
        <div
          className="glow-orb h-[420px] w-[420px] -left-40 -top-40"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.5), transparent 65%)' }}
        />
        <div
          className="glow-orb h-[520px] w-[520px] right-[-180px] top-[620px]"
          style={{ background: 'radial-gradient(circle, rgba(86,217,254,0.34), transparent 65%)' }}
        />
        <div
          className="glow-orb h-[460px] w-[460px] left-[-160px] top-[2200px]"
          style={{ background: 'radial-gradient(circle, rgba(244,113,181,0.22), transparent 65%)' }}
        />

        <Nav />
        <main>
          <Hero />
          <Metrics />
          <Capabilities />
          <Services />
          <Work />
          <Stock />
          <Process />
          <Faq />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}
