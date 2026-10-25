export function GaugeVisual({ label, filledPct, caption }: { label: string; filledPct: number; caption: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          {label}
        </span>
        <span style={{ color: 'var(--accent-blue)' }}>{filledPct}%</span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full" style={{ background: 'var(--border-subtle)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${filledPct}%`, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))' }}
        />
      </div>
      <p className="mt-2 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
        {caption}
      </p>
    </div>
  )
}
