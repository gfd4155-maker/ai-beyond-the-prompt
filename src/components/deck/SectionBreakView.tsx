import { Link } from 'react-router-dom'
import { ArrowRight, Hourglass, Lock } from 'lucide-react'
import type { SectionBreakSlide } from '../../content/slides'

const LINKS: Record<string, { to?: string; note: string }> = {
  'A. 나의 AI 활용 스타일 찾기': { note: '설계 완료 · 구현 예정' },
  'B. 프롬프트 업그레이드 챌린지 (지금 보고 있는 "프롬프트 개선 시뮬레이터")': { to: '/prompt-improvement', note: '지금 바로 체험 가능' },
  'C. AI Agent 업무 시뮬레이터 (지금 보고 있는 "Chatbot vs AI Agent")': { to: '/chatbot-vs-agent', note: '지금 바로 체험 가능' },
}

export function SectionBreakView({ slide }: { slide: SectionBreakSlide }) {
  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: 'var(--accent-purple-soft)', color: 'var(--accent-purple)' }}
      >
        <Hourglass size={22} />
      </div>
      <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{slide.title}</h1>
      <p className="mt-2 text-[15px]" style={{ color: 'var(--text-secondary)' }}>
        {slide.keyMessage}
      </p>

      <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
        {slide.bullets.map((b) => {
          const link = LINKS[b]
          const content = (
            <>
              <p className="text-[13px] font-semibold leading-snug">{b}</p>
              <p
                className="mt-2 flex items-center gap-1 text-[12px]"
                style={{ color: link?.to ? 'var(--accent-mint)' : 'var(--text-muted)' }}
              >
                {link?.to ? (
                  <>
                    체험하기 <ArrowRight size={12} />
                  </>
                ) : (
                  <>
                    <Lock size={11} /> {link?.note}
                  </>
                )}
              </p>
            </>
          )
          return link?.to ? (
            <Link
              key={b}
              to={link.to}
              className="rounded-xl border p-4 transition-colors"
              style={{ borderColor: 'var(--accent-mint)', background: 'var(--bg-surface)' }}
            >
              {content}
            </Link>
          ) : (
            <div key={b} className="rounded-xl border p-4" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
