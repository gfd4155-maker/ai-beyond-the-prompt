import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Columns2,
  Lightbulb,
  Maximize,
  Minimize,
  NotebookText,
  Pause,
  Play,
  RotateCcw,
  TriangleAlert,
} from 'lucide-react'
import { ControlBar, type ControlAction } from '../../components/common/ControlBar'
import { SlideOverPanel } from '../../components/common/SlideOverPanel'
import { FlowStage } from '../../components/flow/FlowStage'
import { GlossaryFootnotePanel } from '../../components/glossary/GlossaryFootnotePanel'
import { GlossaryTerm } from '../../components/glossary/GlossaryTerm'
import { useFullscreen } from '../../hooks/useFullscreen'
import { CONCEPTUAL_DISCLAIMER, STEP_COUNT, TASK_DESCRIPTION, agentFlow, chatbotFlow } from './data'

type Mode = 'chatbot' | 'agent'
type ViewMode = 'single' | 'compare'

const AUTOPLAY_INTERVAL = 2200

export function ChatbotVsAgentScreen() {
  const [mode, setMode] = useState<Mode>('chatbot')
  const [viewMode, setViewMode] = useState<ViewMode>('single')
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [insightForced, setInsightForced] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: fsRef, isFullscreen, toggle: toggleFullscreen } = useFullscreen<HTMLDivElement>()

  const flow = mode === 'chatbot' ? chatbotFlow : agentFlow
  const isLastStep = step === STEP_COUNT - 1
  const showInsight = insightForced || isLastStep

  useEffect(() => {
    if (!playing) return
    if (step >= STEP_COUNT - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, STEP_COUNT - 1)), AUTOPLAY_INTERVAL)
    return () => clearTimeout(t)
  }, [playing, step])

  function goNext() {
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1))
  }
  function goPrev() {
    setStep((s) => Math.max(s - 1, 0))
  }
  function reset() {
    setStep(0)
    setPlaying(false)
    setInsightForced(false)
  }
  function switchMode(next: Mode) {
    setMode(next)
    setStep(0)
    setPlaying(false)
    setInsightForced(false)
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
    { key: 'next', label: '다음 단계', icon: <ChevronRight size={16} />, onClick: goNext, disabled: viewMode !== 'single' || isLastStep },
    {
      key: 'play',
      label: playing ? '일시 정지' : '자동 재생',
      icon: playing ? <Pause size={16} /> : <Play size={16} />,
      onClick: () => setPlaying((p) => !p),
      disabled: viewMode !== 'single' || isLastStep,
      active: playing,
    },
    { key: 'reset', label: '초기화', icon: <RotateCcw size={16} />, onClick: reset },
    {
      key: 'compare',
      label: viewMode === 'single' ? '전체 과정 비교' : '단일 보기',
      icon: <Columns2 size={16} />,
      onClick: () => setViewMode((v) => (v === 'single' ? 'compare' : 'single')),
      active: viewMode === 'compare',
    },
    {
      key: 'insight',
      label: '특징·한계 보기',
      icon: <Lightbulb size={16} />,
      onClick: () => setInsightForced((v) => !v),
      active: showInsight,
      disabled: viewMode !== 'single',
    },
    {
      key: 'notes',
      label: '발표자 노트',
      icon: <NotebookText size={16} />,
      onClick: () => setNotesOpen((v) => !v),
      active: notesOpen,
    },
    {
      key: 'fullscreen',
      label: isFullscreen ? '전체화면 종료' : '전체화면',
      icon: isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />,
      onClick: toggleFullscreen,
    },
  ]

  return (
    <div
      ref={fsRef}
      className="min-h-full p-4 sm:p-8"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="mx-auto max-w-6xl outline-none"
      >
        <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-purple)' }}>
          ChatGPT를 넘어 AI Agent로 · INT-03
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Chatbot vs <GlossaryTerm id="agent">AI Agent</GlossaryTerm>
        </h1>
        <p className="mt-2 max-w-3xl text-[15px]" style={{ color: 'var(--text-secondary)' }}>
          같은 업무 목표, 서로 다른 처리 방식을 단계별로 비교합니다. 이 과정을{' '}
          <GlossaryTerm id="workflow">Workflow</GlossaryTerm>라고 부릅니다.
        </p>

        <div
          className="mt-4 flex items-start gap-2 rounded-xl border p-3 text-[13px]"
          style={{ borderColor: 'var(--accent-amber)', background: 'rgba(245,184,92,0.08)', color: 'var(--accent-amber)' }}
        >
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <span>{CONCEPTUAL_DISCLAIMER} 실시간 AI 연산이 아닌, 사전 제작된 시나리오입니다.</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-full border p-1" style={{ borderColor: 'var(--border-subtle)' }}>
            {(['chatbot', 'agent'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                disabled={viewMode === 'compare'}
                className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                style={
                  mode === m
                    ? { background: 'var(--accent-blue)', color: '#0a0c12' }
                    : { background: 'transparent', color: 'var(--text-secondary)' }
                }
              >
                {m === 'chatbot' ? 'Chatbot 모드' : 'AI Agent 모드'}
              </button>
            ))}
          </div>

          <div
            className="rounded-full border px-4 py-1.5 text-[13px] font-medium"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
          >
            업무: <span style={{ color: 'var(--text-primary)' }}>{TASK_DESCRIPTION}</span>
          </div>
        </div>

        {viewMode === 'single' ? (
          <SingleView flowKey={mode} step={step} />
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <CompareColumn title="Chatbot 모드" markerKey="chatbot" flow={chatbotFlow} />
            <CompareColumn title="AI Agent 모드" markerKey="agent" flow={agentFlow} />
          </div>
        )}

        {viewMode === 'single' && (
          <AnimatedInsight show={showInsight} title={flow.limitations.title} points={flow.limitations.points} />
        )}

        <div className="mt-6">
          <ControlBar actions={actions} />
        </div>

        <SlideOverPanel open={notesOpen} onClose={() => setNotesOpen(false)} title="발표자 노트" accent="var(--accent-blue)">
          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {mode === 'chatbot' ? 'Chatbot 모드' : 'AI Agent 모드'} · {step + 1}/{STEP_COUNT}단계
          </p>
          <p className="mt-1">{flow.captions[step]}</p>
          <p className="mt-2" style={{ color: 'var(--accent-mint)' }}>
            진행 멘트: {flow.presenterCues[step]}
          </p>
        </SlideOverPanel>

        <GlossaryFootnotePanel termIds={['agent', 'workflow']} />
      </div>
    </div>
  )
}

function SingleView({ flowKey, step }: { flowKey: Mode; step: number }) {
  const flow = flowKey === 'chatbot' ? chatbotFlow : agentFlow
  return (
    <div className="mt-6 rounded-2xl border p-4 sm:p-6" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
      <div className="mb-4 flex items-center justify-center gap-2">
        {Array.from({ length: STEP_COUNT }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-10 rounded-full transition-colors"
            style={{ background: i <= step ? 'var(--accent-blue)' : 'var(--border-subtle)' }}
          />
        ))}
      </div>
      <div className="h-[340px] sm:h-[420px]">
        <FlowStage nodes={flow.nodes} edges={flow.edges} step={step} markerId={`arrow-${flowKey}`} />
      </div>
      <p className="mt-4 text-center text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>
        {flow.captions[step]}
      </p>
    </div>
  )
}

function CompareColumn({
  title,
  markerKey,
  flow,
}: {
  title: string
  markerKey: string
  flow: typeof chatbotFlow | typeof agentFlow
}) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
      <p className="text-center text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </p>
      <div className="mt-3 h-[300px]">
        <FlowStage nodes={flow.nodes} edges={flow.edges} step={99} markerId={`arrow-compare-${markerKey}`} />
      </div>
      <div className="mt-4 space-y-1.5 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-[12px] font-bold" style={{ color: 'var(--accent-purple)' }}>
          {flow.limitations.title}
        </p>
        {flow.limitations.points.map((p, i) => (
          <p key={i} className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            • {p}
          </p>
        ))}
      </div>
    </div>
  )
}

function AnimatedInsight({ show, title, points }: { show: boolean; title: string; points: string[] }) {
  if (!show) return null
  return (
    <div
      className="mt-5 rounded-2xl border p-4 sm:p-5"
      style={{ borderColor: 'var(--accent-purple)', background: 'var(--accent-purple-soft)' }}
    >
      <p className="text-[13px] font-bold" style={{ color: 'var(--accent-purple)' }}>
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            • {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
