import { CheckCircle2 } from 'lucide-react'

export function ChecklistVisual({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2 rounded-lg border p-2.5 text-[13px]"
          style={{ borderColor: 'var(--accent-mint)', background: 'var(--accent-mint-soft)', color: 'var(--text-primary)' }}
        >
          <CheckCircle2 size={15} style={{ color: 'var(--accent-mint)' }} className="shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}
