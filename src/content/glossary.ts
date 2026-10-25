// 전역 용어 도움말(Glossary Mode)에서 사용하는 단일 출처(source of truth) 데이터입니다.
// 모든 슬라이드·화면은 이 배열만 참조하므로, 정의는 여기서 한 번만 수정하면 전체에 반영됩니다.
export interface GlossaryTermData {
  id: string
  term: string
  definition: string
  analogy: string
  example: string
}

export const glossaryTerms: GlossaryTermData[] = [
  {
    id: 'llm',
    term: 'LLM (거대 언어 모델)',
    definition:
      '방대한 글 데이터를 학습해 문맥에 맞는 다음 내용을 예측하도록 만들어진 대규모 AI 모델입니다.',
    analogy: '수백만 권의 책을 읽고 "다음에 올 가장 자연스러운 말"을 맞히는 데 능숙해진 사람과 비슷합니다.',
    example: '보고서 초안 작성, 이메일 답장 제안, 회의록 요약 등에 쓰이는 모델이 대부분 LLM입니다.',
  },
  {
    id: 'token',
    term: 'Token (토큰)',
    definition:
      'LLM이 글을 처리할 때 사용하는 최소 단위로, 단어·음절·기호의 조각일 수 있습니다.',
    analogy: '문장을 레고 블록처럼 잘게 쪼갠 조각 하나하나를 토큰이라고 생각하면 됩니다.',
    example: '같은 분량의 보고서라도 토큰 수에 따라 AI가 한 번에 처리할 수 있는 길이가 달라집니다.',
  },
  {
    id: 'transformer',
    term: 'Transformer (트랜스포머)',
    definition:
      '문장 전체의 맥락을 한 번에 고려해 중요한 부분에 "주의(Attention)"를 기울이는 신경망 구조입니다.',
    analogy: '문장을 앞에서부터 한 글자씩 읽는 게 아니라, 전체 문단을 훑어보고 핵심 연결고리를 한눈에 파악하는 방식입니다.',
    example: '2017년 이후 대부분의 생성형 AI(글, 이미지, 음성)가 이 구조를 기반으로 만들어집니다.',
  },
  {
    id: 'inference',
    term: 'Inference (추론)',
    definition: '이미 학습이 끝난 모델이 새로운 입력에 대해 실제로 답을 생성하는 "사용" 단계를 말합니다.',
    analogy: '시험 공부(학습)가 끝난 뒤, 실제 시험장에서 문제를 푸는 순간이 추론입니다.',
    example: '우리가 챗봇에 질문을 입력하고 답을 받는 모든 순간이 추론 과정입니다.',
  },
  {
    id: 'hallucination',
    term: 'Hallucination (할루시네이션)',
    definition:
      'AI가 그럴듯하지만 사실이 아닌 내용을 확신 있는 말투로 만들어내는 현상입니다.',
    analogy: '시험에서 모르는 문제도 일단 그럴듯하게 답을 채워 넣는 학생과 비슷합니다.',
    example: '존재하지 않는 보고서 제목이나 틀린 통계를 AI가 자연스럽게 제시하는 경우가 대표적입니다.',
  },
  {
    id: 'rag',
    term: 'RAG (검색 증강 생성)',
    definition:
      '질문과 관련된 문서를 먼저 검색해 그 내용을 근거로 답을 생성하도록 하는 구조입니다.',
    analogy: '시험 중 교과서를 펴고 관련 페이지를 찾아본 뒤 답을 쓰는 오픈북 시험과 비슷합니다.',
    example: '사내 규정 문서를 검색해 근거를 제시하며 답변하는 사내 Q&A 챗봇이 RAG 구조를 사용합니다.',
  },
  {
    id: 'multimodal',
    term: 'Multimodal (멀티모달)',
    definition: '텍스트뿐 아니라 이미지·음성·영상 등 여러 형태의 정보를 함께 이해하고 생성하는 AI를 말합니다.',
    analogy: '글만 읽는 게 아니라 사진과 음성까지 함께 보고 듣고 이해하는 사람과 비슷합니다.',
    example: '설비 사진을 올리고 "이 부품 이름이 뭐야?"라고 물어보는 것이 멀티모달 활용 예시입니다.',
  },
  {
    id: 'prompt',
    term: 'Prompt (프롬프트)',
    definition: 'AI에게 전달하는 지시문·질문으로, AI의 출력 품질을 결정하는 입력값입니다.',
    analogy: '요리사에게 주문서를 넘기는 것과 같아서, 주문이 구체적일수록 원하는 요리가 나옵니다.',
    example: '"회의 내용을 정리해줘" 대신 목적·독자·형식을 적어주는 것이 프롬프트를 개선하는 방법입니다.',
  },
  {
    id: 'agent',
    term: 'AI Agent (AI 에이전트)',
    definition: '목표를 받아 스스로 작업 계획을 세우고, 필요한 도구를 사용해 여러 단계를 처리하는 AI 시스템입니다.',
    analogy: '지시를 하나씩 받는 비서가 아니라, 목표만 전달하면 일정 조율부터 자료 준비까지 알아서 끝내는 담당자에 가깝습니다.',
    example: '"다음 달 워크숍을 준비해줘"라는 목표만 주면 일정 확인, 장소 섭외 초안, 참석자 안내까지 이어서 처리합니다.',
  },
  {
    id: 'workflow',
    term: 'Workflow (워크플로)',
    definition: '정해진 규칙이나 순서에 따라 반복되는 작업을 자동으로 처리하는 절차를 말합니다.',
    analogy: '매번 같은 순서로 도장을 찍는 결재 라인을 자동화 기계로 바꿔둔 것과 비슷합니다.',
    example: '매주 반복되는 보고서 양식 작성이나 데이터 정리가 워크플로 자동화의 대상이 됩니다.',
  },
  {
    id: 'api',
    term: 'API',
    definition: '서로 다른 프로그램이 데이터를 주고받을 수 있게 정의된 "약속된 연결 통로"입니다.',
    analogy: '식당 주방과 손님 사이를 오가는 종업원처럼, 두 시스템 사이에서 요청과 응답을 전달하는 역할입니다.',
    example: 'AI 모델을 사내 시스템에 연결할 때, 그 연결 통로가 바로 API입니다.',
  },
  {
    id: 'context-window',
    term: 'Context Window (컨텍스트 윈도우)',
    definition: 'AI가 한 번에 "기억"하고 참고할 수 있는 입력 범위의 크기를 말합니다.',
    analogy: '책상 위에 동시에 펼쳐놓을 수 있는 자료의 양이 정해져 있는 것과 비슷합니다.',
    example: '회의록이 너무 길면 컨텍스트 윈도우를 넘어 일부 내용이 반영되지 않을 수 있습니다.',
  },
  {
    id: 'mcp',
    term: 'MCP (Model Context Protocol)',
    definition: 'AI 모델이 외부 도구·데이터와 표준화된 방식으로 연결되도록 정의한 개방형 규격입니다.',
    analogy: '여러 전자기기를 하나의 표준 충전 케이블로 연결할 수 있게 만든 규격과 비슷한 역할을 합니다.',
    example: 'AI Agent가 사내 캘린더, 문서함, 사내 도구를 표준화된 방식으로 연결해 사용할 때 쓰입니다.',
  },
]

export const glossaryMap: Record<string, GlossaryTermData> = Object.fromEntries(
  glossaryTerms.map((t) => [t.id, t]),
)
