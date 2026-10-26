import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, MessageSquareText, Play, SlidersHorizontal, Sparkles } from 'lucide-react'
import { GlossaryTerm } from '../components/glossary/GlossaryTerm'
import { totalSlides } from '../content/slides'

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
      <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-blue)' }}>
        2026 AI Insight Workshop · 경험담 중심 특강
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
        AI BEYOND THE PROMPT
        <br />
        <span style={{ color: 'var(--text-secondary)' }}>질문하는 AI에서 일하는 AI로</span>
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        반도체·제조업 임직원을 위한 약 150분(거북이스프 실습 포함) 워크숍입니다. <GlossaryTerm id="agent">AI Agent</GlossaryTerm>와 바이브 코딩을
        직접 써본 발표자의 경험담과 시행착오를 중심으로, 화면은 핵심 메시지만 크게 보여주고 자세한 설명은 발표자
        대본에 담았습니다. 상단 우측의 <strong>용어 도움말</strong>을 켜면 전문 용어 설명을 바로 확인할 수 있습니다.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/deck/1"
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold"
          style={{ background: 'var(--accent-blue)', color: '#0a0c12' }}
        >
          <Play size={15} /> 발표 시작 (화면 1/{totalSlides})
        </Link>
        <Link
          to="/read"
          className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-semibold"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
        >
          <BookOpen size={15} /> 읽기 모드로 전체 내용 보기
        </Link>
      </div>

      <div
        className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px]"
        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
      >
        <Sparkles size={13} />
        HOOK부터 CLOSING까지 {totalSlides}개 화면 · 상세 기획은 <code className="text-[11px]">docs/</code> 참조
      </div>

      <p className="mt-10 text-[13px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        AI Playground · 쉬는 시간 또는 강의 이후 자유 체험
      </p>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <FeatureCard
          to="/chatbot-vs-agent"
          icon={<MessageSquareText size={18} />}
          tone="purple"
          eyebrow="ChatGPT를 넘어 AI Agent로"
          title="Chatbot vs AI Agent 비교"
          description='같은 업무("조직문화 행사 준비")를 Chatbot과 AI Agent가 각각 어떻게 처리하는지 단계별로 비교합니다.'
        />
        <FeatureCard
          to="/prompt-improvement"
          icon={<SlidersHorizontal size={18} />}
          tone="mint"
          eyebrow="AI도 일을 제대로 시키는 사람이 따로 있다"
          title="프롬프트 개선 시뮬레이터"
          description='"회의 내용을 정리해줘" 같은 부실한 요청에 요소를 하나씩 더하며 결과물이 달라지는 과정을 체험합니다.'
        />
      </div>

      <div
        className="mt-10 rounded-2xl border p-5"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface-2)' }}
      >
        <p className="text-[13px] font-bold">이 프로토타입에서 유의할 점</p>
        <ul className="mt-2 space-y-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
          <li>• 모든 시뮬레이션은 사전에 작성된 시나리오와 데이터로만 동작하며, 실시간 AI 연산을 수행하지 않습니다.</li>
          <li>• 계정 가입이나 설치 없이 브라우저에서 바로 체험할 수 있으며, 강의 종료 후에도 자유롭게 열어볼 수 있습니다.</li>
          <li>• 용어 도움말 설정은 이 브라우저에 저장되어 다음 방문에도 유지됩니다.</li>
        </ul>
      </div>
    </div>
  )
}

function FeatureCard({
  to,
  icon,
  tone,
  eyebrow,
  title,
  description,
}: {
  to: string
  icon: ReactNode
  tone: 'purple' | 'mint'
  eyebrow: string
  title: string
  description: string
}) {
  const accent = tone === 'purple' ? 'var(--accent-purple)' : 'var(--accent-mint)'
  const accentSoft = tone === 'purple' ? 'var(--accent-purple-soft)' : 'var(--accent-mint-soft)'
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border p-5 transition-colors"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: accentSoft, color: accent }}
      >
        {icon}
      </span>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
        {eyebrow}
      </p>
      <p className="mt-1 text-[17px] font-bold">{title}</p>
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      <span
        className="mt-4 flex items-center gap-1 text-[13px] font-semibold transition-transform group-hover:translate-x-0.5"
        style={{ color: accent }}
      >
        체험하기 <ArrowRight size={14} />
      </span>
    </Link>
  )
}
