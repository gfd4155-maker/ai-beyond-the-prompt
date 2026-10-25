// 120분 강의 전체 화면 목록입니다. "경험담 중심, 화면 텍스트 최소화" 스타일로 구성했습니다.
// 화면에는 짧은 제목+한 줄 설명+시각자료만 노출되고, 상세 설명은 speakerScript(발표자 노트)에만 들어있습니다.
// 발표 덱(SlideDeckPage)과 읽기 모드(ReadingModePage)가 이 배열 하나만 참조합니다.

import type { SlideVisual } from '../components/deck/visuals/types'

export type SectionId = 'HOOK' | 'HISTORY' | 'AGENT' | 'VIBECODING' | 'BREAK' | 'REALITY' | 'CASES' | 'STARTHOME' | 'CLOSING'

export const SECTION_LABELS: Record<SectionId, string> = {
  HOOK: '0~10분 · AI가 이런 것도 만들 수 있다고?',
  HISTORY: '10~25분 · 불과 몇 년 사이, 무슨 일이?',
  AGENT: '25~40분 · ChatGPT를 넘어 AI Agent로',
  VIBECODING: '40~50분 · 코딩 몰라도 만드는 결과물',
  BREAK: '50~60분 · AI PLAYGROUND',
  REALITY: '60~80분 · 자신감 곡선과 현실의 벽',
  CASES: '80~100분 · 업무를 바꾸는 AI 활용 사례',
  STARTHOME: '100~110분 · 집에서 시작하는 나만의 AI Agent',
  CLOSING: '110~120분 · 정리 & Q&A',
}

/** 발표자 전용 대본 — 발표 화면에는 노출하지 않고 "발표자 노트"로만 보여줍니다. */
export interface SpeakerScript {
  /** 도입 멘트 */
  intro: string
  /** 실제 강의 대본 (구어체) */
  script: string
  /** 관객에게 던질 질문 */
  question?: string
  /** 재미있는 비유 */
  analogy?: string
  /** 강조할 핵심 개념 */
  keyConcept?: string
  /** 화면 클릭 타이밍 안내 */
  clickTiming?: string
  /** 다음 화면 연결 멘트 */
  transition: string
  /** 예상 발표 소요 시간(분) */
  durationMinutes: number
}

interface SlideCommon {
  id: string
  section: SectionId
  minutes: number
  /** 짧고 강렬한 제목. 2줄로 보이게 하려면 '\n'을 사용합니다. */
  title: string
  /** section-break/verification-mini 등에서 쓰는 짧은 부제 (content에는 사용하지 않음) */
  keyMessage?: string
  /** 발표자 노트의 1줄 요약 — speakerScript가 없을 때의 폴백 */
  presenterScript: string
  /** 발표자 노트에 전체 구조로 표시되는 풍부한 대본 (있으면 presenterScript 대신 이걸 보여줌) */
  speakerScript?: SpeakerScript
  /** 설계는 끝났지만 아직 전체 인터랙션으로 구현되지 않은 경우 참조용 ID */
  plannedInteraction?: string
}

export interface ContentSlide extends SlideCommon {
  kind: 'content'
  /** 화면에 보이는 유일한 설명 문장 — 30~50자 내외 목표 (선택) */
  screenText?: string
  visual?: SlideVisual
}

export interface QuizSlide extends SlideCommon {
  kind: 'quiz'
  quizType: 'OX' | 'MCQ'
  /** 문제를 던지기 전에 보여줄 배경 설명 */
  context: string
  /** 실제 비교 문서(예: AI vs 인간 글쓰기 비교)가 필요한 경우에만 사용 */
  documents?: { label: string; text: string }[]
  question: string
  options: string[]
  /** options와 같은 길이 — 선택지마다 "왜 맞았는지/틀렸는지" 해설 */
  optionNotes: string[]
  correctIndex: number
  explanation: string
  relatedConcept: string
  /** 퀴즈가 전달하는 핵심 학습 포인트 (선택) */
  learningPoint?: string
}

export interface SectionBreakSlide extends SlideCommon {
  kind: 'section-break'
  bullets: string[]
}

export interface InteractiveEmbedSlide extends SlideCommon {
  kind: 'interactive-embed'
  componentKey: 'chatbot-vs-agent' | 'prompt-improvement'
}

export interface VerificationMiniSlide extends SlideCommon {
  kind: 'verification-mini'
  bullets: string[]
}

export type Slide = ContentSlide | QuizSlide | SectionBreakSlide | InteractiveEmbedSlide | VerificationMiniSlide

export const slides: Slide[] = [
  // ═════════════ HOOK (0~10분, 3 화면) ═════════════
  {
    id: 'hook-1',
    section: 'HOOK',
    minutes: 2,
    kind: 'content',
    title: 'AI, 어디까지\n할 수 있을까?',
    screenText: '오늘, 제가 직접 겪은 이야기로 시작합니다.',
    presenterScript: '자기소개는 짧게. 바로 "직접 겪은 이야기"로 들어갑니다.',
    speakerScript: {
      intro: '여러분 반갑습니다. 오늘 120분 동안 저랑 같이 AI 얘기를 좀 해볼 건데요.',
      script:
        '오늘 강의는 이론 수업이 아닙니다. 제가 AI Agent랑 바이브 코딩이라는 걸 직접 써보면서 겪은 일들을 공유하는 자리예요. 신기했던 순간도 있었고, "이거 생각보다 별거 아니네" 싶었던 순간도 있었고, 솔직히 좌절한 순간도 있었습니다. 그 얘기를 다 들려드릴게요.',
      question: 'AI는 단순히 글을 써주는 도구일까요, 아니면 진짜 일을 처리할 수 있는 존재일까요?',
      transition: '일단 제가 실제로 만들어본 것들부터 보여드릴게요.',
      durationMinutes: 2,
    },
  },
  {
    id: 'hook-2',
    section: 'HOOK',
    minutes: 5,
    kind: 'content',
    title: 'AI에게 일을 맡기면\n진짜 알아서 할까?',
    screenText: '제가 직접 만들어본 것들입니다.',
    visual: {
      kind: 'results-gallery',
      items: [
        { id: 'tetris', name: '테트리스 게임', icon: 'Gamepad2' },
        { id: 'typing', name: '타자연습 게임', icon: 'Keyboard' },
        { id: 'coffee', name: '커피 주문 취합 웹사이트', icon: 'Coffee' },
        { id: 'budget', name: '가계부', icon: 'Wallet' },
        { id: 'news', name: '뉴스 정리 서비스', icon: 'Newspaper' },
      ],
    },
    presenterScript: '카드를 하나씩 가리키며 리듬감 있게 소개. 데모 준비된 것은 그 자리에서 클릭해서 보여주세요.',
    speakerScript: {
      intro: '여러분, AI Agent 써보셨나요? 이거 막상 써보면 신기합니다.',
      script:
        '예전에는 개발자에게 부탁해야 했던 웹사이트도, 이제 AI에게 설명하면서 만들 수 있거든요. 저도 처음엔 "이게 진짜 되나?" 싶어서 간단한 질문부터 해봤어요. 그러다 "이런 게임 하나 만들어줘"라고 해봤는데, 진짜 코드가 나오고 실제로 웹페이지로 열리더라고요. 그때부터 하나씩 만들어본 게 여기 보이는 것들입니다.',
      analogy: '그림을 못 그려도 "이런 느낌으로 그려줘"라고 말하면 되는 것과 비슷해요. 코드도 "이런 기능 넣어줘"라고 말로 설명하면 됩니다.',
      keyConcept: 'AI Agent — 목표만 주면 계획을 세우고 실행까지 하는 AI',
      transition: '근데 이게 챗봇이랑 뭐가 다른 건지, 그리고 오늘 뭘 가져가실 수 있는지 먼저 정리해볼게요.',
      durationMinutes: 5,
    },
  },
  {
    id: 'hook-3',
    section: 'HOOK',
    minutes: 3,
    kind: 'content',
    title: '오늘, 세 가지만\n가져가시면 됩니다',
    visual: {
      kind: 'icon-grid',
      items: [
        { icon: 'Compass', label: 'AI, 생각보다 훨씬 많은 걸 할 수 있다' },
        { icon: 'AlertTriangle', label: '믿지 말고, 검증하는 능력이 중요하다' },
        { icon: 'Users', label: '작은 문제 하나부터, 누구나 시작할 수 있다' },
      ],
    },
    presenterScript: '"이 3가지만 기억하고 가셔도 성공"이라고 말해주세요.',
    speakerScript: {
      intro: '오늘 120분이 끝나면 딱 세 가지만 기억하시면 돼요.',
      script:
        '첫째, AI는 생각보다 훨씬 많은 걸 할 수 있다는 것. 둘째, 그렇다고 AI를 무조건 믿으면 안 되고, 반복해서 검증하는 능력이 중요하다는 것. 셋째, AI Agent는 전문가만 쓰는 어려운 기술이 아니라 여러분도 작은 문제 하나부터 시작해볼 수 있다는 것. 이 세 가지만 가져가셔도 오늘 충분합니다.',
      transition: '그럼 AI가 불과 몇 년 사이 어디까지 왔는지, 빠르게 훑어볼게요.',
      durationMinutes: 3,
    },
  },

  // ═════════════ HISTORY (10~25분, 6 화면) ═════════════
  {
    id: 'hist-1',
    section: 'HISTORY',
    minutes: 3,
    kind: 'content',
    title: '불과 몇 년 사이,\n무슨 일이 있었던 걸까?',
    screenText: '70년의 역사가 최근 4년 만에 압축됐습니다.',
    visual: {
      kind: 'timeline',
      items: [
        { year: '1956', label: '"AI" 용어\n탄생' },
        { year: '1997', label: '딥블루\n체스 챔피언 격파' },
        { year: '2012', label: '딥러닝\n돌파' },
        { year: '2017', label: 'Transformer\n구조 발표' },
        { year: '2022', label: '대화형 AI\n대중 공개' },
        { year: '2023', label: '멀티모달\n확산' },
        { year: '2024~25', label: '추론 모델\n등장' },
        { year: '2026', label: 'AI Agent\n대중화(현재)' },
      ],
    },
    presenterScript: '노드 2~3개만 짚으며 간격이 점점 좁아지는 걸 강조하세요.',
    speakerScript: {
      intro: '"AI"라는 말, 사실 1956년부터 있었어요. 70년 된 용어입니다.',
      script:
        '근데 재밌는 게 간격이에요. 1956년부터 2012년까지 딥러닝이 터지기까지 56년이 걸렸는데, 2022년부터 지금 2026년까지 4년 사이에 대중화, 멀티모달, 추론 모델, Agent까지 연쇄적으로 터졌어요. 이 간격이 점점 좁아지는 게 보이시나요?',
      analogy: '예전엔 10년에 한 번 큰 사건이 터졌는데, 요즘은 1년에 한 번씩 터지는 느낌이에요.',
      transition: '그럼 "규칙을 외우던 AI"에서 "스스로 배우는 AI"로, 뭐가 바뀐 건지 짚어볼게요.',
      durationMinutes: 3,
    },
  },
  {
    id: 'hist-2',
    section: 'HISTORY',
    minutes: 3,
    kind: 'content',
    title: '규칙을 외우던 AI에서,\n스스로 배우는 AI로',
    visual: {
      kind: 'compare',
      left: { title: '예전 AI', items: ['사람이 규칙을 하나하나 입력', '예: "이 단어 있으면 스팸"'] },
      right: { title: '요즘 AI', items: ['데이터에서 스스로 패턴 학습', '예: 스팸 메일 수만 건 보고 학습'] },
    },
    presenterScript: '수식 없이 "규칙을 누가 만드냐"의 차이로 설명.',
    speakerScript: {
      intro: '1997년 딥블루가 체스 챔피언을 이긴 것, 그거 사람이 규칙을 다 입력한 거예요.',
      script:
        '규칙 기반 AI는 "이러면 이렇게 해"를 사람이 다 적어줘야 했어요. 근데 머신러닝, 딥러닝으로 오면서 컴퓨터가 데이터만 보고 알아서 규칙을 찾아내게 됐습니다. 2012년에 딥러닝이 이미지 인식 대회에서 압도적으로 이기면서 "이거다!" 하는 전환점이 왔어요.',
      keyConcept: '규칙을 누가 만드는가 — 사람(규칙 기반) vs 데이터(머신러닝·딥러닝)',
      transition: '그리고 2017년에 또 하나 터집니다 — Transformer라는 구조예요.',
      durationMinutes: 3,
    },
  },
  {
    id: 'hist-3',
    section: 'HISTORY',
    minutes: 2,
    kind: 'content',
    title: '그리고 2022년,\n모두가 이걸 쓰기 시작했다',
    screenText: '공개 3년 만에 인구 53%가 사용 — PC·인터넷보다 빨랐습니다.',
    visual: {
      kind: 'gauge',
      label: '대중 공개 후 3년 내 인구 대비 사용률',
      filledPct: 53,
      caption: 'Stanford AI Index 2026 — PC·인터넷이 비슷한 보급률에 도달한 속도보다 빠른 확산',
    },
    presenterScript: '여기서 LLM이라는 단어를 처음 자연스럽게 소개하세요.',
    speakerScript: {
      intro: '2017년 기술은 있었는데, 왜 우리가 체감한 건 2022년이었을까요?',
      script:
        '2022년 11월, "대화하듯 질문만 하면 되는" 서비스가 공개되면서 누구나 AI를 쓸 수 있게 됐어요. 이런 대화형 AI를 LLM(거대 언어 모델)이라고 부릅니다. 스탠퍼드 AI Index 2026 보고서를 보면, 공개된 지 3년 만에 인구의 53%가 쓰고 있어요. PC나 인터넷보다 더 빨랐습니다.',
      keyConcept: 'LLM — 방대한 글을 학습해서 다음에 올 내용을 예측하는 모델',
      transition: '근데 "다음 내용을 예측한다"는 게 정확히 뭘까요?',
      durationMinutes: 2,
    },
  },
  {
    id: 'hist-4',
    section: 'HISTORY',
    minutes: 2,
    kind: 'content',
    title: 'AI는 어떻게\n다음 말을 알아낼까?',
    screenText: '단어가 아니라, "토큰" 단위로 생각합니다.',
    visual: { kind: 'flow-row', items: ['수많은 글 학습', '다음 조각(토큰) 예측', '문장 완성'] },
    presenterScript: '여기서 Token 개념을 짧게. 깊이 들어가지 않기.',
    speakerScript: {
      intro: '"오늘 점심 메뉴는" 다음에 뭐가 올지, AI는 어떻게 알까요?',
      script:
        'AI는 문장을 단어가 아니라 "토큰"이라는 더 작은 조각 단위로 봐요. 그리고 수많은 글을 학습해서, 지금까지 나온 내용 다음에 어떤 토큰이 올 확률이 높은지 계산합니다. 그래서 "검색"이 아니라 "예측"이라는 표현을 쓰는 거예요.',
      keyConcept: 'Token — 문장을 쪼갠 최소 단위, 단어와 꼭 일치하진 않음',
      transition: '근데 이 "예측"이라는 방식 때문에 생기는 문제가 하나 있어요.',
      durationMinutes: 2,
    },
  },
  {
    id: 'hist-5',
    section: 'HISTORY',
    minutes: 3,
    kind: 'quiz',
    quizType: 'OX',
    title: 'AI가 이렇게\n자신 있게 틀린다고?',
    context: 'AI를 처음 접하는 분들이 가장 많이 하는 오해 중 하나를 확인해보겠습니다.',
    question: 'AI는 모르는 내용에 대해서는 "모른다"고 솔직하게 답하는 경우가 대부분이다 — 맞을까요, 틀릴까요?',
    options: ['O', 'X'],
    optionNotes: [
      '이렇게 생각하기 쉽지만 실제로는 다릅니다 — 모델에는 "내가 이걸 모른다"를 스스로 판단하는 별도 장치가 없습니다.',
      '정답입니다. 모델은 다음에 올 그럴듯한 내용을 예측하도록 학습되어 있어서, 모를 때도 확신 있는 어조로 답을 "만들어내는" 경우가 많습니다.',
    ],
    correctIndex: 1,
    explanation:
      '이걸 "할루시네이션"이라고 부릅니다. 거짓말이 아니라, 다음에 올 그럴듯한 내용을 확률적으로 예측하는 과정의 부작용이에요.',
    relatedConcept: 'hallucination',
    learningPoint: 'AI가 자신 있게 말한다고 다 맞는 건 아닙니다 — 이게 오늘 강의 후반부의 핵심 메시지로 이어집니다.',
    presenterScript: '오답 고른 이유까지 짚어주며, 뒤에 나올 "검증" 메시지를 예고.',
    speakerScript: {
      intro: '자, 퀴즈 하나 풀고 가겠습니다.',
      script:
        '정답은 X예요. AI는 모를 때도 "모른다"고 하지 않고, 그럴듯한 답을 자신 있게 만들어내는 경우가 많습니다. 이걸 "할루시네이션"이라고 불러요. 저도 이것 때문에 나중에 제대로 한 번 당했는데, 그 얘기는 조금 뒤에 자세히 해드릴게요.',
      transition: '일단 지금은, 이게 여러분 업무랑도 관련 있다는 얘기부터 해볼게요 — 반도체 얘기입니다.',
      durationMinutes: 3,
    },
  },
  {
    id: 'hist-6',
    section: 'HISTORY',
    minutes: 2,
    kind: 'content',
    title: '반도체랑\n이게 무슨 상관이야?',
    screenText: 'AI가 커질수록, 연산·메모리·전력 수요가 함께 커집니다.',
    visual: {
      kind: 'flow-row',
      items: ['AI 모델 확대', '연산 수요 증가', 'GPU 가속기', '고대역폭 메모리', '전력·냉각·인프라'],
    },
    presenterScript: '여기가 제조업 참석자와 가장 직접 연결되는 지점 — 강조.',
    speakerScript: {
      intro: '자, 이제 반도체·제조업 여러분과 가장 가까운 얘기입니다.',
      script:
        'AI 모델이 커지고 많이 쓰일수록 연산량이 폭발적으로 늘어요. 그러면 GPU 같은 가속기가 더 필요해지고, 데이터를 빨리 주고받을 고대역폭 메모리도 중요해집니다. 근데 "모델 커지면 반도체 무조건 많이 팔린다"는 단순한 얘기가 아니에요. 전력, 냉각, 패키징, 데이터센터까지 다 같이 받쳐줘야 하는 복합적인 문제입니다.',
      transition: '자, 역사 얘기는 여기까지. 이제 진짜 재밌는 부분, Agent 얘기로 들어가 볼게요.',
      durationMinutes: 2,
    },
  },

  // ═════════════ AGENT (25~40분, 4 화면) ═════════════
  {
    id: 'agent-1',
    section: 'AGENT',
    minutes: 2,
    kind: 'content',
    title: 'AI랑 그냥 대화하는 거랑\n뭐가 다른데?',
    screenText: '똑같이 부탁해도, 결과가 완전히 다릅니다.',
    visual: {
      kind: 'compare',
      left: { title: 'Chatbot', items: ['물어보면 답해준다'] },
      right: { title: 'AI Agent', items: ['목표를 주면 끝까지 처리한다'] },
    },
    presenterScript: '다음 화면에서 직접 버튼 눌러 비교한다고 예고.',
    speakerScript: {
      intro: '"어차피 AI한테 물어보는 거 다 똑같지 않아요?" 라고 생각하실 수 있어요.',
      script: '똑같은 부탁을 Chatbot한테 하는 거랑, Agent한테 하는 거랑 결과가 완전히 다릅니다. 말로 설명하는 것보단, 직접 버튼 눌러서 보여드리는 게 빠를 것 같아요.',
      transition: '자, 직접 눌러볼게요.',
      durationMinutes: 2,
    },
  },
  {
    id: 'agent-2',
    section: 'AGENT',
    minutes: 9,
    kind: 'interactive-embed',
    componentKey: 'chatbot-vs-agent',
    title: 'Chatbot vs AI Agent',
    presenterScript: 'Chatbot 모드를 끝까지 보여준 뒤 Agent 모드로 전환. 마지막엔 "전체 과정 비교".',
    speakerScript: {
      intro: '똑같이 "조직문화 행사 준비해줘"라고 부탁했다고 해볼게요.',
      script:
        'Chatbot 모드를 눌러보면, 체크리스트를 만들어주고 끝입니다. 그다음부터는 제가 직접 일정 확인하고 사람 모으고 다 해야 돼요. 이제 Agent 모드를 눌러볼게요. 목표만 주면 계획을 세우고, 진짜 캘린더랑 참석자 데이터까지 가져다가 단계별로 처리를 해요. 마지막엔 저한테 "이렇게 해도 될까요?" 하고 승인을 받으러 옵니다.',
      question: '둘 중에 어느 쪽이 더 "일을 시키는" 느낌이 드시나요?',
      analogy: 'Chatbot은 "검색 잘하는 후배", Agent는 "일 맡기면 알아서 진행하고 중간중간 보고하는 대리" 같은 느낌이에요.',
      keyConcept: '챗봇도 도구를 쓸 수 있어서 완전히 둘로 나뉘는 건 아니에요 — 오늘은 개념적 차이만 짚고 갑니다.',
      clickTiming: 'Chatbot 모드 "다음 단계"를 끝까지 → Agent 모드로 전환 → "전체 과정 비교"로 마무리.',
      transition: '그럼 이 Agent가 실제로 "코딩"까지 할 수 있다는 건 무슨 뜻일까요? AI가 캘린더나 문서함에 어떻게 연결되는지부터 짚고 갈게요.',
      durationMinutes: 9,
    },
  },
  {
    id: 'agent-3',
    section: 'AGENT',
    minutes: 2,
    kind: 'content',
    title: 'AI가 캘린더랑 문서함을\n어떻게 연결하지?',
    screenText: '이 연결 통로를 API라고 부릅니다.',
    visual: { kind: 'flow-row', items: ['AI Agent', 'API (연결 통로)', '캘린더·문서함·데이터베이스'] },
    presenterScript: 'API는 딱 한 줄로만. 깊이 들어가지 않기.',
    speakerScript: {
      intro: 'Agent가 캘린더나 회사 문서를 "가져다 쓴다"고 했잖아요, 어떻게 연결되는 걸까요?',
      script: '이런 연결 통로를 API라고 불러요. 식당 주방과 손님 사이를 오가는 종업원처럼, 두 시스템 사이에서 요청과 응답을 전달하는 역할입니다. AI Agent가 일을 "끝까지" 할 수 있는 이유가 바로 이 연결 덕분이에요.',
      keyConcept: 'API — 서로 다른 프로그램을 연결하는 약속된 통로',
      transition: '자, 그럼 오늘 본 Agent 얘기, 한 줄로 정리하고 넘어갈게요.',
      durationMinutes: 2,
    },
  },
  {
    id: 'agent-4',
    section: 'AGENT',
    minutes: 2,
    kind: 'content',
    title: '핵심: Agent는\n계획까지 세운다',
    screenText: '대화가 아니라, 일을 "맡기는" 방식입니다.',
    visual: { kind: 'checklist', items: ['목표를 받아 계획을 세운다', '도구를 써서 단계별로 처리한다', '마지막엔 사람의 승인을 받는다'] },
    presenterScript: '짧게 정리하고 바로 바이브코딩으로 넘어가기.',
    speakerScript: {
      intro: 'Chatbot vs Agent, 한 줄로 정리하면 이거예요.',
      script: 'Agent는 목표를 받으면 계획을 세우고, 도구를 써서 단계별로 처리하고, 마지막엔 사람 승인을 받습니다. "대화"가 아니라 "일을 맡기는" 방식이라는 거죠.',
      transition: '근데 이 Agent가 진짜 "코딩"까지 한다는 게 무슨 뜻이냐, 제가 직접 겪은 걸로 보여드릴게요.',
      durationMinutes: 2,
    },
  },

  // ═════════════ VIBECODING (40~50분, 3 화면) ═════════════
  {
    id: 'vibe-1',
    section: 'VIBECODING',
    minutes: 5,
    kind: 'content',
    title: '코딩을 모르는데\n웹사이트를 만들었다고?',
    screenText: '말로 설명했더니, 진짜 웹사이트가 나왔습니다.',
    visual: { kind: 'vibe-coding-process' },
    presenterScript: '"다음" 눌러 프롬프트→코드→실행 순서로. 코드 단계에서 "몰라도 돼요" 꼭 언급.',
    speakerScript: {
      intro: '자, 이제 진짜 "말로 코딩하기"를 보여드릴게요.',
      script:
        '제가 한 건 딱 이거예요 — "타자연습 게임 만들어줘, 1분 동안 단어 치기"라고 말로 설명했습니다. AI가 코드를 써줘요. 저는 그 코드가 뭔지 자세히는 몰라도 됩니다. "실행해봐" 하면 진짜 웹사이트가 열려요. 물론 한 번에 완벽하진 않았어요 — 처음엔 타이머가 안 멈추는 버그가 있었는데, "타이머가 안 멈춰"라고 다시 말했더니 고쳐줬습니다.',
      question: '여러분이 평소에 "이런 거 하나 있으면 편할 텐데" 싶었던 게 있으신가요?',
      analogy: '레고를 설명서 없이, "이런 모양으로 만들어줘"라고 말하면 조립까지 해주는 느낌이에요.',
      keyConcept: '바이브 코딩 — 자연어로 요청해서 실제로 동작하는 소프트웨어를 만드는 방식',
      transition: '근데 이게 다 쉬웠을까요? 사실 저도 "왜 다들 안 쓰지?" 싶었던 이유가 있었어요.',
      durationMinutes: 5,
    },
  },
  {
    id: 'vibe-2',
    section: 'VIBECODING',
    minutes: 2,
    kind: 'content',
    title: '이렇게 쉬운데,\n왜 다들 안 쓸까?',
    screenText: '어려워 보여서, 시작을 안 하는 경우가 많습니다.',
    visual: {
      kind: 'compare',
      left: { title: '시작 전', items: ['개발 환경 설치가 어렵게 느껴짐', '터미널·명령어가 낯섦', '뭘 입력해야 할지 모름'] },
      right: { title: '첫 성공 후', items: ['"이것도 되네?" 하는 자신감', '새 아이디어가 막 떠오름'] },
    },
    presenterScript: '"모든 사람에게 쉽다"고 일반화하지 않기.',
    speakerScript: {
      intro: '저도 처음엔 시작하는 게 제일 어려웠어요.',
      script: '개발 도구 설치하는 것도 낯설고, 터미널 같은 화면 보면 겁부터 났습니다. 근데 일단 첫 결과물 하나 만들고 나니까, 그다음부터는 "이것도 되나?", "저것도 해볼까?" 하는 아이디어가 막 떠오르더라고요. 물론 모든 분이 저만큼 쉽게 느끼실 거라곤 장담 못 합니다.',
      transition: '그럼 "거창한 프로젝트"가 아니어도 된다는 걸, 제가 제일 처음 만든 걸로 보여드릴게요.',
      durationMinutes: 2,
    },
  },
  {
    id: 'vibe-3',
    section: 'VIBECODING',
    minutes: 3,
    kind: 'content',
    title: '거창한 프로젝트가\n아니어도 됩니다',
    screenText: '불편했던 작은 일 하나, 그게 시작이면 됩니다.',
    visual: {
      kind: 'compare',
      left: { title: 'Before', items: ['메신저로 커피 주문 취합', '주문 누락·수량 확인 문제'] },
      right: { title: 'After', items: ['주문 취합 웹사이트 제작', '신청·메뉴선택·관리자 확인'] },
    },
    presenterScript: '효과 수치는 말하지 않기 — 측정한 적 없음.',
    speakerScript: {
      intro: '제가 제일 처음 만든 건 거창한 게 아니라, 커피 주문 취합 사이트였어요.',
      script:
        '회사에서 커피 주문받을 때 메신저로 하다 보면 누락되고, 수량 헷갈리고 그랬거든요. 그래서 "이거 좀 불편한데" 싶어서 신청 화면이랑 메뉴 선택, 관리자 확인 기능 있는 웹사이트를 만들어봤어요. UI 수정하고 오류 고치는 과정도 몇 번 있었죠.',
      keyConcept: '거창한 AI 프로젝트가 아니어도 됩니다. 내가 불편했던 작은 일 하나 해결하는 것부터 시작하면 됩니다.',
      transition: '자, 10분 쉬어가겠습니다. 쉬는 동안 직접 체험해보실 수 있는 Playground 3가지를 준비했어요.',
      durationMinutes: 3,
    },
  },

  // ═════════════ BREAK ═════════════
  {
    id: 'BREAK',
    section: 'BREAK',
    minutes: 10,
    kind: 'section-break',
    title: 'AI PLAYGROUND',
    keyMessage: '10분간 자유롭게 체험해보세요',
    bullets: [
      'A. 나의 AI 활용 스타일 찾기',
      'B. 프롬프트 업그레이드 챌린지 (지금 보고 있는 "프롬프트 개선 시뮬레이터")',
      'C. AI Agent 업무 시뮬레이터 (지금 보고 있는 "Chatbot vs AI Agent")',
    ],
    presenterScript: '발표를 멈추고 자유롭게 이동하며 개별 질문에 대응하세요.',
  },

  // ═════════════ REALITY (60~80분, 4 화면) ═════════════
  {
    id: 'real-1',
    section: 'REALITY',
    minutes: 8,
    kind: 'content',
    title: 'AI 써보면\n다들 겪는 감정 곡선',
    screenText: '놀라움 → 과신 → 좌절 → 성숙. 눌러서 따라가 보세요.',
    visual: { kind: 'confidence-curve' },
    presenterScript: '"다음 단계" 누를 때마다 곡선이 그려집니다. "좌절" 구간에서 반응 기다리기.',
    speakerScript: {
      intro: '이거 저만 겪은 게 아니라, AI 써보신 분들 다 비슷한 곡선을 그리시더라고요.',
      script:
        '처음엔 "와, 이게 된다고?" 하는 놀라움이에요. 그다음 단계가 위험해요 — "이제 AI면 다 되겠는데?" 하는 과신입니다. 새 기능을 막 요구하기 시작하죠. 그러다 갑자기 오류가 나기 시작하고, 수정하면 다른 기능이 망가지고, 같은 에러가 반복돼요. 이게 좌절 구간입니다. 근데 여기서 포기하지 않고 기능을 작게 나눠서 하나씩 검증하기 시작하면 — 그게 성숙 단계예요.',
      question: '혹시 벌써 "좌절" 구간까지 가보신 분 있으세요?',
      keyConcept: '이 곡선은 실증 연구가 아니라, 경험을 쉽게 설명하기 위한 비유입니다.',
      transition: '이거 비슷한 패턴, 사실 다른 데서도 본 적 있어요 — 패션 얘기입니다.',
      durationMinutes: 8,
    },
  },
  {
    id: 'real-2',
    section: 'REALITY',
    minutes: 3,
    kind: 'content',
    title: '패션이랑\nAI 활용의 공통점',
    screenText: '처음엔 무난하게, 그다음엔 과하게, 결국엔 필요한 것만.',
    visual: { kind: 'flow-row', items: ['깔끔·단순', '기능·장식 과다', '필요한 것만 선택'] },
    presenterScript: '가벼운 웃음 포인트로 활용.',
    speakerScript: {
      intro: '패션도 처음에는 무난하게 잘 입다가, 관심이 깊어지면 어느 순간 너무 난해한 스타일에 빠질 때가 있잖아요.',
      script: 'AI도 비슷해요. 처음엔 간단하게 시작했다가, 재밌어지면 기능을 막 집어넣다가 결국 복잡해지고, 그다음엔 "필요한 것만 남기자"는 단계로 갑니다. 딱 아까 본 자신감 곡선의 "과신 → 성숙" 구간이랑 똑같아요.',
      transition: '그럼 그 "성숙 단계"에서 뭘 했는지 — AI 답변을 그대로 믿으면 안 되는 이유, 직접 체험해보시죠.',
      durationMinutes: 3,
    },
  },
  {
    id: 'real-3',
    section: 'REALITY',
    minutes: 5,
    kind: 'verification-mini',
    title: 'AI 결과물,\n그대로 믿어도 될까?',
    keyMessage: '사실·오류·근거부족을 구분하는 눈이 필요하다',
    bullets: ['문장을 하나씩 클릭해 상태를 확인해보세요'],
    presenterScript: '"틀린 걸 찾는 게임"으로 진행. 정답 공개 후 검증 방법 요약.',
    speakerScript: {
      intro: '아까 "AI가 자신 있게 틀린다" 얘기했잖아요, 직접 한번 찾아볼까요?',
      script: '아래 문장들 중에 확인된 사실, 오류, 근거 부족이 섞여 있어요. 하나씩 클릭해서 맞혀보세요. 숫자가 너무 딱 맞아떨어지거나, 출처가 그 자리에서 뚝 나오면 일단 의심하셔야 됩니다.',
      transition: '그래서 결국, AI를 잘 쓰는 사람과 그렇지 않은 사람의 차이가 뭘까요?',
      durationMinutes: 5,
    },
  },
  {
    id: 'real-4',
    section: 'REALITY',
    minutes: 4,
    kind: 'content',
    title: '중요한 건\n믿는 게 아니라 검증하는 것',
    visual: {
      kind: 'compare',
      left: { title: 'AI가 잘하는 일', items: ['빠른 초안·반복 작업', '여러 아이디어 빠르게 시도'] },
      right: { title: '사람이 확인할 일', items: ['결과가 맞는지 검증', '최종 책임과 판단'] },
    },
    presenterScript: '왼쪽부터 가리키고 오른쪽으로 넘어가며 설명.',
    speakerScript: {
      intro: '자, 오늘 강의에서 제일 하고 싶었던 말이 이거예요.',
      script:
        'AI는 생각보다 훨씬 많은 걸 할 수 있어요. 근데 모든 문제를 다 해결해주는 건 아니에요. 제가 좌절 구간에서 배운 건 딱 하나예요 — AI를 무조건 믿는 게 아니라, 반복해서 수정하고 검증하는 거예요. AI가 잘하는 일은 초안을 빠르게 만들고 반복 작업을 하는 거고, 사람이 할 일은 그 결과가 맞는지 확인하고 책임지는 거예요.',
      keyConcept: '중요한 건 믿는 능력이 아니라 검증하는 능력',
      transition: '그럼 이제, 이걸 실제 업무에 어떻게 적용하는지 사례로 보여드릴게요.',
      durationMinutes: 4,
    },
  },

  // ═════════════ CASES (80~100분, 5 화면) ═════════════
  {
    id: 'case-1',
    section: 'CASES',
    minutes: 1,
    kind: 'content',
    title: '매주 반복하는 그 업무,\n아직도 직접 하세요?',
    visual: {
      kind: 'icon-grid',
      items: [
        { icon: 'FileText', label: '회의록 정리' },
        { icon: 'ListChecks', label: 'VOC 분류' },
        { icon: 'GitBranch', label: '일정 충돌 확인' },
        { icon: 'MessageSquare', label: '프롬프트 제대로 시키기' },
      ],
    },
    presenterScript: '빠르게 넘기고 바로 사례로.',
    speakerScript: {
      intro: '자 이제 진짜 업무 얘기로 가볼게요.',
      script: '오늘 네 가지 사례를 보여드릴 거예요 — 회의록 정리, VOC 분류, 일정 충돌 확인, 그리고 AI한테 일을 "제대로" 시키는 법까지요.',
      transition: '먼저 회의록부터 가볼게요.',
      durationMinutes: 1,
    },
  },
  {
    id: 'case-2',
    section: 'CASES',
    minutes: 3,
    kind: 'content',
    title: '회의록 정리,\n이렇게 달라집니다',
    visual: {
      kind: 'compare',
      left: { title: '"회의록 정리해줘"', items: ['모호하고 일반적인 요약'] },
      right: { title: '목적·형식·검증기준 추가', items: ['결정/보류/액션으로 구조화', '불확실한 건 "확인 필요"로 표시'] },
    },
    presenterScript: '같은 요청, 요소 추가로 결과가 달라진다는 점 강조.',
    speakerScript: {
      intro: '"회의록 정리해줘"라고만 하면 어떻게 될까요?',
      script: '그냥 두면 AI가 대충 뭉뚱그려서 요약해요. 근데 "참석자 공유용으로, 결정 사항과 후속 조치를 표로 구분해서, 불분명한 건 확인 필요로 표시해줘"라고 하면 완전히 달라집니다. 이게 바로 "AI한테 일을 제대로 시키는 사람"이 하는 거예요.',
      keyConcept: 'AI도 일을 제대로 시키는 사람이 따로 있다',
      transition: '이번엔 좀 더 양이 많은 업무, VOC 분류 가볼게요.',
      durationMinutes: 3,
    },
  },
  {
    id: 'case-3',
    section: 'CASES',
    minutes: 4,
    kind: 'content',
    title: 'VOC 100건,\n하나씩 다 읽으세요?',
    screenText: '분류는 AI가, 최종 확인은 사람이.',
    visual: { kind: 'flow-row', items: ['VOC 원문 100건', 'AI가 카테고리 제안', '유사 의견 묶기', '사람이 최종 검증'] },
    presenterScript: '원문 보존·최종 검증 필요성 언급. 여기서 RAG를 짧게.',
    speakerScript: {
      intro: 'VOC 100건을 사람이 하나씩 읽고 분류하려면 얼마나 걸릴까요?',
      script:
        'AI한테 시키면 카테고리 제안하고, 비슷한 의견끼리 묶고, 개선 과제 초안까지 만들어줘요. 다만 원문은 그대로 보존하고, 최종 분류가 맞는지는 사람이 확인해야 합니다. 참고로 이걸 회사 내부 문서랑 연결해서 "이 문서 찾아서 답해줘"까지 하면, 그 구조를 RAG라고 불러요.',
      keyConcept: 'RAG — 질문과 관련된 문서를 먼저 찾아서, 그 내용을 근거로 답하게 하는 구조',
      transition: '이번엔 여러분 업무랑 더 가까운 제조 현장 얘기로 가볼게요.',
      durationMinutes: 4,
    },
  },
  {
    id: 'case-4',
    section: 'CASES',
    minutes: 3,
    kind: 'content',
    title: '제조 현장에서도,\n이미 시작됐습니다',
    visual: {
      kind: 'icon-grid',
      items: [
        { icon: 'GitBranch', label: '생산 일정 충돌 확인' },
        { icon: 'FileText', label: '생산 실적 보고서 초안' },
        { icon: 'Wrench', label: '설비 점검 기록 분류' },
        { icon: 'ListChecks', label: 'VOC 분석' },
        { icon: 'BookOpen', label: '작업 지침 검색·확인 보조' },
      ],
    },
    presenterScript: '검증되지 않은 생산성 수치는 절대 말하지 않기.',
    speakerScript: {
      intro: '제조 현장에도 적용될 수 있는 영역이 꽤 많아요.',
      script: '일정 충돌 확인, 보고서 초안, 설비 점검 기록 분류, VOC 분석, 작업 지침 검색까지요. 다만 각 영역마다 사람이 검증할 부분이 분명히 있고, 보안이나 현장 적용 제약도 있습니다. 구체적인 생산성 향상 수치는 실제로 측정한 게 없어서 말씀드리지 않겠습니다.',
      transition: '자, 그럼 "AI한테 일을 제대로 시키는 법", 직접 체험해볼게요.',
      durationMinutes: 3,
    },
  },
  {
    id: 'case-5',
    section: 'CASES',
    minutes: 9,
    kind: 'interactive-embed',
    componentKey: 'prompt-improvement',
    title: 'AI도 일을 제대로 시키는\n사람이 따로 있다',
    presenterScript: '참석자에게 다음 추가할 요소를 투표식으로 물어보며 진행.',
    speakerScript: {
      intro: '"회의 내용을 정리해줘" 같은 부실한 요청에, 요소를 하나씩 더해볼게요.',
      script:
        '목적, 배경, 독자, 제약, 출력 형식, 검증 기준 — 이 여섯 가지를 하나씩 눌러보면서 결과가 어떻게 달라지는지 같이 보시죠. "그냥 쓰는 것"과 "제대로 시키는 것"의 차이가 여기서 확 느껴집니다.',
      clickTiming: '요소를 하나씩 추가할 때마다 오른쪽 결과물이 바뀌는 걸 보여주고, 마지막에 "처음 vs 최종 비교"로 마무리.',
      transition: '자, 이제 여러분도 집에서 시작할 수 있는 방법, 5단계로 정리해드릴게요.',
      durationMinutes: 9,
    },
  },

  // ═════════════ STARTHOME (100~110분, 2 화면) ═════════════
  {
    id: 'home-1',
    section: 'STARTHOME',
    minutes: 6,
    kind: 'content',
    title: '집에서 시작하는\n5단계',
    visual: {
      kind: 'flow-row',
      items: ['개발 도구 설치', 'AI 개발 도구 실행', '아이디어 설명', '실행·수정', 'GitHub로 배포'],
    },
    presenterScript: '각 단계마다 "뭐 하는지 / 주의할 점"을 간단히. 설치 절차는 길게 설명하지 않기 — 별도 가이드 안내.',
    speakerScript: {
      intro: '복잡한 개발 강의, 필요 없습니다. 딱 5단계만 보여드릴게요.',
      script:
        '첫째, VS Code 같은 개발 도구를 설치합니다. 둘째, Claude Code 같은 AI 개발 도구를 실행해요. 셋째, 만들고 싶은 아이디어를 말로 설명합니다. 넷째, 나온 결과를 실행해보고 안 되는 부분은 다시 수정 요청합니다. 다섯째, 마음에 들면 GitHub 같은 곳에 배포해서 다른 사람도 쓸 수 있게 합니다. 설치 과정은 컴퓨터나 계정, 요금제에 따라 다를 수 있어서, 자세한 건 별도 가이드로 안내드릴게요.',
      transition: '시작 전에, 딱 하나만 더 당부드리고 싶은 게 있어요.',
      durationMinutes: 6,
    },
  },
  {
    id: 'home-2',
    section: 'STARTHOME',
    minutes: 4,
    kind: 'content',
    title: '시작 전에,\n이것만은 알고 가세요',
    visual: {
      kind: 'warning-list',
      items: [
        '처음엔 막막해도 정상입니다 — 첫 결과물까지가 제일 어렵습니다',
        '한 번에 완벽한 결과가 나오는 경우는 드뭅니다 — 반복 수정이 기본입니다',
        '회사 업무에 쓸 땐, 보안·개인정보 정책을 먼저 확인하세요',
      ],
    },
    presenterScript: '초보자 주의점 간단히 — 길게 끌지 않기.',
    speakerScript: {
      intro: '딱 세 가지만 당부드릴게요.',
      script: '처음엔 막막한 게 정상이고, 한 번에 완벽한 결과가 나오는 경우는 거의 없어요. 그리고 회사 업무에 쓰실 땐 반드시 보안·개인정보 정책부터 확인하세요. 이것만 기억하시면 됩니다.',
      transition: '자, 이제 마무리할게요.',
      durationMinutes: 4,
    },
  },

  // ═════════════ CLOSING (110~120분, 3 화면) ═════════════
  {
    id: 'close-1',
    section: 'CLOSING',
    minutes: 3,
    kind: 'quiz',
    quizType: 'MCQ',
    title: 'AI를 잘 쓰는 사람과\n그렇지 않은 사람의 차이는?',
    context: '오늘 다룬 Agent, 바이브 코딩, 자신감 곡선, 검증까지 — 이 모든 내용을 하나로 꿰면 어떤 역량이 남을까요?',
    question: '오늘 강의 내용을 종합하면, AI 시대에 가장 중요해지는 역량은 무엇일까요?',
    options: [
      'AI보다 더 빠르게 타이핑하는 능력',
      '해결할 문제를 명확히 정의하고, AI 결과를 검증하는 능력',
      'AI를 아예 사용하지 않는 능력',
      '모든 프로그래밍 언어를 외우는 능력',
    ],
    optionNotes: [
      '타이핑 속도는 보조적인 요소일 뿐, 핵심 역량으로 보기는 어렵습니다.',
      '정답입니다. 오늘 다룬 모든 사례가 결국 "문제 정의"와 "검증" 두 가지로 귀결됩니다.',
      'AI를 사용하지 않는 것은 경쟁력이 아니라 기회비용입니다.',
      '언어를 외우는 것보다, 무엇을 만들지 정의하고 검증하는 능력이 더 오래 유효합니다.',
    ],
    correctIndex: 1,
    explanation: '문제를 명확히 정의하고 결과를 검증하는 능력 — 이게 오늘 강의 전체를 관통하는 메시지입니다.',
    relatedConcept: 'prompt',
    presenterScript: '참석자가 먼저 맞춰보게 유도한 뒤 정답 공개.',
    speakerScript: {
      intro: '마지막 퀴즈입니다.',
      script: '오늘 본 Agent, 바이브 코딩, 자신감 곡선, 검증 게임 — 이걸 다 꿰면 결국 하나로 모여요. "문제를 명확히 정의하고, 결과를 검증하는 능력"입니다.',
      transition: '자, 오늘 강의를 한 문장으로 정리하면 이렇습니다.',
      durationMinutes: 3,
    },
  },
  {
    id: 'close-2',
    section: 'CLOSING',
    minutes: 3,
    kind: 'content',
    title: '결국,\n이 한 문장입니다',
    screenText: 'AI를 잘 쓰는 사람은, 모든 답을 아는 사람이 아니라 문제를 정의하고 검증할 줄 아는 사람입니다.',
    presenterScript: '인용구를 천천히 낭독.',
    speakerScript: {
      intro: '오늘 강의, 이 한 문장으로 정리하고 싶어요.',
      script: '"AI를 잘 사용하는 사람은 모든 답을 아는 사람이 아니라, 해결할 문제를 명확하게 정의하고 결과를 검증할 줄 아는 사람입니다." 이거 하나만 기억하고 가셔도 오늘 강의는 충분합니다.',
      transition: '자, 이제 여러분 차례입니다.',
      durationMinutes: 3,
    },
  },
  {
    id: 'close-3',
    section: 'CLOSING',
    minutes: 4,
    kind: 'content',
    title: '여러분의 차례입니다',
    screenText: '매주 반복하는 업무 중, AI로 개선할 수 있는 일은 무엇일까요?',
    presenterScript: '2~3명 응답 받고 Q&A로 전환.',
    speakerScript: {
      intro: '마지막으로 질문 하나 드리고 싶어요.',
      script: '여러분이 매주 반복하는 업무 중에, AI로 한번 개선해볼 만한 게 있을까요? 거창한 거 아니어도 됩니다. 제 커피 주문 사이트처럼, 작은 불편함 하나면 충분해요.',
      question: '여러분이 매주 반복하는 업무 중 AI로 개선할 수 있는 일은 무엇일까요?',
      transition: '자, 그럼 질문 받겠습니다. 오늘 들어주셔서 감사합니다!',
      durationMinutes: 4,
    },
  },
]

export const totalSlides = slides.length
