import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRightCircle, Clock, Lightbulb, MessageCircleQuestion, MousePointerClick, Sparkles } from 'lucide-react'
import type { SpeakerScript } from '../../content/slides'

const FIELD_META = [
  { key: 'intro', label: '도입 멘트', icon: Sparkles },
  { key: 'script', label: '실제 강의 대본', icon: null },
  { key: 'question', label: '관객에게 던질 질문', icon: MessageCircleQuestion },
  { key: 'analogy', label: '비유', icon: Lightbulb },
  { key: 'keyConcept', label: '핵심 개념', icon: Sparkles },
  { key: 'clickTiming', label: '화면 클릭 타이밍', icon: MousePointerClick },
  { key: 'transition', label: '다음 화면 연결 멘트', icon: ArrowRightCircle },
] as const

/** 발표 중 관객에게는 숨기고, 발표자만 펼쳐서 보는 대본 패널. 읽기 모드에서는 항상 펼쳐서 사용합니다. */
export function SpeakerScriptPanel({
  open,
  script,
  alwaysOpen = false,
}: {
  open: boolean
  script: SpeakerScript
  alwaysOpen?: boolean
}) {
  const isOpen = alwaysOpen || open

  const content = (
    <div
      className="rounded-2xl border p-4 sm:p-5"
      style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-surface-3)' }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-purple)' }}>
          {alwaysOpen ? '강의 설명 (발표자 대본)' : '발표자 스크립트 (발표 중 관객에게는 보이지 않음)'}
        </p>
        <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
          <Clock size={12} /> 예상 {script.durationMinutes}분
        </span>
      </div>

      <div className="space-y-3">
        {FIELD_META.map(({ key, label, icon: Icon }) => {
          const value = script[key as keyof SpeakerScript]
          if (!value) return null
          return (
            <div key={key}>
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: 'var(--accent-blue)' }}>
                {Icon && <Icon size={12} />}
                {label}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {String(value)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (alwaysOpen) {
    return <div className="mt-6">{content}</div>
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
