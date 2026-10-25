import { useState } from 'react'
import { motion } from 'framer-motion'
import type { VerificationMiniSlide } from '../../content/slides'
import { VERDICT_COLOR, VERDICT_LABEL, verificationSentences } from '../../content/verification-data'

export function VerificationMiniView({ slide }: { slide: VerificationMiniSlide }) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())

  function reveal(id: string) {
    setRevealedIds((prev) => new Set(prev).add(id))
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold leading-snug sm:text-3xl">{slide.title}</h1>
      <p className="mt-3 text-[16px] font-medium" style={{ color: 'var(--accent-blue)' }}>
        {slide.keyMessage}
      </p>
      <ul className="mt-3 space-y-1">
        {slide.bullets.map((b, i) => (
          <li key={i} className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            · {b}
          </li>
        ))}
      </ul>

      <div
        className="mt-6 rounded-2xl border p-4 sm:p-5"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          교육용 가상 AI 답변 — 문장을 클릭해 판정해보세요
        </p>
        <div className="mt-3 space-y-3">
          {verificationSentences.map((s) => {
            const isRevealed = revealedIds.has(s.id)
            return (
              <div key={s.id}>
                <button
                  type="button"
                  onClick={() => reveal(s.id)}
                  className="w-full rounded-lg border p-3 text-left text-[14px] leading-relaxed transition-colors"
                  style={{
                    borderColor: isRevealed ? VERDICT_COLOR[s.verdict] : 'var(--border-subtle)',
                    background: isRevealed ? 'var(--bg-surface-2)' : 'transparent',
                  }}
                >
                  {s.text}
                  {isRevealed && (
                    <span
                      className="ml-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold"
                      style={{ background: VERDICT_COLOR[s.verdict], color: '#0a0c12' }}
                    >
                      {VERDICT_LABEL[s.verdict]}
                    </span>
                  )}
                </button>
                {isRevealed && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 px-1 text-[13px] leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {s.explanation}
                  </motion.p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
