import type { ReactNode } from 'react'

export interface ControlAction {
  key: string
  label: string
  icon: ReactNode
  onClick: () => void
  disabled?: boolean
  active?: boolean
  variant?: 'default' | 'primary'
}

/**
 * 모든 인터랙티브 화면이 공유하는 발표 운영 컨트롤 바입니다.
 * (이전/다음/초기화/재생-일시정지/노트/전체화면/학습 포인트 등)
 */
export function ControlBar({ actions }: { actions: ControlAction[] }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-2xl border p-2"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface-2)' }}
    >
      {actions.map((a) => (
        <button
          key={a.key}
          type="button"
          onClick={a.onClick}
          disabled={a.disabled}
          aria-pressed={a.active}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35"
          style={
            a.variant === 'primary'
              ? { background: 'var(--accent-blue)', color: '#0a0c12' }
              : a.active
                ? { background: 'var(--accent-purple-soft)', color: 'var(--accent-purple)' }
                : { background: 'transparent', color: 'var(--text-secondary)' }
          }
        >
          {a.icon}
          <span className="hidden md:inline">{a.label}</span>
        </button>
      ))}
    </div>
  )
}
