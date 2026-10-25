export interface PromptStepOption {
  id: string
  label: string
  clause: string
  output: string
  explanation: string
  keyPoint: string
}

export const BASE_PROMPT = '회의 내용을 정리해줘.'

export const BASE_OUTPUT =
  '오늘 회의에서는 여러 주제가 논의되었습니다. 일정과 예산, 담당자 등에 대한 이야기가 있었고 다음에 다시 확인하기로 했습니다.'

export const BASE_KEY_POINT = '목적·독자·형식이 없으면 AI는 "무난하고 모호한" 요약만 돌려줍니다.'

export const BASE_EXPLANATION =
  '목적, 배경, 독자, 제약, 형식이 전혀 없으면 AI는 어떤 정보가 중요한지 스스로 추측해야 합니다. 그 결과 누구에게도 딱 맞지 않는 평균적인 요약이 나옵니다.'

export const promptSteps: PromptStepOption[] = [
  {
    id: 'purpose',
    label: '목적',
    clause: '목적: 이 회의록은 다음 주 임원 보고에 사용됩니다.',
    output:
      '[목적: 임원 보고용 요약]\n이번 회의에서는 3월 생산라인 증설 일정과 예산 승인 여부가 핵심 쟁점으로 논의되었습니다. 주요 결정 사항과 보류된 이슈를 중심으로 정리합니다.',
    explanation: '목적을 명시하면 "무엇을 중심으로" 요약할지 기준이 생깁니다. 임원 보고라는 목적만으로도 핵심 쟁점 위주로 초점이 바뀝니다.',
    keyPoint: '목적을 알려주면 AI가 "무엇이 중요한지" 판단할 기준이 생깁니다.',
  },
  {
    id: 'background',
    label: '배경 정보',
    clause:
      '배경: 이 회의는 3월 생산라인 증설 프로젝트의 3차 점검 회의였습니다. 참석자는 생산기술팀, 구매팀, 재무팀입니다.',
    output:
      '[목적: 임원 보고용 요약]\n3차 점검 회의인 만큼, 1·2차 대비 진행 상황을 함께 짚었습니다. 생산기술팀은 설비 반입 일정 지연을 보고했고, 구매팀은 대체 공급사 검토를, 재무팀은 추가 예산 소요 가능성을 언급했습니다.',
    explanation: '배경 정보가 없으면 맥락 없는 요약만 나옵니다. 이전 회차 대비 변화, 참석 부서별 입장까지 반영할 수 있게 됩니다.',
    keyPoint: '배경을 알려주면 "이전 맥락과 이어지는" 요약이 가능해집니다.',
  },
  {
    id: 'audience',
    label: '독자',
    clause: '독자: 현장 경험이 없는 임원진이 읽습니다. 전문 용어는 풀어서 설명해주세요.',
    output:
      '[목적: 임원 보고용 요약]\n3차 점검 회의 결과, 설비 반입(공장에 새 장비를 들여오는 작업)이 2주 지연될 예정입니다. 구매팀은 다른 공급사도 함께 검토 중이며, 재무팀은 지연에 따른 추가 비용 가능성을 보고했습니다.',
    explanation: '같은 내용도 독자가 누구냐에 따라 설명 깊이와 용어 선택이 달라져야 합니다. 전문 용어를 풀어 쓰면서 임원진이 바로 이해할 수 있는 문장이 되었습니다.',
    keyPoint: '독자를 알려주면 용어 수준과 설명 깊이가 맞춰집니다.',
  },
  {
    id: 'constraints',
    label: '제약 조건',
    clause: '제약: 분량은 10줄 이내, bullet 형식으로 작성하고 숫자와 날짜는 원문 그대로 유지해주세요.',
    output:
      '[목적: 임원 보고용 요약]\n• 설비 반입 2주 지연 (3차 점검 회의 기준)\n• 구매팀, 대체 공급사 2곳 검토 중\n• 재무팀, 추가 예산 소요 가능성 보고 (금액 미확정)\n• 다음 점검 회의: 2주 후 예정',
    explanation: '제약 조건이 없으면 AI가 분량과 형식을 임의로 정합니다. 분량·형식·사실 보존 규칙을 명시해야 실무에 바로 붙여넣을 수 있는 결과가 나옵니다.',
    keyPoint: '제약을 알려주면 "바로 쓸 수 있는" 형태로 결과가 정리됩니다.',
  },
  {
    id: 'format',
    label: '출력 형식',
    clause: "출력 형식: '결정사항 / 보류사항 / 다음 액션' 3개 섹션으로 구분해주세요.",
    output:
      '[목적: 임원 보고용 요약]\n\n결정사항\n• 다음 점검 회의 2주 후 진행\n\n보류사항\n• 설비 반입 지연에 따른 대체 공급사 선정 (2곳 검토 중)\n• 추가 예산 소요 금액 확정\n\n다음 액션\n• 구매팀: 공급사 비교 자료 제출\n• 재무팀: 예산 영향 분석 보고',
    explanation: '구조를 지정하면 보고서에 바로 붙여넣을 수 있는 형태가 됩니다. 출력 형식은 "내용"이 아니라 "사용 방식"을 결정하는 요소입니다.',
    keyPoint: '형식을 알려주면 보고서·문서에 바로 붙여넣을 수 있습니다.',
  },
  {
    id: 'criteria',
    label: '검증 기준',
    clause: '검증 기준: 회의에서 실제로 언급되지 않은 수치나 결정은 추가하지 말고, 불확실한 부분은 "확인 필요"로 표시해주세요.',
    output:
      '[목적: 임원 보고용 요약]\n\n결정사항\n• 다음 점검 회의 2주 후 진행\n\n보류사항\n• 설비 반입 지연에 따른 대체 공급사 선정 (2곳 검토 중)\n• 추가 예산 소요 금액 — 확인 필요 (회의 중 구체적 금액 미언급)\n\n다음 액션\n• 구매팀: 공급사 비교 자료 제출\n• 재무팀: 예산 영향 분석 보고',
    explanation:
      '검증 기준을 명시하면 AI가 불확실한 내용을 추측해서 채우는 대신 "확인 필요"로 표시하도록 유도할 수 있습니다. 이는 할루시네이션 위험을 줄이는 실무적 장치이지만, 이 지시만으로 모든 오류가 사라지는 것은 아니며 사람의 최종 검증이 여전히 필요합니다.',
    keyPoint: '검증 기준을 알려주면 추측으로 채워진 숫자를 줄일 수 있습니다 — 단, 완전한 보장은 아닙니다.',
  },
]

export function promptTextAt(step: number): string {
  const lines = [BASE_PROMPT]
  for (let i = 0; i < step; i++) lines.push(promptSteps[i].clause)
  return lines.join('\n')
}

export function outputAt(step: number): string {
  return step === 0 ? BASE_OUTPUT : promptSteps[step - 1].output
}

export function explanationAt(step: number): string {
  return step === 0 ? BASE_EXPLANATION : promptSteps[step - 1].explanation
}

export function keyPointAt(step: number): string {
  return step === 0 ? BASE_KEY_POINT : promptSteps[step - 1].keyPoint
}

export const STEP_COUNT = promptSteps.length + 1 // 0(기준) ~ 6(모든 요소 포함)
