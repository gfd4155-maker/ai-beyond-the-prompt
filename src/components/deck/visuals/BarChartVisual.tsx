export function BarChartVisual({
  items,
  caption,
  tone = 'warning',
}: {
  items: { label: string; value: number }[]
  caption: string
  tone?: 'warning' | 'source'
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <div>
      <div className="flex items-end gap-4 px-2" style={{ height: 140 }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>
              {item.value}
            </span>
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${Math.max((item.value / max) * 100, 4)}%`,
                background: 'linear-gradient(180deg, var(--accent-blue), var(--accent-purple))',
              }}
            />
            <span className="text-center text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p
        className="mt-3 text-[11px] leading-relaxed"
        style={{ color: tone === 'warning' ? 'var(--accent-amber)' : 'var(--text-muted)' }}
      >
        {tone === 'warning' ? '⚠ ' : '📊 '}
        {caption}
      </p>
    </div>
  )
}
