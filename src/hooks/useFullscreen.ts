import { useCallback, useEffect, useRef, useState } from 'react'

export function useFullscreen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    function onChange() {
      setIsFullscreen(document.fullscreenElement === ref.current)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = useCallback(() => {
    if (!ref.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      ref.current.requestFullscreen().catch(() => {})
    }
  }, [])

  return { ref, isFullscreen, toggle }
}
