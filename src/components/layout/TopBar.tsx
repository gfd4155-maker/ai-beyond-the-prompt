import { NavLink } from 'react-router-dom'
import { GlossaryToggle } from '../glossary/GlossaryToggle'

const NAV_ITEMS = [
  { to: '/', label: '홈' },
  { to: '/deck/1', label: '강의 보기' },
  { to: '/read', label: '읽기 모드' },
  { to: '/chatbot-vs-agent', label: 'Chatbot vs AI Agent' },
  { to: '/prompt-improvement', label: '프롬프트 개선 시뮬레이터' },
]

export function TopBar() {
  return (
    <header
      className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-8"
      style={{ borderColor: 'var(--border-subtle)', background: 'rgba(10,12,18,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-6">
        <NavLink to="/" className="flex items-center gap-2 text-[14px] font-bold tracking-tight">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' }}
          />
          AI BEYOND THE PROMPT
        </NavLink>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${isActive ? '' : 'opacity-70 hover:opacity-100'}`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--bg-surface-3)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <GlossaryToggle />
    </header>
  )
}
