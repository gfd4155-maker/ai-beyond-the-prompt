import { ExternalLink } from 'lucide-react'
import { iconMap } from './iconMap'
import type { ResultItem } from './types'

/**
 * 실제 데모 주소가 없는 결과물은 가짜 링크를 만들지 않고 "준비 중" 배지를 보여줍니다.
 * demoUrl이 채워지면 그때 바로 "데모 보기" 링크로 바뀝니다.
 */
export function ResultsGalleryVisual({ items }: { items: ResultItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <div
            key={item.id}
            className="flex flex-col items-center gap-2 rounded-2xl border p-4 text-center"
            style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: 'var(--accent-purple-soft)', color: 'var(--accent-purple)' }}
            >
              {Icon && <Icon size={20} />}
            </span>
            <span className="text-[13px] font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
              {item.name}
            </span>
            {item.demoUrl ? (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold"
                style={{ color: 'var(--accent-mint)' }}
              >
                데모 보기 <ExternalLink size={11} />
              </a>
            ) : (
              <span
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}
              >
                데모 준비 중
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
