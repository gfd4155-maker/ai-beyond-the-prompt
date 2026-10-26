import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  List,
  Maximize,
  Minimize,
  NotebookText,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { ControlBar, type ControlAction } from '../common/ControlBar'
import { SlideOverPanel } from '../common/SlideOverPanel'
import { SpeakerScriptPanel } from './SpeakerScriptPanel'
import { useFullscreen } from '../../hooks/useFullscreen'
import { useFitStage } from '../../hooks/useFitStage'
import { useFontScale } from '../../hooks/useFontScale'
import { SECTION_LABELS, slides, totalSlides, type Slide } from '../../content/slides'
import { ChatbotVsAgentScreen } from '../../features/chatbot-vs-agent/ChatbotVsAgentScreen'
import { PromptImprovementScreen } from '../../features/prompt-improvement/PromptImprovementScreen'
import { ContentSlideView } from './ContentSlideView'
import { QuizSlideView } from './QuizSlideView'
import { SectionBreakView } from './SectionBreakView'
import { VerificationMiniView } from './VerificationMiniView'
import { TurtleSoupCompareView } from './TurtleSoupCompareView'

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

/** 현재 슬라이드 kind에 맞는 뷰를 고르는 공용 렌더러 — 일반 모드/전체화면 모드가 동일하게 사용합니다. */
function SlideContent({ slide, edgeToEdge = true }: { slide: Slide; edgeToEdge?: boolean }) {
  return (
    <>
      {slide.kind === 'content' && <ContentSlideView slide={slide} />}
      {slide.kind === 'quiz' && <QuizSlideView slide={slide} />}
      {slide.kind === 'section-break' && <SectionBreakView slide={slide} />}
      {slide.kind === 'verification-mini' && <VerificationMiniView slide={slide} />}
      {slide.kind === 'turtle-soup-compare' && <TurtleSoupCompareView slide={slide} />}
      {slide.kind === 'interactive-embed' && (
        <div className={edgeToEdge ? 'mx-auto -mx-4 -my-8 max-w-none sm:-mx-8 sm:-my-12' : 'mx-auto max-w-none'}>
          {slide.componentKey === 'chatbot-vs-agent' && <ChatbotVsAgentScreen />}
          {slide.componentKey === 'prompt-improvement' && <PromptImprovementScreen />}
        </div>
      )}
    </>
  )
}

export function SlideDeckPage() {
  const { index } = useParams<{ index: string }>()
  const navigate = useNavigate()
  const [tocOpen, setTocOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const { ref: fsRef, isFullscreen, toggle: toggleFullscreen } = useFullscreen<HTMLDivElement>()

  const currentIndex = clamp(Number.parseInt(index ?? '1', 10) || 1, 1, totalSlides)
  const slide = slides[currentIndex - 1]
  const isFirst = currentIndex === 1
  const isLast = currentIndex === totalSlides
  const isEmbed = slide.kind === 'interactive-embed'

  const { outerRef: stageOuterRef, innerRef: stageInnerRef, scale: stageScale, naturalHeight: stageHeight, designWidth } = useFitStage({
    enabled: isFullscreen,
    fitHeight: !isEmbed,
  })
  const fontScale = useFontScale()

  useEffect(() => {
    if (String(currentIndex) !== index) navigate(`/deck/${currentIndex}`, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function goTo(n: number) {
    navigate(`/deck/${clamp(n, 1, totalSlides)}`)
    setTocOpen(false)
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && !isLast) goTo(currentIndex + 1)
      else if (e.key === 'ArrowLeft' && !isFirst) goTo(currentIndex - 1)
      else if (e.key === 'Escape') {
        setTocOpen(false)
        setNotesOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isFirst, isLast])

  const progressPct = Math.round((currentIndex / totalSlides) * 100)

  const actions: ControlAction[] = useMemo(
    () => [
      { key: 'prev', label: '이전 슬라이드', icon: <ChevronLeft size={16} />, onClick: () => goTo(currentIndex - 1), disabled: isFirst },
      { key: 'next', label: '다음 슬라이드', icon: <ChevronRight size={16} />, onClick: () => goTo(currentIndex + 1), disabled: isLast },
      { key: 'toc', label: '목차', icon: <List size={16} />, onClick: () => setTocOpen((v) => !v), active: tocOpen },
      { key: 'notes', label: '발표자 노트', icon: <NotebookText size={16} />, onClick: () => setNotesOpen((v) => !v), active: notesOpen },
      {
        key: 'font-dec',
        label: `글자 작게 (${fontScale.percent}%)`,
        icon: <ZoomOut size={16} />,
        onClick: fontScale.decrease,
        disabled: !fontScale.canDecrease,
      },
      {
        key: 'font-inc',
        label: `글자 크게 (${fontScale.percent}%)`,
        icon: <ZoomIn size={16} />,
        onClick: fontScale.increase,
        disabled: !fontScale.canIncrease,
      },
      {
        key: 'fullscreen',
        label: isFullscreen ? '전체화면 종료' : '전체화면',
        icon: isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />,
        onClick: toggleFullscreen,
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [currentIndex, isFirst, isLast, tocOpen, notesOpen, isFullscreen, fontScale.percent],
  )

  return (
    <div ref={fsRef} className="flex min-h-full flex-col" style={{ background: 'var(--bg-base)' }}>
      <div className="border-b px-4 py-3 sm:px-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <p className="text-[12px] font-semibold" style={{ color: 'var(--accent-purple)' }}>
            {SECTION_LABELS[slide.section]}
          </p>
          <p className="text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>
            {currentIndex} / {totalSlides} · {slide.minutes}분
          </p>
        </div>
        <div className="mx-auto mt-2 h-1 max-w-5xl overflow-hidden rounded-full" style={{ background: 'var(--border-subtle)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: 'var(--accent-blue)' }} />
        </div>
      </div>

      {isFullscreen ? (
        <main
          ref={stageOuterRef}
          className={
            isEmbed
              ? 'flex min-h-0 flex-1 justify-center overflow-y-auto px-4 py-4 sm:px-8'
              : 'flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-4 sm:px-8'
          }
        >
          <div
            style={{
              width: designWidth * stageScale * fontScale.scale,
              height: stageHeight * stageScale * fontScale.scale,
              position: 'relative',
            }}
          >
            <div
              ref={stageInnerRef}
              style={{
                width: designWidth,
                transform: `scale(${stageScale * fontScale.scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <SlideContent slide={slide} edgeToEdge={false} />
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 sm:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ transform: `scale(${fontScale.scale})`, transformOrigin: 'top center' }}>
                <SlideContent slide={slide} />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      <div className="border-t px-4 py-3 sm:px-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto max-w-5xl">
          {slide.speakerScript ? (
            <SpeakerScriptPanel open={notesOpen} script={slide.speakerScript} />
          ) : (
            <SlideOverPanel open={notesOpen} onClose={() => setNotesOpen(false)} title="발표자 노트" accent="var(--accent-blue)">
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {slide.title.replace(/\n/g, ' ')} · 권장 {slide.minutes}분
              </p>
              <p className="mt-1">{slide.presenterScript}</p>
            </SlideOverPanel>
          )}
          <div className={notesOpen ? 'mt-3' : ''}>
            <ControlBar actions={actions} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {tocOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setTocOpen(false)}
          >
            <motion.div
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              exit={{ x: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-full max-w-sm overflow-y-auto border-l p-5"
              style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-surface-3)' }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[14px] font-bold">강의 목차</p>
                <button type="button" onClick={() => setTocOpen(false)} style={{ color: 'var(--text-muted)' }}>
                  <X size={18} />
                </button>
              </div>
              {(Object.keys(SECTION_LABELS) as Array<keyof typeof SECTION_LABELS>).map((sec) => (
                <div key={sec} className="mb-4">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-purple)' }}>
                    {SECTION_LABELS[sec]}
                  </p>
                  {slides
                    .map((s, i) => ({ s, i }))
                    .filter(({ s }) => s.section === sec)
                    .map(({ s, i }) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => goTo(i + 1)}
                        className="mb-1 flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors"
                        style={{
                          background: i + 1 === currentIndex ? 'var(--accent-blue-soft)' : 'transparent',
                          color: i + 1 === currentIndex ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        }}
                      >
                        <span>{s.title}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{s.minutes}분</span>
                      </button>
                    ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

