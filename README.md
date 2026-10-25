# AI BEYOND THE PROMPT — 인터랙티브 강의 플랫폼

반도체·제조업 임직원을 위한 120분 AI 워크숍의 인터랙티브 웹 프로토타입입니다.
기획 문서는 `docs/`, 소스 코드는 `src/`에 있습니다.

## 실행 방법

```bash
npm install
npm run dev       # http://localhost:5173 (또는 표시되는 포트)
```

## 빌드 (정적 배포용)

```bash
npm run build      # dist/ 폴더에 정적 파일 생성 — 서버/DB 없이 그대로 배포 가능
npm run preview    # 빌드 결과 로컬 미리보기
npm run test:smoke # 실제 클릭 흐름(모드 전환/단계 이동/비교 모드 등)을 코드로 재현해 검증
```

## GitHub Pages 배포

이미 GitHub Pages 호환 설정이 되어 있습니다.

- `vite.config.ts`의 `base: './'` — 모든 자산 경로가 상대경로로 빌드되어 `https://<사용자>.github.io/<저장소명>/` 같은 하위 경로에서도 그대로 동작합니다.
- 라우팅은 `HashRouter`(`#/chatbot-vs-agent` 형태) — GitHub Pages는 서버 라우팅 설정이 없는 순수 정적 호스팅이라, 하위 경로를 새로고침하거나 바로 링크로 들어와도 404 없이 동작합니다.

배포 절차 예시: `npm run build` → `dist/` 폴더 내용을 `gh-pages` 브랜치(또는 GitHub Actions)로 올리면 됩니다. GitHub Actions 워크플로를 자동으로 붙여드릴 수도 있으니, 원하시면 말씀해주세요.

## 문서

- `docs/` — 초기 기획 단계 문서(커리큘럼·인터랙션 설계). ⚠️ 이후 강의 스타일이 "경험담 중심, 화면 텍스트 최소화"로 전면 개편되면서 구조가 많이 달라져 현재는 참고용입니다. 최신 구조는 `src/content/slides.ts` 코드가 기준입니다.

## 현재 구현 범위

강의 스타일: 이론 설명이 아니라 **발표자의 실제 경험담 중심**. 화면에는 짧은 제목 + 한 줄 설명 + 시각자료만 노출되고,
상세 설명(도입 멘트/대본/질문/비유/핵심 개념/클릭 타이밍/연결 멘트)은 **발표자 노트에만** 들어있습니다(발표 모드 기본 숨김, 읽기 모드에서는 항상 표시).

- **발표 덱** (`/deck/1`) — HOOK→HISTORY→AGENT→VIBECODING→BREAK→REALITY→CASES→STARTHOME→CLOSING, 총 31개 화면. 이전/다음, 목차, 발표자 노트, 전체화면, 진행률 표시 — `src/components/deck/`, `src/content/slides.ts`
- **읽기 모드** (`/read`) — 강의 종료 후 스크롤로 전체 내용(발표자 대본 포함)을 복습하는 화면 — `src/pages/ReadingModePage.tsx`
- **전역 용어 도움말**(Glossary Mode) — `src/context/GlossaryContext.tsx`, `src/components/glossary/`
- **Chatbot vs AI Agent 비교** (`/chatbot-vs-agent`, 덱의 `agent-2` 화면에도 임베드) — `src/features/chatbot-vs-agent/`
- **프롬프트 개선 시뮬레이터** (`/prompt-improvement`, 덱의 `case-5` 화면에도 임베드) — `src/features/prompt-improvement/`
- **AI 자신감 곡선**(놀라움→과신→좌절→성숙, 클릭형) — `src/components/deck/visuals/ConfidenceCurveVisual.tsx`
- **바이브 코딩 과정**(프롬프트→코드→실행, 3단계 클릭형) — `src/components/deck/visuals/VibeCodingProcessVisual.tsx`
- **결과물 갤러리** — 데모 주소가 없으면 가짜 링크 대신 "데모 준비 중" 배지 표시, `demoUrl`을 채우면 자동으로 링크로 전환 — `src/components/deck/visuals/ResultsGalleryVisual.tsx`
- **OX/4지선다 퀴즈 2개**(정답 공개 전 숨김, 선택지별 해설 포함) + **AI 답변 검증 미니게임** 1개 — 덱 안에 포함

모든 인터랙션은 사전 제작된 데이터로만 동작하며 실시간 AI API를 호출하지 않습니다. 코딩 화면·실행 화면 목업은 설명용 예시이며 실제 동작하는 데모가 아님을 화면에 명시했습니다.
