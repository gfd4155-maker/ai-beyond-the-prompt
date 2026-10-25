import { ChevronRight } from 'lucide-react'

export function FlowRowVisual({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="rounded-lg border px-3 py-2 text-[12px] font-medium"
            style={{ borderColor: 'var(--accent-mint)', background: 'var(--accent-mint-soft)', color: 'var(--accent-mint)' }}
          >
            {item}
          </div>
          {i < items.length - 1 && <ChevronRight size={15} style={{ color: 'var(--text-muted)' }} />}
        </div>
      ))}
    </div>
  )
}
