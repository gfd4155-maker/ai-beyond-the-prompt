import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

interface Stage {
  id: string
  emoji: string
  label: string
  x: number
  confidence: number // 0~100, 높을수록 자신감/기대가 큼
  headline: string
  examples: string[]
}

const STAGES: Stage[] = [
  { id: 'wow', emoji: '😲', label: '놀라움', x: 10, confidence: 55, headline: '"와, 이게 된다고?"', examples: ['프롬프트 몇 줄로 코드가 뚝'] },
  {
    id: 'overconfidence',
    emoji: '🚀',
    label: '과신',
    x: 38,
    confidence: 92,
    headline: '"이제 AI면 다 되겠는데?"',
    examples: ['새 기능을 계속 요구', '"이것도 해줘, 저것도 해줘"'],
  },
  {
    id: 'frustration',
    emoji: '😩',
    label: '좌절',
    x: 66,
    confidence: 12,
    headline: '"왜 자꾸 오류가 나지?"',
    examples: ['수정하다 다른 기능이 망가짐', '같은 오류 메시지 반복'],
  },
  {
    id: 'maturity',
    emoji: '🧭',
    label: '성숙',
    x: 92,
    confidence: 68,
    headline: '"잘하는 일과 확인할 일을 구분하자"',
    examples: ['기능을 나누어 검증', '작은 단위로 안정화'],
  },
]

function toY(confidence: number) {
  return 92 - confidence * 0.75 // 여유 공간을 둔 변환
}

function segmentPath(a: Stage, b: Stage) {
  const ay = toY(a.confidence)
  const by = toY(b.confidence)
  const c1x = a.x + (b.x - a.x) / 3
  const c2x = a.x + (2 * (b.x - a.x)) / 3
  return `M ${a.x} ${ay} C ${c1x} ${ay}, ${c2x} ${by}, ${b.x} ${by}`
}

export function ConfidenceCurveVisual() {
  const [revealCount, setRevealCount] = useState(0) // 0~4

  const activeStage = revealCount > 0 ? STAGES[revealCount - 1] : null

  return (
    <div>
      <div className="h-[220px] sm:h-[260px]">
        <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="AI 활용 자신감 곡선">
          {/* 기준선 */}
          <line x1="2" y1="92" x2="98" y2="92" stroke="var(--border-subtle)" strokeWidth={0.6} />

          {STAGES.slice(0, -1).map((stage, i) => {
            const next = STAGES[i + 1]
            const shown = revealCount > i + 1
            return (
              <motion.path
                key={stage.id}
                d={segmentPath(stage, next)}
                fill="none"
                stroke="var(--accent-purple)"
                strokeWidth={1.6}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: shown ? 1 : 0, opacity: shown ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            )
          })}

          {STAGES.map((stage, i) => {
            const shown = revealCount > i
            const y = toY(stage.confidence)
            return (
              <g key={stage.id} opacity={shown ? 1 : 0} style={{ transition: 'opacity 0.3s' }}>
                <circle
                  cx={stage.x}
                  cy={y}
                  r={2.6}
                  fill={activeStage?.id === stage.id ? 'var(--accent-purple)' : 'var(--bg-surface)'}
                  stroke="var(--accent-purple)"
                  strokeWidth={1}
                />
                <text x={stage.x} y={y - 6} textAnchor="middle" fontSize={5.5}>
                  {stage.emoji}
                </text>
                <text x={stage.x} y={y + 9} textAnchor="middle" fontSize={3.4} fill="var(--text-secondary)" fontWeight={600}>
                  {stage.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setRevealCount((v) => Math.max(0, v - 1))}
          disabled={revealCount === 0}
          className="rounded-full p-2 disabled:opacity-30"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
          aria-label="이전 단계"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => setRevealCount((v) => Math.min(STAGES.length, v + 1))}
          disabled={revealCount === STAGES.length}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold disabled:opacity-40"
          style={{ background: 'var(--accent-purple)', color: '#0a0c12' }}
        >
          다음 단계 <ChevronRight size={15} />
        </button>
        <button
          type="button"
          onClick={() => setRevealCount(0)}
          className="rounded-full p-2"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
          aria-label="초기화"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="mt-4 min-h-[86px]">
        <AnimatePresence mode="wait">
          {activeStage ? (
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border p-3.5"
              style={{ borderColor: 'var(--accent-purple)', background: 'var(--accent-purple-soft)' }}
            >
              <p className="text-[13px] font-bold" style={{ color: 'var(--accent-purple)' }}>
                {activeStage.emoji} {activeStage.label} — {activeStage.headline}
              </p>
              <ul className="mt-1.5 space-y-0.5">
                {activeStage.examples.map((ex, i) => (
                  <li key={i} className="text-[12.5px]" style={{ color: 'var(--text-secondary)' }}>
                    · {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <p className="rounded-xl border p-3.5 text-center text-[13px]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
              "다음 단계"를 눌러 곡선을 하나씩 그려보세요.
            </p>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
        ※ 이 곡선은 경험을 쉽게 설명하기 위한 비유이며, 실증 연구에 근거한 보편적 학습 곡선이 아닙니다.
      </p>
    </div>
  )
}
