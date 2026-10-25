import { Fragment } from 'react'
import { glossarySurfaceForms } from '../../content/glossary-surface-forms'
import { GlossaryTerm } from './GlossaryTerm'

interface SurfaceEntry {
  form: string
  id: string
}

export const surfaceEntries: SurfaceEntry[] = Object.entries(glossarySurfaceForms)
  .flatMap(([id, forms]) => forms.map((form) => ({ form, id })))
  .sort((a, b) => b.form.length - a.form.length)

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const combinedPattern = new RegExp(`(${surfaceEntries.map((e) => escapeRegExp(e.form)).join('|')})`, 'g')

/** 여러 텍스트 블록을 스캔해 등장하는 용어 도움말 id 목록(중복 제거, 등장 순서)을 반환합니다. */
export function findGlossaryIds(texts: Array<string | undefined>): string[] {
  const found = new Set<string>()
  for (const t of texts) {
    if (!t) continue
    for (const entry of surfaceEntries) {
      if (t.includes(entry.form)) found.add(entry.id)
    }
  }
  return Array.from(found)
}

/**
 * 한 문장/문단 안에서 용어 도움말 표면형을 찾아 자동으로 GlossaryTerm으로 감쌉니다.
 * 같은 문단 안에서 같은 용어는 처음 1회만 밑줄 처리해 과도한 강조를 피합니다.
 */
export function AutoGlossaryText({ text }: { text: string }) {
  const parts = text.split(combinedPattern)
  const seenInThisText = new Set<string>()

  return (
    <>
      {parts.map((part, i) => {
        const match = surfaceEntries.find((e) => e.form === part)
        if (!match || seenInThisText.has(match.id)) {
          return <Fragment key={i}>{part}</Fragment>
        }
        seenInThisText.add(match.id)
        return <GlossaryTerm key={i} id={match.id}>{part}</GlossaryTerm>
      })}
    </>
  )
}
