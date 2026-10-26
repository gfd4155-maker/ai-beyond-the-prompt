# AI BEYOND THE PROMPT — 인터랙티브 강의 플랫폼

반도체·제조업 임직원을 위한 약 150분(거북이스프 실습 포함) AI 워크숍의 인터랙티브 웹 프로토타입입니다.
기획 문서는 `docs/`, 소스 코드는 `src/`에 있습니다.

> 총 소요시간은 CASES 섹션에 "거북이스프 추리게임을 활용한 프롬프트 교육 전/후 실습"이 추가되면서
> 기존 120분에서 약 151분으로 늘어났습니다. 시간이 부족하면 `turtle-compare-1`(결과 비교)·
> `turtle-message-2`(추리 vs 프롬프트 비교) 또는 `home-2` 슬라이드를 발표 중 건너뛸 수 있습니다.
> 정확한 섹션별 시간은 `src/content/slides.ts`의 `SECTION_LABELS`를 참고하세요.

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

- **발표 덱** (`/deck/1`) — HOOK→HISTORY→AGENT→VIBECODING→BREAK→REALITY→CASES(거북이스프 교육 전/후 실습 포함)→STARTHOME→CLOSING, 총 39개 화면. 이전/다음, 목차, 발표자 노트, 전체화면, 진행률 표시 — `src/components/deck/`, `src/content/slides.ts`
  - 전체화면 모드는 `src/hooks/useFitStage.ts`로 "고정 디자인 너비 + 실측 높이 + transform:scale" 방식으로 가로·세로 중앙정렬합니다(reveal.js류 패턴). 인터랙티브 임베드 슬라이드(Chatbot vs Agent / 프롬프트 개선 시뮬레이터)는 내부 버튼이 작아지지 않도록 가로폭만 맞추고 세로는 스크롤을 허용합니다.
  - 거북이스프 추리게임(Part A~E)은 실제 문제·정답을 화면/발표자 노트 어디에도 포함하지 않습니다 — 발표자가 별도 화면으로 진행하고, 이 덱은 안내·프레이밍·결과 비교표(`turtle-compare-1`, 실측값 직접 입력)만 제공합니다.
- **읽기 모드** (`/read`) — 강의 종료 후 스크롤로 전체 내용(발표자 대본 포함)을 복습하는 화면 — `src/pages/ReadingModePage.tsx`
- **전역 용어 도움말**(Glossary Mode) — `src/context/GlossaryContext.tsx`, `src/components/glossary/`
- **Chatbot vs AI Agent 비교** (`/chatbot-vs-agent`, 덱의 `agent-2` 화면에도 임베드) — `src/features/chatbot-vs-agent/`
- **프롬프트 개선 시뮬레이터** (`/prompt-improvement`, 덱의 `case-5` 화면에도 임베드) — `src/features/prompt-improvement/`
- **AI 자신감 곡선**(놀라움→과신→좌절→성숙, 클릭형) — `src/components/deck/visuals/ConfidenceCurveVisual.tsx`
- **바이브 코딩 과정**(프롬프트→코드→실행, 3단계 클릭형) — `src/components/deck/visuals/VibeCodingProcessVisual.tsx`
- **결과물 갤러리** — 데모 주소가 없으면 가짜 링크 대신 "데모 준비 중" 배지 표시, `demoUrl`을 채우면 자동으로 링크로 전환 — `src/components/deck/visuals/ResultsGalleryVisual.tsx`
- **OX/4지선다 퀴즈 2개**(정답 공개 전 숨김, 선택지별 해설 포함) + **AI 답변 검증 미니게임** 1개 — 덱 안에 포함
- **게임 탭** (`/games`) — "AI로 만든 게임 놀이터" 허브(`src/pages/GamesHubPage.tsx`) + 테트리스/갤러그 플레이어(`src/pages/GamePlayerPage.tsx`). 실제 게임 로직은 외부 라이브러리 없이 단일 HTML로 구현되어 `public/games/tetris.html`, `public/games/galaga.html`에 있고, 플레이어 페이지는 이를 `<iframe>`으로 로드합니다(언마운트 시 iframe 문서 전체가 파기되어 타이머·리스너·오디오가 자동 정리됩니다). VIBECODING 섹션의 `vibe-4` 슬라이드와 HOOK 섹션 `hook-2`의 "테트리스 게임" 데모 링크에서 이 게임 탭으로 연결됩니다.

모든 인터랙션은 사전 제작된 데이터로만 동작하며 실시간 AI API를 호출하지 않습니다. 코딩 화면·실행 화면 목업은 설명용 예시이며 실제 동작하는 데모가 아님을 화면에 명시했습니다.
