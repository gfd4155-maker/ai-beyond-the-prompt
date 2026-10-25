import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/#/',
  pretendToBeVisual: true,
})

const w = dom.window as unknown as typeof window

Object.defineProperty(globalThis, 'navigator', { value: w.navigator, configurable: true })

Object.assign(globalThis, {
  window: w,
  document: w.document,
  localStorage: w.localStorage,
  Node: w.Node,
  Element: w.Element,
  HTMLElement: w.HTMLElement,
  SVGElement: w.SVGElement,
  Text: w.Text,
  Event: w.Event,
  CustomEvent: w.CustomEvent,
  MouseEvent: w.MouseEvent,
  KeyboardEvent: w.KeyboardEvent,
  getComputedStyle: w.getComputedStyle?.bind(w),
  requestAnimationFrame: w.requestAnimationFrame ?? ((cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16)),
  cancelAnimationFrame: w.cancelAnimationFrame ?? clearTimeout,
})

// framer-motion / UA 안전장치 — jsdom 미구현 API 보완
;(w as any).matchMedia =
  (w as any).matchMedia ||
  (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }))
;(globalThis as any).matchMedia = (w as any).matchMedia
;(w as any).ResizeObserver =
  (w as any).ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
;(globalThis as any).ResizeObserver = (w as any).ResizeObserver

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function assertText(label: string, text: string) {
  if (!w.document.body.textContent?.includes(text)) {
    throw new Error(`[FAIL] ${label}: 텍스트를 찾을 수 없음 → "${text}"`)
  }
  console.log(`[OK] ${label}: "${text}" 확인됨`)
}

function findButton(text: string): HTMLElement {
  const all = Array.from(w.document.querySelectorAll('button'))
  const el = all.find((e) => e.textContent?.includes(text))
  if (!el) {
    const labels = all.map((e) => e.textContent?.trim()).filter(Boolean)
    throw new Error(`[FAIL] 버튼을 찾을 수 없음 → "${text}" (현재 버튼들: ${labels.join(' | ')})`)
  }
  return el as HTMLElement
}

function click(label: string, text: string) {
  const el = findButton(text)
  el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }))
  console.log(`[OK] ${label}: "${text}" 클릭`)
}

async function main() {
  const React = await import('react')
  const { createRoot } = await import('react-dom/client')
  const { default: App } = await import('../src/App.tsx')
  const { slides, totalSlides } = await import('../src/content/slides.ts')

  function deckIndexOf(id: string): number {
    const i = slides.findIndex((s: { id: string }) => s.id === id)
    if (i === -1) throw new Error(`[FAIL] slides.ts에서 id를 찾을 수 없음 → "${id}"`)
    return i + 1
  }

  const container = w.document.getElementById('root')!
  const root = createRoot(container)
  root.render(React.createElement(App))
  await sleep(80)

  // 1) 홈
  assertText('홈 화면', 'AI BEYOND THE PROMPT')
  assertText('홈 화면', '질문하는 AI에서 일하는 AI로')

  // 2) 용어 도움말 토글
  click('용어 도움말', '용어 도움말')
  await sleep(30)

  // 3) Chatbot vs AI Agent 화면
  w.location.hash = '#/chatbot-vs-agent'
  await sleep(80)
  assertText('Chatbot vs Agent', '가상의 조직문화 행사를 준비한다')
  assertText('Chatbot vs Agent', '사용자가 챗봇에게 질문을 입력합니다')

  click('Chatbot vs Agent', '다음 단계')
  await sleep(30)
  click('Chatbot vs Agent', '다음 단계')
  await sleep(30)
  click('Chatbot vs Agent', '다음 단계')
  await sleep(30)
  assertText('Chatbot vs Agent 마지막 단계', 'Chatbot 방식의 특징과 한계')

  click('Chatbot vs Agent', 'AI Agent 모드')
  await sleep(30)
  assertText('AI Agent 모드 진입', "사용자가 '조직문화 행사를 준비해줘'라는 업무 목표를 제시합니다")

  click('Chatbot vs Agent', '전체 과정 비교')
  await sleep(30)
  assertText('비교 보기', 'AI Agent 방식의 특징과 한계')

  click('Chatbot vs Agent', '단일 보기')
  await sleep(30)
  click('Chatbot vs Agent', '초기화')
  await sleep(30)
  assertText('초기화 확인', "사용자가 '조직문화 행사를 준비해줘'라는 업무 목표를 제시합니다")

  // 4) 프롬프트 개선 시뮬레이터
  w.location.hash = '#/prompt-improvement'
  await sleep(80)
  assertText('프롬프트 시뮬레이터', '회의 내용을 정리해줘')

  click('프롬프트 시뮬레이터', '1. 목적')
  await sleep(300)
  assertText('목적 추가 후', '임원 보고용 요약')

  click('프롬프트 시뮬레이터', '2. 배경 정보')
  await sleep(300)
  click('프롬프트 시뮬레이터', '3. 독자')
  await sleep(300)
  click('프롬프트 시뮬레이터', '4. 제약 조건')
  await sleep(300)
  click('프롬프트 시뮬레이터', '5. 출력 형식')
  await sleep(300)
  click('프롬프트 시뮬레이터', '6. 검증 기준')
  await sleep(300)
  assertText('모든 요소 적용 후', '확인 필요')

  click('프롬프트 시뮬레이터', '처음 vs 최종 비교')
  await sleep(300)
  assertText('비교 모드', '무엇이 달라졌나요')

  // 5) 발표 덱 (경험담 중심, 화면 텍스트 최소화 스타일) — id 기반으로 인덱스를 동적으로 찾아 슬라이드 수 변경에도 깨지지 않게 함
  w.location.hash = `#/deck/${deckIndexOf('hook-1')}`
  await sleep(300)
  assertText('덱 hook-1 (타이틀)', 'AI, 어디까지')
  assertText('덱 hook-1 screenText', '오늘, 제가 직접 겪은 이야기로 시작합니다')

  w.location.hash = `#/deck/${deckIndexOf('hook-2')}`
  await sleep(300)
  assertText('덱 hook-2 (결과물 갤러리)', '테트리스 게임')
  assertText('덱 hook-2 데모 배지', '데모 준비 중')

  w.location.hash = `#/deck/${deckIndexOf('hist-5')}`
  await sleep(300)
  assertText('덱 hist-5 (할루시네이션 퀴즈)', 'AI가 이렇게')
  click('덱 퀴즈', 'X')
  await sleep(30)
  click('덱 퀴즈', '정답 공개')
  await sleep(30)
  assertText('퀴즈 해설 공개', '할루시네이션"이라고 부릅니다')

  w.location.hash = `#/deck/${deckIndexOf('agent-2')}`
  await sleep(300)
  assertText('덱 agent-2 (Chatbot vs Agent 임베드)', '가상의 조직문화 행사를 준비한다')

  w.location.hash = `#/deck/${deckIndexOf('vibe-1')}`
  await sleep(300)
  assertText('덱 vibe-1 (바이브 코딩)', '타자연습 게임 만들어줘')
  click('덱 vibe-1 다음 단계', '다음')
  await sleep(400)
  assertText('덱 vibe-1 코드 단계', 'AI가 생성한 코드')

  w.location.hash = `#/deck/${deckIndexOf('real-1')}`
  await sleep(300)
  assertText('덱 real-1 (자신감 곡선)', '곡선을 하나씩 그려보세요')
  click('덱 real-1 다음 단계', '다음 단계')
  await sleep(500)
  assertText('덱 real-1 1단계 공개', '놀라움')

  w.location.hash = `#/deck/${deckIndexOf('case-5')}`
  await sleep(300)
  assertText('덱 case-5 (프롬프트 개선 임베드)', '회의 내용을 정리해줘')

  w.location.hash = `#/deck/${totalSlides}`
  await sleep(300)
  assertText('덱 마지막 슬라이드 (close-3)', '여러분의 차례입니다')

  click('덱 목차', '목차')
  await sleep(50)
  click('덱 목차', 'AI는 어떻게')
  await sleep(300)
  assertText('목차로 이동 후', '토큰" 단위로 생각합니다')

  // 6) 읽기 모드 (스크롤형 전체 복습 — speakerScript까지 모두 표시)
  w.location.hash = '#/read'
  await sleep(300)
  assertText('읽기 모드', 'AI BEYOND THE PROMPT — 전체 강의 내용')
  assertText('읽기 모드 발표자 대본 노출', '여러분, AI Agent 써보셨나요')
  assertText('읽기 모드 임베드 링크', 'Chatbot vs AI Agent 체험하기')

  console.log('\n모든 스모크 테스트 통과 ✅')
}

main().catch((err) => {
  console.error('\n스모크 테스트 실패 ❌')
  console.error(err)
  process.exit(1)
})
