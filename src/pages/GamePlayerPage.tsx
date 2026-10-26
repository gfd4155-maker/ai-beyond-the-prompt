import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const GAME_META = {
  tetris: {
    title: 'TETRIS',
    file: 'games/tetris.html',
    controls: ['← → : 이동', '↑ : 회전', '↓ : 소프트 드롭', 'Space : 하드 드롭', 'P : 일시정지'],
  },
  galaga: {
    title: 'GALAGA',
    file: 'games/galaga.html',
    controls: ['← → : 이동', 'Space : 발사', 'P : 일시정지', '우측 상단 버튼 : 사운드 on/off'],
  },
} as const

export function GamePlayerPage({ gameKey }: { gameKey: keyof typeof GAME_META }) {
  const meta = GAME_META[gameKey]
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // 클릭 없이 바로 키보드 입력이 게임으로 전달되도록 자동 포커스 (실패해도 무시해도 되는 편의 기능)
    try {
      iframeRef.current?.contentWindow?.focus()
    } catch {
      // 무시 — 사용자가 iframe을 클릭하면 정상적으로 포커스됩니다.
    }
  }, [gameKey])

  const src = `${import.meta.env.BASE_URL}${meta.file}`

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/games"
          className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
        >
          <ArrowLeft size={14} /> 게임 목록으로
        </Link>
        <p className="font-mono text-[13px] font-bold tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {meta.controls.join(' · ')}
        </p>
      </div>

      <h1 className="mt-5 font-mono text-2xl font-black tracking-widest sm:text-3xl">{meta.title}</h1>
      <p className="mt-1 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
        화면을 한 번 클릭한 뒤 키보드로 플레이하세요.
      </p>

      <div
        className="mt-5 overflow-hidden rounded-2xl border"
        style={{ borderColor: 'var(--border-subtle)', background: '#000' }}
      >
        <iframe
          ref={iframeRef}
          key={gameKey}
          src={src}
          title={meta.title}
          className="block h-[70vh] w-full min-h-[480px]"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
