import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface GlossaryContextValue {
  enabled: boolean
  toggle: () => void
}

const STORAGE_KEY = 'ai-beyond-the-prompt:glossary-mode'

const GlossaryContext = createContext<GlossaryContextValue | null>(null)

export function GlossaryProvider({ children }: { children: ReactNode }) {
  // 기본값은 OFF. 발표자가 한 번 켠 설정은 다음 화면/재방문에도 유지합니다.
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    try {
      setEnabled(window.localStorage.getItem(STORAGE_KEY) === 'on')
    } catch {
      // 비공개 브라우징 등 스토리지 접근 불가 시 기본값(OFF) 유지
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
    } catch {
      // 저장 실패는 무시 — 이번 세션 동안만 상태 유지
    }
  }, [enabled])

  const value = useMemo<GlossaryContextValue>(
    () => ({ enabled, toggle: () => setEnabled((v) => !v) }),
    [enabled],
  )

  return <GlossaryContext.Provider value={value}>{children}</GlossaryContext.Provider>
}

export function useGlossary() {
  const ctx = useContext(GlossaryContext)
  if (!ctx) throw new Error('useGlossary는 GlossaryProvider 내부에서만 사용할 수 있습니다.')
  return ctx
}
