import { TriangleAlert } from 'lucide-react'

export function WarningListVisual({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 rounded-lg border p-2.5 text-[13px]"
          style={{ borderColor: 'var(--accent-amber)', background: 'rgba(245,184,92,0.08)', color: 'var(--text-primary)' }}
        >
          <TriangleAlert size={15} style={{ color: 'var(--accent-amber)' }} className="mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}
