import type { ContentSlide } from '../../content/slides'
import { SpeakerScriptPanel } from './SpeakerScriptPanel'
import { SlideVisualRenderer } from './visuals/SlideVisualRenderer'

/** mode: 'deck' = 발표 화면(텍스트 최소화), 'read' = 읽기 모드(발표자 대본까지 모두 표시) */
export function ContentSlideView({ slide, mode = 'deck' }: { slide: ContentSlide; mode?: 'deck' | 'read' }) {
  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      <h1 className="whitespace-pre-line text-3xl font-bold leading-[1.25] sm:text-4xl">{slide.title}</h1>
      {slide.screenText && (
        <p className="mt-3 text-[16px] font-medium" style={{ color: 'var(--accent-blue)' }}>
          {slide.screenText}
        </p>
      )}

      {slide.visual && (
        <div className="mt-8 text-left">
          <SlideVisualRenderer visual={slide.visual} />
        </div>
      )}

      {mode === 'read' && slide.speakerScript && (
        <div className="text-left">
          <SpeakerScriptPanel open script={slide.speakerScript} alwaysOpen />
        </div>
      )}
    </div>
  )
}
