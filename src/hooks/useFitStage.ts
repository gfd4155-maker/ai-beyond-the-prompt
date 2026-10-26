import { useEffect, useRef, useState } from 'react'

interface FitStageOptions {
  /** 콘텐츠를 배치하는 고정 디자인 너비(px). 슬라이드 내부 레이아웃은 항상 이 너비를 기준으로 계산됩니다. */
  designWidth?: number
  /** 세로 방향도 가용 공간에 맞춰 줄이되, 이 값보다 더 확대하지는 않습니다(짧은 슬라이드가 과도하게 커지는 것 방지). */
  maxScale?: number
  enabled?: boolean
  /** false면 높이는 고려하지 않고 너비만 맞춥니다 — 내부 스크롤이 필요한 인터랙티브 임베드 슬라이드용. */
  fitHeight?: boolean
}

/**
 * 전체화면 프레젠테이션에서 슬라이드를 "고정 너비로 레이아웃 → 실측 높이 계산 → transform: scale()로
 * 가용 공간에 맞춤"하는 reveal.js류 패턴입니다. outer가 실제로 점유하는 크기를 스케일된 크기로 맞춰주므로
 * 부모의 flex 중앙정렬이 그대로 작동합니다.
 */
export function useFitStage({
  designWidth = 1280,
  maxScale = 1.4,
  enabled = true,
  fitHeight = true,
}: FitStageOptions = {}) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(720)

  useEffect(() => {
    if (!enabled) return

    function recompute() {
      const outer = outerRef.current
      const inner = innerRef.current
      if (!outer || !inner) return
      // clientWidth/clientHeight includes outer's own padding — subtract it so the
      // reservation box never exceeds the true content box (avoids spurious scrollbars).
      const cs = window.getComputedStyle(outer)
      const padX = Number.parseFloat(cs.paddingLeft || '0') + Number.parseFloat(cs.paddingRight || '0')
      const padY = Number.parseFloat(cs.paddingTop || '0') + Number.parseFloat(cs.paddingBottom || '0')
      const availW = outer.clientWidth - padX
      const availH = outer.clientHeight - padY
      const contentH = inner.scrollHeight || 1
      if (availW <= 0 || availH <= 0) return
      const widthScale = availW / designWidth
      const next = fitHeight ? Math.min(widthScale, availH / contentH, maxScale) : Math.min(widthScale, maxScale)
      setNaturalHeight(contentH)
      setScale(next > 0 ? next : 1)
    }

    recompute()
    const ro = new ResizeObserver(recompute)
    if (outerRef.current) ro.observe(outerRef.current)
    if (innerRef.current) ro.observe(innerRef.current)
    window.addEventListener('resize', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [designWidth, maxScale, enabled, fitHeight])

  return { outerRef, innerRef, scale, naturalHeight, designWidth }
}
