import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Gamepad2, Rocket, Sparkles } from 'lucide-react'

export function GamesHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
      <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-mint)' }}>
        AI Playground · 게임
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">AI로 만든 게임 놀이터</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        프롬프트만으로 어디까지 만들 수 있을까요? 아래 두 게임은 "테트리스 게임을 만들어줘", "갤러그 스타일 슈팅 게임을
        만들어줘"라는 짧은 요청에서 시작해, 플레이해보고 기능을 하나씩 추가·수정하며 완성했습니다. 직접 플레이해보세요.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <GameCard
          to="/games/tetris"
          icon={<Gamepad2 size={20} />}
          accent="var(--accent-blue)"
          accentSoft="var(--accent-blue-soft)"
          name="TETRIS"
          description="블록을 쌓고 줄을 완성하는 클래식 퍼즐게임"
        />
        <GameCard
          to="/games/galaga"
          icon={<Rocket size={20} />}
          accent="var(--accent-purple)"
          accentSoft="var(--accent-purple-soft)"
          name="GALAGA"
          description="적 우주선을 격추하는 레트로 슈팅게임"
        />
      </div>

      <div
        className="mt-10 flex items-start gap-3 rounded-2xl border p-5"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface-2)' }}
      >
        <Sparkles size={18} style={{ color: 'var(--accent-mint)', flexShrink: 0, marginTop: 2 }} />
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          두 게임 모두 설치 없이 브라우저에서 바로 플레이할 수 있고, 키보드만 있으면 됩니다. 각 게임 화면에서 조작법과
          "게임 목록으로" 버튼을 확인할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

function GameCard({
  to,
  icon,
  accent,
  accentSoft,
  name,
  description,
}: {
  to: string
  icon: ReactNode
  accent: string
  accentSoft: string
  name: string
  description: string
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-colors"
      style={{ borderColor: accent, background: `linear-gradient(160deg, ${accentSoft}, var(--bg-surface))` }}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: accentSoft, color: accent }}
      >
        {icon}
      </span>
      <p className="mt-5 font-mono text-[26px] font-black tracking-widest" style={{ color: accent }}>
        {name}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      <span
        className="mt-5 flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition-transform group-hover:translate-x-0.5"
        style={{ background: accent, color: '#0a0c12', width: 'fit-content' }}
      >
        게임 시작 <ArrowRight size={14} />
      </span>
    </Link>
  )
}
