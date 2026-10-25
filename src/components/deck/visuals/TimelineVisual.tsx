export function TimelineVisual({ items }: { items: { year: string; label: string }[] }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-start gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-start">
            <div className="flex w-36 flex-col items-center text-center sm:w-44">
              <p className="text-[12px] font-bold" style={{ color: 'var(--accent-blue)' }}>
                {item.year}
              </p>
              <span
                className="my-2 h-3 w-3 shrink-0 rounded-full"
                style={{ background: 'var(--accent-blue)', boxShadow: '0 0 0 3px var(--accent-blue-soft)' }}
              />
              <p className="text-[12px] leading-snug" style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </p>
            </div>
            {i < items.length - 1 && (
              <div className="mt-[11px] h-px w-10 sm:w-14" style={{ background: 'var(--border-strong)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
