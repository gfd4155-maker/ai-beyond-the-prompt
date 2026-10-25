import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface SlideOverPanelProps {
  open: boolean
  onClose: () => void
  title: string
  accent: string
  children: ReactNode
}

/** 발표자 노트 / 학습 포인트 공개 등에서 재사용하는 하단 슬라이드오버 패널. */
export function SlideOverPanel({ open, onClose, title, accent, children }: SlideOverPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="mt-4 rounded-2xl border p-5"
          style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-surface-3)' }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="닫기"
            >
              <X size={16} />
            </button>
          </div>
          <div className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
