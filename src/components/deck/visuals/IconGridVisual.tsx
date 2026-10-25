import { iconMap } from './iconMap'

export function IconGridVisual({ items }: { items: { icon: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => {
        const Icon = iconMap[item.icon]
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-xl border p-3 text-center"
            style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: 'var(--accent-blue-soft)', color: 'var(--accent-blue)' }}
            >
              {Icon && <Icon size={17} />}
            </span>
            <span className="text-[12px] font-medium leading-snug" style={{ color: 'var(--text-secondary)' }}>
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
