export type FlowTone = 'user' | 'ai' | 'tool' | 'result' | 'manual'

export interface FlowNodeData {
  id: string
  /** '\n'으로 줄바꿈하여 2줄까지 표시할 수 있습니다. */
  label: string
  x: number
  y: number
  tone: FlowTone
  /** 이 값(스텝 인덱스) 이상일 때부터 화면에 나타납니다. */
  revealAt: number
}

export interface FlowEdgeData {
  id: string
  from: string
  to: string
  revealAt: number
  dashed?: boolean
}
