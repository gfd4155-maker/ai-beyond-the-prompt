import { useState } from 'react'
import type { TurtleSoupCompareSlide } from '../../content/slides'

const METRICS = [
  '문제 해결 여부',
  '정답까지 질문 횟수',
  '문제 해결 소요 시간',
  '불필요·중복 질문 횟수',
  '기존 답변을 활용한 질문 여부',
]

/**
 * 거북이스프 교육 전/후 실습 결과를 발표 현장에서 직접 입력하는 비교표입니다.
 * 가짜 수치를 미리 넣지 않고, 실측값을 입력하는 즉시(새로고침 전까지) 화면에 반영됩니다.
 */
export function TurtleSoupCompareView({ slide }: { slide: TurtleSoupCompareSlide }) {
  const [before, setBefore] = useState<string[]>(() => METRICS.map(() => ''))
  const [after, setAfter] = useState<string[]>(() => METRICS.map(() => ''))

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold leading-snug sm:text-3xl">{slide.title}</h1>
      <p className="mt-3 text-[16px] font-medium" style={{ color: 'var(--accent-blue)' }}>
        {slide.keyMessage}
      </p>

      <div
        className="mt-6 overflow-hidden rounded-2xl border"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <div className="grid grid-cols-[1.4fr_1fr_1fr]">
          <div className="p-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
            비교 항목
          </div>
          <div className="border-l p-3 text-center text-[12px] font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-blue)' }}>
            교육 전
          </div>
          <div className="border-l p-3 text-center text-[12px] font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-mint)' }}>
            교육 후
          </div>
        </div>

        {METRICS.map((metric, i) => (
          <div key={metric} className="grid grid-cols-[1.4fr_1fr_1fr] border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="p-3 text-[13px] leading-snug" style={{ color: 'var(--text-secondary)' }}>
              {metric}
            </div>
            <div className="border-l p-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <input
                value={before[i]}
                onChange={(e) => setBefore((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                placeholder="직접 입력"
                className="w-full rounded-lg px-2 py-1.5 text-center text-[13px] outline-none"
                style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}
              />
            </div>
            <div className="border-l p-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <input
                value={after[i]}
                onChange={(e) => setAfter((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                placeholder="직접 입력"
                className="w-full rounded-lg px-2 py-1.5 text-center text-[13px] outline-none"
                style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>
        현장에서 관찰한 실측값을 직접 입력해주세요. 사전 입력된 수치는 없습니다 — 입력값은 새로고침 시 초기화됩니다.
      </p>
    </div>
  )
}
