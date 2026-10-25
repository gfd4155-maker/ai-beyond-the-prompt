import type { FlowEdgeData, FlowNodeData } from '../../components/flow/types'

export const TASK_DESCRIPTION = '가상의 조직문화 행사를 준비한다.'

export const CONCEPTUAL_DISCLAIMER =
  '실제 제품에서는 챗봇도 도구를 함께 사용할 수 있습니다. 이 화면은 특정 제품을 가리키지 않으며, 두 접근 방식의 개념적 차이를 보여주기 위한 교육용 예시입니다.'

export const chatbotFlow = {
  nodes: [
    { id: 'c-u1', label: '사용자', x: 50, y: 8, tone: 'user', revealAt: 0 },
    { id: 'c-q1', label: '질문 입력', x: 50, y: 24, tone: 'user', revealAt: 0 },
    { id: 'c-bot', label: 'Chatbot', x: 50, y: 40, tone: 'ai', revealAt: 1 },
    { id: 'c-list', label: '체크리스트\n작성', x: 50, y: 56, tone: 'ai', revealAt: 1 },
    { id: 'c-manual', label: '사용자가\n직접 확인', x: 25, y: 73, tone: 'manual', revealAt: 2 },
    { id: 'c-data', label: '실제 일정·\n참석자 데이터', x: 75, y: 73, tone: 'manual', revealAt: 2 },
    { id: 'c-u2', label: '사용자가\n후속 작업 수행', x: 50, y: 90, tone: 'user', revealAt: 3 },
  ] satisfies FlowNodeData[],
  edges: [
    { id: 'c-e1', from: 'c-u1', to: 'c-q1', revealAt: 0 },
    { id: 'c-e2', from: 'c-q1', to: 'c-bot', revealAt: 1 },
    { id: 'c-e3', from: 'c-bot', to: 'c-list', revealAt: 1 },
    { id: 'c-e4', from: 'c-manual', to: 'c-data', revealAt: 2, dashed: true },
    { id: 'c-e5', from: 'c-list', to: 'c-u2', revealAt: 3 },
    { id: 'c-e6', from: 'c-data', to: 'c-u2', revealAt: 3, dashed: true },
  ] satisfies FlowEdgeData[],
  captions: [
    '사용자가 챗봇에게 질문을 입력합니다.',
    '챗봇이 요청 내용을 바탕으로 체크리스트를 작성합니다.',
    '사용자가 실제 일정과 참석자 데이터를 별도로 직접 확인합니다 — 챗봇은 이 데이터에 접근하지 않았습니다.',
    '사용자가 체크리스트와 실제 데이터를 직접 종합해 장소 예약, 안내 발송 같은 후속 작업을 수행합니다.',
  ],
  limitations: {
    title: 'Chatbot 방식의 특징과 한계',
    points: [
      '대화 중심이라 빠르고 직관적으로 아이디어와 초안을 얻을 수 있습니다.',
      '실제 데이터 확인과 후속 작업은 사용자가 매 단계 직접 연결해야 합니다.',
      '업무가 복잡해질수록 사용자가 반복적으로 개입해야 하는 비용이 커집니다.',
    ],
  },
  presenterCues: [
    '청중에게 질문: "이 질문, 여러분이라면 어떻게 하셨을까요?"',
    '체크리스트는 그럴듯하지만, 아직 "진짜 일정"과는 연결되지 않았다는 점을 짚어주세요.',
    '"챗봇이 이 데이터를 본 적이 없다"는 점을 강조 — 다음 Agent 모드와의 핵심 대비 지점입니다.',
    '사용자가 몇 번이나 직접 개입했는지 손가락으로 세어보게 하면 효과적입니다.',
  ],
}

export const agentFlow = {
  nodes: [
    { id: 'a-u1', label: '사용자', x: 50, y: 6, tone: 'user', revealAt: 0 },
    { id: 'a-goal', label: '업무 목표\n설정', x: 50, y: 19, tone: 'user', revealAt: 0 },
    { id: 'a-agent', label: 'AI Agent –\n계획 수립', x: 50, y: 33, tone: 'ai', revealAt: 1 },
    { id: 'a-tool1', label: '캘린더\n데이터 조회', x: 17, y: 50, tone: 'tool', revealAt: 2 },
    { id: 'a-tool2', label: '참석자\n데이터 조회', x: 50, y: 50, tone: 'tool', revealAt: 2 },
    { id: 'a-tool3', label: '예산·장소\n데이터 조회', x: 83, y: 50, tone: 'tool', revealAt: 2 },
    { id: 'a-process', label: '단계별 처리·\n초안 작성', x: 50, y: 65, tone: 'tool', revealAt: 2 },
    { id: 'a-review', label: '결과 검토', x: 50, y: 79, tone: 'result', revealAt: 3 },
    { id: 'a-approve', label: '사용자 승인', x: 50, y: 92, tone: 'result', revealAt: 3 },
  ] satisfies FlowNodeData[],
  edges: [
    { id: 'a-e1', from: 'a-u1', to: 'a-goal', revealAt: 0 },
    { id: 'a-e2', from: 'a-goal', to: 'a-agent', revealAt: 1 },
    { id: 'a-e3', from: 'a-agent', to: 'a-tool1', revealAt: 2 },
    { id: 'a-e4', from: 'a-agent', to: 'a-tool2', revealAt: 2 },
    { id: 'a-e5', from: 'a-agent', to: 'a-tool3', revealAt: 2 },
    { id: 'a-e6', from: 'a-tool1', to: 'a-process', revealAt: 2 },
    { id: 'a-e7', from: 'a-tool2', to: 'a-process', revealAt: 2 },
    { id: 'a-e8', from: 'a-tool3', to: 'a-process', revealAt: 2 },
    { id: 'a-e9', from: 'a-process', to: 'a-review', revealAt: 3 },
    { id: 'a-e10', from: 'a-review', to: 'a-approve', revealAt: 3 },
  ] satisfies FlowEdgeData[],
  captions: [
    "사용자가 '조직문화 행사를 준비해줘'라는 업무 목표를 제시합니다.",
    'Agent가 목표를 세부 작업 계획으로 분해합니다.',
    '연결된 캘린더·참석자·예산 데이터를 조회하며 단계별로 초안을 완성합니다.',
    '결과를 검토한 뒤 사용자 승인을 받습니다. 승인되지 않으면 Agent가 다시 계획을 세웁니다.',
  ],
  limitations: {
    title: 'AI Agent 방식의 특징과 한계',
    points: [
      '여러 단계와 도구 사용을 한 번에 이어서 처리해 반복 개입 비용이 줄어듭니다.',
      '중간 과정이 사용자 눈에 잘 보이지 않을 수 있어, 검토·승인 단계가 특히 중요합니다.',
      '연결된 도구와 데이터의 신뢰도에 결과 품질이 크게 좌우됩니다.',
    ],
  },
  presenterCues: [
    '같은 과업, 같은 문장으로 시작한다는 점을 먼저 짚어주세요 — 차이는 "다음에 무슨 일이 벌어지는가"입니다.',
    '"계획을 세운다"가 핵심 — 사람이 매 단계 지시하지 않아도 Agent가 순서를 설계합니다.',
    'Chatbot 모드의 c-manual/c-data 노드와 비교하며 "같은 데이터를 누가, 언제 확인했는지" 대비시켜 주세요.',
    '승인 단계를 반드시 강조 — "다 끝났다"가 아니라 "사람이 책임지고 확인한다"는 메시지입니다.',
  ],
}

export const STEP_COUNT = 4
