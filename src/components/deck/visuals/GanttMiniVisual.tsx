export function GanttMiniVisual({
  rows,
  caption,
}: {
  rows: { label: string; startPct: number; widthPct: number; conflict?: boolean }[]
  caption: string
}) {
  return (
    <div>
      <div className="space-y-2.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              {row.label}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-md" style={{ background: 'var(--border-subtle)' }}>
              <div
                className="absolute inset-y-0 rounded-md"
                style={{
                  left: `${row.startPct}%`,
                  width: `${row.widthPct}%`,
                  background: row.conflict ? 'var(--accent-rose)' : 'var(--accent-mint)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed" style={{ color: 'var(--accent-amber)' }}>
        ⚠ {caption}
      </p>
    </div>
  )
}
