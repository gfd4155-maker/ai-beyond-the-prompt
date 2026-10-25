import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { glossaryMap } from '../../content/glossary'
import { useGlossary } from '../../context/GlossaryContext'

interface GlossaryTermProps {
  id: string
  children: ReactNode
}

/**
 * 용어 도움말이 꺼져 있으면 일반 텍스트처럼 보이고, 켜져 있으면 점선 밑줄과
 * 클릭 가능한 정의 팝오버가 활성화됩니다. 같은 id는 항상 같은 정의를 보여주므로
 * 슬라이드마다 설명이 달라지는 문제가 발생하지 않습니다.
 */
export function GlossaryTerm({ id, children }: GlossaryTermProps) {
  const { enabled } = useGlossary()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const term = glossaryMap[id]

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!enabled || !term) return <>{children}</>

  return (
    <span ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        data-open={open}
        className="glossary-term bg-transparent border-0 p-0 m-0 text-inherit"
        style={{ font: 'inherit', lineHeight: 'inherit' }}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        aria-expanded={open}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            role="dialog"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border p-4 text-left shadow-2xl"
            style={{
              background: 'var(--bg-surface-3)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-mint)' }}>
              용어 도움말
            </p>
            <p className="mt-1 text-sm font-bold">{term.term}</p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {term.definition}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--accent-blue)' }}>
                비유.{' '}
              </span>
              {term.analogy}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--accent-purple)' }}>
                업무 사례.{' '}
              </span>
              {term.example}
            </p>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
