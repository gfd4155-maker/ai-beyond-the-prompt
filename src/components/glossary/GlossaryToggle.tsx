import { HelpCircle } from 'lucide-react'
import { useGlossary } from '../../context/GlossaryContext'

export function GlossaryToggle() {
  const { enabled, toggle } = useGlossary()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      title="화면의 전문 용어에 밑줄 표시와 클릭 설명을 켜거나 끕니다."
      className="group flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors"
      style={{
        borderColor: enabled ? 'var(--accent-mint)' : 'var(--border-subtle)',
        background: enabled ? 'var(--accent-mint-soft)' : 'transparent',
        color: enabled ? 'var(--accent-mint)' : 'var(--text-secondary)',
      }}
    >
      <HelpCircle size={15} />
      <span className="hidden sm:inline">용어 도움말</span>
      <span
        className="relative inline-flex h-4 w-7 items-center rounded-full transition-colors"
        style={{ background: enabled ? 'var(--accent-mint)' : 'var(--border-strong)' }}
      >
        <span
          className="absolute h-3 w-3 rounded-full bg-white transition-transform"
          style={{ transform: enabled ? 'translateX(14px)' : 'translateX(2px)' }}
        />
      </span>
      <span className="w-6 text-left text-[11px] font-bold">{enabled ? 'ON' : 'OFF'}</span>
    </button>
  )
}
