import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ContentSlideView } from '../components/deck/ContentSlideView'
import { QuizSlideView } from '../components/deck/QuizSlideView'
import { SectionBreakView } from '../components/deck/SectionBreakView'
import { VerificationMiniView } from '../components/deck/VerificationMiniView'
import { TurtleSoupCompareView } from '../components/deck/TurtleSoupCompareView'
import { SECTION_LABELS, slides, totalSlides } from '../content/slides'

const INTERACTIVE_LINKS: Record<string, { to: string; label: string }> = {
  'chatbot-vs-agent': { to: '/chatbot-vs-agent', label: 'Chatbot vs AI Agent 체험하기' },
  'prompt-improvement': { to: '/prompt-improvement', label: '프롬프트 개선 시뮬레이터 체험하기' },
}

export function ReadingModePage() {
  const sectionHeaderFlags = slides.map((slide, i) => i === 0 || slide.section !== slides[i - 1].section)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-blue)' }}>
        읽기 모드 · 강의 종료 후 복습용
      </p>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">AI BEYOND THE PROMPT — 전체 강의 내용</h1>
      <p className="mt-2 text-[14px]" style={{ color: 'var(--text-secondary)' }}>
        {totalSlides}개 슬라이드를 위에서 아래로 스크롤하며 다시 읽을 수 있습니다. 발표 중 조작했던 인터랙티브 화면은 아래에서
        같은 상태로 다시 체험할 수 있는 링크로 연결됩니다.
      </p>

      <div className="mt-10 space-y-10">
        {slides.map((slide, i) => {
          const showSectionHeader = sectionHeaderFlags[i]
          return (
            <div key={slide.id}>
              {showSectionHeader && (
                <p
                  className="mb-5 border-t pt-6 text-[13px] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-purple)' }}
                >
                  {SECTION_LABELS[slide.section]}
                </p>
              )}

              {slide.kind === 'content' && <ContentSlideView slide={slide} mode="read" />}
              {slide.kind === 'quiz' && <QuizSlideView slide={slide} />}
              {slide.kind === 'section-break' && <SectionBreakView slide={slide} />}
              {slide.kind === 'verification-mini' && <VerificationMiniView slide={slide} />}
              {slide.kind === 'turtle-soup-compare' && <TurtleSoupCompareView slide={slide} />}
              {slide.kind === 'interactive-embed' && (
                <div className="mx-auto w-full max-w-3xl">
                  <h2 className="text-xl font-bold">{slide.title}</h2>
                  <p className="mt-1 text-[14px]" style={{ color: 'var(--accent-blue)' }}>
                    {slide.keyMessage}
                  </p>
                  <Link
                    to={INTERACTIVE_LINKS[slide.componentKey].to}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-semibold"
                    style={{ borderColor: 'var(--accent-mint)', color: 'var(--accent-mint)' }}
                  >
                    {INTERACTIVE_LINKS[slide.componentKey].label} <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
