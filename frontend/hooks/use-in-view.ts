import { useEffect, useState, RefObject } from 'react'

export function useIsShowcaseInView(
  containerRef: RefObject<HTMLElement | null>
): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check initial visibility
    const checkVisibility = () => {
      const rect = container.getBoundingClientRect()
      const visible =
        rect.top < window.innerHeight && rect.bottom > 0
      setIsInView(visible)
    }

    // Check immediately
    checkVisibility()

    // Set up IntersectionObserver for more reliable tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting && entry.intersectionRatio > 0)
        })
      },
      {
        threshold: 0, // Trigger when any part enters/leaves viewport
        rootMargin: '0px',
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [containerRef])

  return isInView
}

