import { motion } from 'framer-motion'
import type { FlowEdgeData, FlowNodeData, FlowTone } from './types'

const TONE_STYLE: Record<FlowTone, { fill: string; stroke: string; text: string }> = {
  user: { fill: 'var(--accent-blue-soft)', stroke: 'var(--accent-blue)', text: 'var(--accent-blue)' },
  ai: { fill: 'var(--accent-purple-soft)', stroke: 'var(--accent-purple)', text: 'var(--accent-purple)' },
  tool: { fill: 'var(--accent-mint-soft)', stroke: 'var(--accent-mint)', text: 'var(--accent-mint)' },
  result: { fill: 'rgba(245,184,92,0.14)', stroke: 'var(--accent-amber)', text: 'var(--accent-amber)' },
  manual: { fill: 'rgba(240,106,140,0.14)', stroke: 'var(--accent-rose)', text: 'var(--accent-rose)' },
}

const NODE_W = 27
const NODE_H = 11
const EDGE_TRIM = 6.4

function edgePoints(a: FlowNodeData, b: FlowNodeData) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const ux = dx / len
  const uy = dy / len
  return {
    x1: a.x + ux * EDGE_TRIM,
    y1: a.y + uy * EDGE_TRIM,
    x2: b.x - ux * EDGE_TRIM,
    y2: b.y - uy * EDGE_TRIM,
  }
}

interface FlowStageProps {
  nodes: FlowNodeData[]
  edges: FlowEdgeData[]
  step: number
  markerId: string
}

export function FlowStage({ nodes, edges, step, markerId }: FlowStageProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="업무 처리 단계 다이어그램">
      <defs>
        <marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-muted)" />
        </marker>
      </defs>

      {edges.map((e) => {
        if (e.revealAt > step) return null
        const from = nodeMap.get(e.from)
        const to = nodeMap.get(e.to)
        if (!from || !to) return null
        const p = edgePoints(from, to)
        return (
          <motion.line
            key={e.id}
            x1={p.x1}
            y1={p.y1}
            x2={p.x2}
            y2={p.y2}
            stroke="var(--text-muted)"
            strokeWidth={0.6}
            strokeDasharray={e.dashed ? '2.2 2.2' : undefined}
            markerEnd={`url(#${markerId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        )
      })}

      {nodes.map((n) => {
        if (n.revealAt > step) return null
        const tone = TONE_STYLE[n.tone]
        const lines = n.label.split('\n')
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <rect
              x={n.x - NODE_W / 2}
              y={n.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={2.6}
              fill={tone.fill}
              stroke={tone.stroke}
              strokeWidth={0.6}
            />
            {lines.map((line, i) => (
              <text
                key={i}
                x={n.x}
                y={n.y + (i - (lines.length - 1) / 2) * 3.4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={3.1}
                fontWeight={600}
                fill={tone.text}
              >
                {line}
              </text>
            ))}
          </motion.g>
        )
      })}
    </svg>
  )
}
