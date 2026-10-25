// 본문 텍스트 안에서 자동으로 용어 도움말을 걸어줄 표면형(surface form) 목록입니다.
// 길이가 긴 표현을 먼저 매칭해야 하므로 AutoGlossaryText에서 정렬 후 사용합니다.
export const glossarySurfaceForms: Record<string, string[]> = {
  llm: ['LLM'],
  token: ['토큰'],
  transformer: ['Transformer', '트랜스포머'],
  inference: ['추론'],
  hallucination: ['할루시네이션'],
  rag: ['RAG'],
  multimodal: ['멀티모달'],
  prompt: ['프롬프트'],
  agent: ['AI Agent', 'Agent'],
  workflow: ['워크플로'],
  api: ['API'],
  'context-window': ['컨텍스트 윈도우'],
  mcp: ['MCP'],
}
