import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { L, Lang } from './data/content'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  /** Translate a bilingual value. */
  tr: (value: L) => string
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'nexus.lang'

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ru') return stored
  const nav = window.navigator.language?.toLowerCase() ?? ''
  return nav.startsWith('ru') ? 'ru' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((prev) => (prev === 'en' ? 'ru' : 'en')), [])
  const tr = useCallback((value: L) => value[lang], [lang])

  const value = useMemo<LangContextValue>(() => ({ lang, setLang, toggle, tr }), [lang, setLang, toggle, tr])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
