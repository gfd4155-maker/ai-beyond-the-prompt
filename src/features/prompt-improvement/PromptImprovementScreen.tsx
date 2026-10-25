import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Lightbulb,
  Maximize,
  Minimize,
  NotebookText,
  RotateCcw,
  TriangleAlert,
} from 'lucide-react'
import { ControlBar, type ControlAction } from '../../components/common/ControlBar'
import { SlideOverPanel } from '../../components/common/SlideOverPanel'
import { GlossaryFootnotePanel } from '../../components/glossary/GlossaryFootnotePanel'
import { GlossaryTerm } from '../../components/glossary/GlossaryTerm'
import { useFullscreen } from '../../hooks/useFullscreen'
import {
  BASE_OUTPUT,
  BASE_PROMPT,
  STEP_COUNT,
  explanationAt,
  keyPointAt,
  outputAt,
  promptSteps,
  promptTextAt,
} from './data'

type ViewMode = 'single' | 'compare'

export function PromptImprovementScreen() {
  const [step, setStep] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('single')
  const [notesOpen, setNotesOpen] = useState(false)
  const [keyPointOpen, setKeyPointOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: fsRef, isFullscreen, toggle: toggleFullscreen } = useFullscreen<HTMLDivElement>()

  const isLast = step === STEP_COUNT - 1

  function goNext() {
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1))
  }
  function goPrev() {
    setStep((s) => Math.max(s - 1, 0))
  }
  function reset() {
    setStep(0)
    setKeyPointOpen(false)
  }

  function handleKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
    if (viewMode !== 'single') return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      e.stopPropagation() // 발표 덱에 임베드됐을 때 슬라이드 이동과 충돌하지 않도록 차단
      goNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      e.stopPropagation()
      goPrev()
    }
  }

  const actions: ControlAction[] = [
    { key: 'prev', label: '이전 단계', icon: <ChevronLeft size={16} />, onClick: goPrev, disabled: viewMode !== 'single' || step === 0 },
    { key: 'next', label: '다음 단계', icon: <ChevronRight size={16} />, onClick: goNext, disabled: viewMode !== 'single' || isLast },
    { key: 'reset', label: '초기화', icon: <RotateCcw size={16} />, onClick: reset },
    {
      key: 'compare',
      label: viewMode === 'single' ? '처음 vs 최종 비교' : '단일 보기',
      icon: <Columns2 size={16} />,
      onClick: () => setViewMode((v) => (v === 'single' ? 'compare' : 'single')),
      active: viewMode === 'compare',
    },
    {
      key: 'keypoint',
      label: '핵심 포인트',
      icon: <Lightbulb size={16} />,
      onClick: () => setKeyPointOpen((v) => !v),
      active: keyPointOpen,
      disabled: viewMode !== 'single',
    },
    { key: 'notes', label: '발표자 노트', icon: <NotebookText size={16} />, onClick: () => setNotesOpen((v) => !v), active: notesOpen },
    {
      key: 'fullscreen',
      label: isFullscreen ? '전체화면 종료' : '전체화면',
      icon: isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />,
      onClick: toggleFullscreen,
    },
  ]

  return (
    <div ref={fsRef} className="min-h-full p-4 sm:p-8" style={{ background: 'var(--bg-base)' }}>
      <div ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown} className="mx-auto max-w-6xl outline-none">
        <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-mint)' }}>
          AI도 일을 제대로 시키는 사람이 따로 있다 · INT-06
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">프롬프트, 이렇게 좋아집니다</h1>
        <p className="mt-2 max-w-3xl text-[15px]" style={{ color: 'var(--text-secondary)' }}>
          같은 요청도 <GlossaryTerm id="prompt">프롬프트</GlossaryTerm>에 요소를 하나씩 더하면 결과가 달라집니다. 좋은
          프롬프트는 <GlossaryTerm id="hallucination">할루시네이션</GlossaryTerm> 위험을 줄이는 데도 도움이 됩니다.
        </p>

        <div
          className="mt-4 flex items-start gap-2 rounded-xl border p-3 text-[13px]"
          style={{ borderColor: 'var(--accent-amber)', background: 'rgba(245,184,92,0.08)', color: 'var(--accent-amber)' }}
        >
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <span>모든 예시 결과물은 사전 작성된 교육용 샘플입니다. 실시간 AI가 생성한 결과가 아닙니다.</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {promptSteps.map((opt, i) => {
            const included = i < step
            return (
              <button
                key={opt.id}
                type="button"
                disabled={viewMode !== 'single'}
                onClick={() => setStep(i + 1)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                style={
                  included
                    ? { borderColor: 'var(--accent-mint)', background: 'var(--accent-mint-soft)', color: 'var(--accent-mint)' }
                    : { borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }
                }
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full border"
                  style={{ borderColor: included ? 'var(--accent-mint)' : 'var(--border-strong)' }}
                >
                  {included && <Check size={11} />}
                </span>
                {i + 1}. {opt.label}
              </button>
            )
          })}
        </div>

        {viewMode === 'single' ? (
          <>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <PromptEditorPane step={step} />
              <OutputPreviewPane step={step} />
            </div>
            <ExplanationPane step={step} />
            {keyPointOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border p-4"
                style={{ borderColor: 'var(--accent-purple)', background: 'var(--accent-purple-soft)' }}
              >
                <p className="text-[13px] font-bold" style={{ color: 'var(--accent-purple)' }}>
                  핵심 포인트
                </p>
                <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  {keyPointAt(step)}
                </p>
              </motion.div>
            )}
          </>
        ) : (
          <CompareView />
        )}

        <div className="mt-6">
          <ControlBar actions={actions} />
        </div>

        <SlideOverPanel open={notesOpen} onClose={() => setNotesOpen(false)} title="발표자 노트" accent="var(--accent-mint)">
          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {step}/{STEP_COUNT - 1}개 요소 적용됨
          </p>
          <p className="mt-1">{explanationAt(step)}</p>
          <p className="mt-2" style={{ color: 'var(--accent-mint)' }}>
            진행 멘트: "다음에 어떤 요소를 더하면 좋을지 참석자에게 먼저 물어보세요."
          </p>
        </SlideOverPanel>

        <GlossaryFootnotePanel termIds={['prompt', 'hallucination']} />
      </div>
    </div>
  )
}

function PromptEditorPane({ step }: { step: number }) {
  return (
    <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        프롬프트 편집 영역
      </p>
      <div className="mt-3 space-y-2">
        <p className="rounded-lg border p-2.5 text-[13px]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
          {BASE_PROMPT}
        </p>
        <AnimatePresence initial={false}>
          {promptSteps.slice(0, step).map((opt, i) => {
            const isNewest = i === step - 1
            return (
              <motion.p
                key={opt.id}
                initial={{ opacity: 0, x: -8, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border p-2.5 text-[13px]"
                style={{
                  borderColor: isNewest ? 'var(--accent-mint)' : 'var(--border-subtle)',
                  background: isNewest ? 'var(--accent-mint-soft)' : 'transparent',
                  color: 'var(--text-primary)',
                }}
              >
                {opt.clause}
              </motion.p>
            )
          })}
        </AnimatePresence>
      </div>
      {step === 0 && (
        <p className="mt-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>
          위 체크리스트에서 요소를 추가해보세요.
        </p>
      )}
    </div>
  )
}

function OutputPreviewPane({ step }: { step: number }) {
  return (
    <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        예시 결과 미리보기 (사전 작성 샘플)
      </p>
      <AnimatePresence mode="wait">
        <motion.pre
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 whitespace-pre-wrap rounded-lg border p-3 text-[13px] leading-relaxed"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)', fontFamily: 'inherit' }}
        >
          {outputAt(step)}
        </motion.pre>
      </AnimatePresence>
    </div>
  )
}

function ExplanationPane({ step }: { step: number }) {
  return (
    <div className="mt-5 rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'var(--accent-blue)', background: 'var(--accent-blue-soft)' }}>
      <p className="text-[13px] font-bold" style={{ color: 'var(--accent-blue)' }}>
        개선 포인트 해설
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {explanationAt(step)}
      </p>
    </div>
  )
}

function CompareView() {
  const finalStep = STEP_COUNT - 1
  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      {[0, finalStep].map((s) => (
        <div
          key={s}
          className="rounded-2xl border p-4 sm:p-5"
          style={{ borderColor: s === 0 ? 'var(--border-subtle)' : 'var(--accent-mint)', background: 'var(--bg-surface)' }}
        >
          <p
            className="text-[12px] font-bold uppercase tracking-wide"
            style={{ color: s === 0 ? 'var(--text-muted)' : 'var(--accent-mint)' }}
          >
            {s === 0 ? '처음 (요소 없음)' : '최종 (요소 6개 모두 적용)'}
          </p>
          <p className="mt-3 whitespace-pre-wrap rounded-lg border p-3 text-[12px]" style={{ borderColor: 'var(--border-subtle)' }}>
            {promptTextAt(s)}
          </p>
          <p className="mt-3 whitespace-pre-wrap rounded-lg border p-3 text-[12px] leading-relaxed" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
            {s === 0 ? BASE_OUTPUT : outputAt(finalStep)}
          </p>
        </div>
      ))}
      <div className="rounded-2xl border p-4 sm:p-5 lg:col-span-2" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface-2)' }}>
        <p className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
          무엇이 달라졌나요?
        </p>
        <ul className="mt-2 space-y-1">
          {promptSteps.map((opt) => (
            <li key={opt.id} className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
              • <span style={{ color: 'var(--accent-mint)' }}>{opt.label}</span> — {opt.keyPoint}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
