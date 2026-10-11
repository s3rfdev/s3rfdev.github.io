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

/**
 * Intelligent language detection:
 * 1. Checks user's manual preference (localStorage).
 * 2. Checks full list of installed keyboard/browser languages (`navigator.languages`).
 *    If Russian ('ru') is present anywhere in their preferred languages -> 'ru'.
 * 3. Checks geographic timezone fallback (Russian timezones).
 * 4. Default for all international visitors (Spain, USA, Europe, etc.) -> 'en'.
 */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en'

  // 1. Saved manual preference has highest priority
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ru') return stored
  } catch {
    // localStorage might be unavailable in private mode
  }

  // 2. Check full list of user's keyboard and browser locales (navigator.languages)
  try {
    const userLangs: string[] =
      window.navigator.languages && window.navigator.languages.length > 0
        ? Array.from(window.navigator.languages)
        : [window.navigator.language]

    const hasRussian = userLangs.some((langCode) => {
      if (!langCode) return false
      const clean = langCode.toLowerCase().trim()
      return clean.startsWith('ru') || clean === 'rus'
    })

    if (hasRussian) return 'ru'
  } catch {
    // fallback if navigator.languages is restricted
  }

  // 3. Fallback: check timezone for Russian regions
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone?.toLowerCase() ?? ''
    const ruTimezones = [
      'europe/moscow',
      'europe/kaliningrad',
      'europe/samara',
      'asia/yekaterinburg',
      'asia/omsk',
      'asia/novosibirsk',
      'asia/barnaul',
      'asia/tomsk',
      'asia/novokuznetsk',
      'asia/krasnoyarsk',
      'asia/irkutsk',
      'asia/chita',
      'asia/yakutsk',
      'asia/vladivostok',
      'asia/magadan',
      'asia/sakhalin',
      'asia/kamchatka',
      'asia/anadyr',
    ]
    if (ruTimezones.some((zone) => tz === zone || tz.startsWith(zone))) {
      return 'ru'
    }
  } catch {
    // ignore
  }

  // 4. Default: English for all international traffic
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
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
