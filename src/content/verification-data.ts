export type VerificationVerdict = 'fact' | 'error' | 'unsupported'

export interface VerificationSentence {
  id: string
  text: string
  verdict: VerificationVerdict
  explanation: string
}

export const VERDICT_LABEL: Record<VerificationVerdict, string> = {
  fact: '확인된 사실',
  error: '오류',
  unsupported: '근거 부족',
}

export const VERDICT_COLOR: Record<VerificationVerdict, string> = {
  fact: 'var(--accent-mint)',
  error: 'var(--accent-rose)',
  unsupported: 'var(--accent-amber)',
}

// 교육용으로 구성한 가상의 AI 답변입니다. 실제 보고서·통계와 무관합니다.
export const verificationSentences: VerificationSentence[] = [
  {
    id: 'v1',
    text: '2026년 10월 기준, 생성형 AI는 텍스트·이미지·음성을 함께 다루는 멀티모달 형태로 널리 쓰이고 있습니다.',
    verdict: 'fact',
    explanation: '여러 공신력 있는 조사기관의 발표에서 일관되게 확인되는 추세로, 출처를 명시하면 그대로 인용할 수 있는 수준의 사실입니다.',
  },
  {
    id: 'v2',
    text: '국내 제조업의 94.7%가 이미 AI Agent를 생산 현장에 전면 도입했습니다.',
    verdict: 'error',
    explanation:
      '소수점까지 딱 맞는 수치가 출처 없이 제시되는 것 자체가 위험 신호입니다. 이런 숫자는 실제 조사 자료와 대조해 확인하기 전까지는 신뢰하면 안 됩니다.',
  },
  {
    id: 'v3',
    text: 'AI Agent를 도입하면 보고서 작성 시간이 평균적으로 절약되는 경향이 있습니다.',
    verdict: 'unsupported',
    explanation:
      '방향 자체는 그럴듯하지만 "평균적으로", "경향이 있다"는 표현 뒤에 구체적 근거(조사 대상, 비교 기준)가 없습니다. 근거 부족 문장은 틀렸다고 단정할 수는 없지만, 그대로 인용하면 안 됩니다.',
  },
  {
    id: 'v4',
    text: '자세한 수치는 《2026 글로벌 제조 AI 백서》 17페이지를 참고하시기 바랍니다.',
    verdict: 'error',
    explanation:
      '그럴듯한 제목의 출처를 그 자리에서 "만들어내는" 경우가 실제로 많습니다. 출처가 언급되면 반드시 실제로 존재하는 문서인지, 해당 페이지에 그 내용이 있는지 직접 확인해야 합니다.',
  },
]
