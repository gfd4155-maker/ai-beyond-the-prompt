import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

const STEPS = ['prompt', 'code', 'website'] as const
const STEP_LABELS: Record<(typeof STEPS)[number], string> = {
  prompt: '① 자연어로 요청',
  code: '② AI가 코드 생성',
  website: '③ 실제로 실행',
}

export function VibeCodingProcessVisual() {
  const [step, setStep] = useState(0)

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className="rounded-full px-3 py-1 text-[11px] font-semibold transition-colors"
            style={
              i === step
                ? { background: 'var(--accent-mint)', color: '#06241a' }
                : { background: 'var(--bg-surface-2)', color: 'var(--text-muted)' }
            }
          >
            {STEP_LABELS[s]}
          </span>
        ))}
      </div>

      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="prompt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mx-auto max-w-sm rounded-2xl border p-4" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  사용자 → AI
                </p>
                <div
                  className="mt-2 rounded-xl rounded-tl-none px-3.5 py-2.5 text-[14px]"
                  style={{ background: 'var(--accent-blue-soft)', color: 'var(--text-primary)' }}
                >
                  "타자연습 게임 만들어줘. 1분 동안 화면에 나오는 단어를 입력하면 점수가 올라가는 방식으로."
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="code" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div
                className="mx-auto max-w-sm rounded-2xl border p-4 font-mono text-[12px] leading-relaxed"
                style={{ borderColor: 'var(--border-subtle)', background: '#0d1016', color: '#d7dce3' }}
              >
                <p className="mb-2 text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  AI가 생성한 코드 (예시)
                </p>
                <p><span style={{ color: '#9d7bff' }}>function</span> <span style={{ color: '#4c8dff' }}>startTimer</span>() {'{'}</p>
                <p className="pl-3">
                  <span style={{ color: '#9d7bff' }}>let</span> seconds = <span style={{ color: '#36d6a3' }}>60</span>;
                </p>
                <p className="pl-3">
                  <span style={{ color: '#9d7bff' }}>let</span> score = <span style={{ color: '#36d6a3' }}>0</span>;
                </p>
                <p className="pl-3">// 1초마다 시간 감소...</p>
                <p>{'}'}</p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="website" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-strong)' }}>
                <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: 'var(--bg-surface-2)' }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent-rose)' }} />
                  <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent-amber)' }} />
                  <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent-mint)' }} />
                  <span className="ml-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    localhost — 타자연습
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 p-6" style={{ background: 'var(--bg-surface)' }}>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    남은 시간: 0:47
                  </p>
                  <p className="text-[20px] font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>
                    바이브코딩
                  </p>
                  <div
                    className="w-full rounded-lg border px-3 py-2 text-center text-[13px]"
                    style={{ borderColor: 'var(--accent-mint)', color: 'var(--text-secondary)' }}
                  >
                    입력창 (여기에 타이핑)
                  </div>
                  <p className="text-[11px]" style={{ color: 'var(--accent-mint)' }}>
                    점수: 12
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setStep((v) => Math.max(0, v - 1))}
          disabled={step === 0}
          className="rounded-full p-2 disabled:opacity-30"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
          aria-label="이전"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => setStep((v) => Math.min(STEPS.length - 1, v + 1))}
          disabled={step === STEPS.length - 1}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold disabled:opacity-40"
          style={{ background: 'var(--accent-mint)', color: '#06241a' }}
        >
          다음 <ChevronRight size={15} />
        </button>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="rounded-full p-2"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
          aria-label="처음부터"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <p className="mt-3 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
        ※ 코드와 실행 화면은 설명을 위한 예시이며, 실제 동작하는 제품 데모가 아닙니다.
      </p>
    </div>
  )
}
