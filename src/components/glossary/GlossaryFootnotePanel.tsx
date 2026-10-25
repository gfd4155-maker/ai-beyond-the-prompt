import { BookOpenText } from 'lucide-react'
import { glossaryMap } from '../../content/glossary'
import { useGlossary } from '../../context/GlossaryContext'

interface GlossaryFootnotePanelProps {
  /** 이 화면에 실제로 등장한 용어 id만 전달합니다 — 화면마다 필요한 용어만 보여주기 위함입니다. */
  termIds: string[]
}

export function GlossaryFootnotePanel({ termIds }: GlossaryFootnotePanelProps) {
  const { enabled } = useGlossary()
  const terms = termIds.map((id) => glossaryMap[id]).filter(Boolean)

  if (!enabled || terms.length === 0) return null

  return (
    <div
      className="mt-6 rounded-2xl border p-4 sm:p-5"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface-2)' }}
    >
      <div className="mb-3 flex items-center gap-2">
        <BookOpenText size={14} style={{ color: 'var(--accent-mint)' }} />
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-mint)' }}>
          이 화면에 등장한 용어
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {terms.map((t) => (
          <div key={t.id} className="rounded-lg border p-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-[13px] font-bold">{t.term}</p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
