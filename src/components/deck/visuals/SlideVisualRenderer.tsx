import type { SlideVisual } from './types'
import { TimelineVisual } from './TimelineVisual'
import { ConcentricVisual } from './ConcentricVisual'
import { BarChartVisual } from './BarChartVisual'
import { IconGridVisual } from './IconGridVisual'
import { CompareVisual } from './CompareVisual'
import { FlowRowVisual } from './FlowRowVisual'
import { GaugeVisual } from './GaugeVisual'
import { ChecklistVisual } from './ChecklistVisual'
import { WarningListVisual } from './WarningListVisual'
import { GanttMiniVisual } from './GanttMiniVisual'
import { ResultsGalleryVisual } from './ResultsGalleryVisual'
import { ConfidenceCurveVisual } from './ConfidenceCurveVisual'
import { VibeCodingProcessVisual } from './VibeCodingProcessVisual'

export function SlideVisualRenderer({ visual }: { visual?: SlideVisual }) {
  if (!visual) return null

  return (
    <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
      {visual.kind === 'timeline' && <TimelineVisual items={visual.items} />}
      {visual.kind === 'concentric' && <ConcentricVisual items={visual.items} />}
      {visual.kind === 'chart-bar' && <BarChartVisual items={visual.items} caption={visual.caption} tone={visual.tone} />}
      {visual.kind === 'icon-grid' && <IconGridVisual items={visual.items} />}
      {visual.kind === 'compare' && <CompareVisual left={visual.left} right={visual.right} />}
      {visual.kind === 'flow-row' && <FlowRowVisual items={visual.items} />}
      {visual.kind === 'gauge' && <GaugeVisual label={visual.label} filledPct={visual.filledPct} caption={visual.caption} />}
      {visual.kind === 'checklist' && <ChecklistVisual items={visual.items} />}
      {visual.kind === 'warning-list' && <WarningListVisual items={visual.items} />}
      {visual.kind === 'gantt-mini' && <GanttMiniVisual rows={visual.rows} caption={visual.caption} />}
      {visual.kind === 'results-gallery' && <ResultsGalleryVisual items={visual.items} />}
      {visual.kind === 'confidence-curve' && <ConfidenceCurveVisual />}
      {visual.kind === 'vibe-coding-process' && <VibeCodingProcessVisual />}
    </div>
  )
}
