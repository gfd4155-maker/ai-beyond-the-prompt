export function CompareVisual({
  left,
  right,
}: {
  left: { title: string; items: string[] }
  right: { title: string; items: string[] }
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { data: left, color: 'var(--accent-blue)', soft: 'var(--accent-blue-soft)' },
        { data: right, color: 'var(--accent-purple)', soft: 'var(--accent-purple-soft)' },
      ].map(({ data, color, soft }, i) => (
        <div key={i} className="rounded-xl border p-3.5" style={{ borderColor: color, background: soft }}>
          <p className="text-[12px] font-bold" style={{ color }}>
            {data.title}
          </p>
          <ul className="mt-2 space-y-1.5">
            {data.items.map((item, j) => (
              <li key={j} className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                · {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
