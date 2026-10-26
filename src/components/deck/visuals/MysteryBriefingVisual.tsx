import { Eye, Search } from 'lucide-react'

/** 거북이스프 실습 전/후 브리핑 카드 — 문제·정답은 절대 포함하지 않고, 진행 방식만 안내합니다. */
export function MysteryBriefingVisual({ roundsLabel, notes }: { roundsLabel: string; notes: string[] }) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-7"
      style={{ borderColor: 'var(--accent-purple)', background: 'linear-gradient(160deg, var(--accent-purple-soft), transparent)' }}
    >
      <div className="flex items-center justify-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: 'var(--accent-purple-soft)', color: 'var(--accent-purple)' }}
        >
          <Search size={20} />
        </span>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: 'var(--accent-blue-soft)', color: 'var(--accent-blue)' }}
        >
          <Eye size={20} />
        </span>
      </div>

      <p
        className="mx-auto mt-4 w-fit rounded-full border px-4 py-1.5 text-center text-[13px] font-bold"
        style={{ borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
      >
        {roundsLabel}
      </p>

      <ul className="mx-auto mt-5 max-w-md space-y-2 text-left">
        {notes.map((note, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--accent-purple)' }} />
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
