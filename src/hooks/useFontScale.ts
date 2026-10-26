import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ai-beyond-the-prompt:deck-font-scale'

/** 발표 덱 화면에서만 쓰는 글씨 크기 단계 — 90%(작게) ~ 145%(최대), 기본 100%. */
const SCALE_STEPS = [0.9, 1, 1.15, 1.3, 1.45]
const DEFAULT_INDEX = 1

export function useFontScale() {
  const [index, setIndex] = useState(DEFAULT_INDEX)

  useEffect(() => {
    try {
      const saved = Number.parseInt(window.localStorage.getItem(STORAGE_KEY) ?? '', 10)
      if (!Number.isNaN(saved) && saved >= 0 && saved < SCALE_STEPS.length) setIndex(saved)
    } catch {
      // 저장소 접근 불가 시 기본값(100%) 유지
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(index))
    } catch {
      // 저장 실패는 무시 — 이번 세션 동안만 유지
    }
  }, [index])

  return useMemo(
    () => ({
      scale: SCALE_STEPS[index],
      percent: Math.round(SCALE_STEPS[index] * 100),
      canIncrease: index < SCALE_STEPS.length - 1,
      canDecrease: index > 0,
      increase: () => setIndex((i) => Math.min(i + 1, SCALE_STEPS.length - 1)),
      decrease: () => setIndex((i) => Math.max(i - 1, 0)),
    }),
    [index],
  )
}
