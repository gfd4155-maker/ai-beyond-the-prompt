import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Lightbulb, X } from 'lucide-react'
import type { QuizSlide } from '../../content/slides'
import { glossaryMap } from '../../content/glossary'
import { AutoGlossaryText, findGlossaryIds } from '../glossary/AutoGlossaryText'
import { GlossaryFootnotePanel } from '../glossary/GlossaryFootnotePanel'
import { GlossaryTerm } from '../glossary/GlossaryTerm'

export function QuizSlideView({ slide }: { slide: QuizSlide }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const relatedTerm = glossaryMap[slide.relatedConcept]
  const glossaryIds = findGlossaryIds([slide.context, slide.question, slide.explanation, ...slide.optionNotes])

  return (
    <div className="mx-auto w-full max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-amber)' }}>
        {slide.quizType === 'OX' ? 'OX 퀴즈' : '4지선다 퀴즈'}
      </p>
      <h1 className="mt-1 text-2xl font-bold leading-snug sm:text-3xl">{slide.title}</h1>

      <p
        className="mt-4 rounded-xl border p-3.5 text-[13px] leading-relaxed"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface-2)', color: 'var(--text-secondary)' }}
      >
        <AutoGlossaryText text={slide.context} />
      </p>

      {slide.documents && slide.documents.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {slide.documents.map((doc, i) => (
            <div
              key={i}
              className="rounded-xl border p-3.5"
              style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
            >
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {doc.label} <span className="font-normal">(교육용 모의 사례)</span>
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {doc.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-[15px] font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        <AutoGlossaryText text={slide.question} />
      </p>

      <div className="mt-1.5">
        <span
          className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px]"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          관련 핵심 개념:{' '}
          {relatedTerm ? (
            <span className="ml-1">
              <GlossaryTerm id={slide.relatedConcept}>{relatedTerm.term}</GlossaryTerm>
            </span>
          ) : (
            <span className="ml-1">{slide.relatedConcept}</span>
          )}
        </span>
      </div>

      <div className={`mt-5 grid gap-3 ${slide.quizType === 'OX' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {slide.options.map((opt, i) => {
          const isCorrect = i === slide.correctIndex
          const isSelected = i === selected
          let borderColor = 'var(--border-subtle)'
          let bg = 'var(--bg-surface)'
          if (revealed && isCorrect) {
            borderColor = 'var(--accent-mint)'
            bg = 'var(--accent-mint-soft)'
          } else if (revealed && isSelected && !isCorrect) {
            borderColor = 'var(--accent-rose)'
            bg = 'rgba(240,106,140,0.1)'
          } else if (!revealed && isSelected) {
            borderColor = 'var(--accent-blue)'
            bg = 'var(--accent-blue-soft)'
          }
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                className="flex w-full items-center justify-between gap-2 rounded-xl border p-3.5 text-left text-[14px] font-medium transition-colors"
                style={{ borderColor, background: bg, color: 'var(--text-primary)' }}
              >
                <span>{opt}</span>
                {revealed && isCorrect && <Check size={16} style={{ color: 'var(--accent-mint)' }} />}
                {revealed && isSelected && !isCorrect && <X size={16} style={{ color: 'var(--accent-rose)' }} />}
              </button>
              {revealed && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 px-1 text-[12.5px] leading-relaxed"
                  style={{ color: isCorrect ? 'var(--accent-mint)' : 'var(--text-secondary)' }}
                >
                  {isCorrect ? '✓ ' : '· '}
                  {slide.optionNotes[i]}
                </motion.p>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          disabled={revealed}
          className="rounded-full px-5 py-2 text-[13px] font-semibold transition-opacity disabled:opacity-40"
          style={{ background: 'var(--accent-amber)', color: '#1a1206' }}
        >
          정답 공개
        </button>
      </div>

      {revealed && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl border p-4 sm:p-5"
            style={{ borderColor: 'var(--accent-mint)', background: 'var(--accent-mint-soft)' }}
          >
            <p className="text-[13px] font-bold" style={{ color: 'var(--accent-mint)' }}>
              종합 해설
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <AutoGlossaryText text={slide.explanation} />
            </p>
          </motion.div>

          {slide.learningPoint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-start gap-2.5 rounded-2xl border p-4"
              style={{ borderColor: 'var(--accent-blue)', background: 'var(--accent-blue-soft)' }}
            >
              <Lightbulb size={16} style={{ color: 'var(--accent-blue)' }} className="mt-0.5 shrink-0" />
              <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                <strong style={{ color: 'var(--accent-blue)' }}>학습 포인트. </strong>
                {slide.learningPoint}
              </p>
            </motion.div>
          )}
        </>
      )}

      <GlossaryFootnotePanel termIds={glossaryIds} />
    </div>
  )
}
