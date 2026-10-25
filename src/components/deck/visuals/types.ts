export interface ResultItem {
  id: string
  name: string
  icon: string
  /** 실제 데모 주소 — 준비되면 채워 넣습니다. 없으면 "준비 중" 배지를 보여줍니다. */
  demoUrl?: string
}

export type SlideVisual =
  | { kind: 'timeline'; items: { year: string; label: string }[] }
  | { kind: 'concentric'; items: { label: string; detail: string }[] } // 바깥 → 안쪽 순서
  | { kind: 'chart-bar'; items: { label: string; value: number }[]; caption: string; tone?: 'warning' | 'source' }
  | { kind: 'icon-grid'; items: { icon: string; label: string }[] }
  | { kind: 'compare'; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { kind: 'flow-row'; items: string[] }
  | { kind: 'gauge'; label: string; filledPct: number; caption: string }
  | { kind: 'checklist'; items: string[] }
  | { kind: 'warning-list'; items: string[] }
  | {
      kind: 'gantt-mini'
      rows: { label: string; startPct: number; widthPct: number; conflict?: boolean }[]
      caption: string
    }
  | { kind: 'results-gallery'; items: ResultItem[] }
  | { kind: 'confidence-curve' }
  | { kind: 'vibe-coding-process' }
