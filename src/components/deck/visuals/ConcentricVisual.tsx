const RING_COLORS = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-mint)', 'var(--accent-amber)']

export function ConcentricVisual({ items }: { items: { label: string; detail: string }[] }) {
  const n = items.length
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-center">
      <svg viewBox="0 0 100 100" className="h-44 w-44 shrink-0 sm:h-48 sm:w-48">
        {items.map((_, i) => {
          const r = 46 - i * (36 / Math.max(n - 1, 1))
          const color = RING_COLORS[i % RING_COLORS.length]
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={Math.max(r, 8)}
              fill={i === n - 1 ? color : 'none'}
              fillOpacity={i === n - 1 ? 0.25 : 1}
              stroke={color}
              strokeWidth={1.4}
            />
          )
        })}
      </svg>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: RING_COLORS[i % RING_COLORS.length] }}
            />
            <span className="text-[13px] leading-relaxed">
              <strong style={{ color: 'var(--text-primary)' }}>{item.label}</strong>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>— {item.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
