"use client"

import { useEffect } from 'react'

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      
      if (favicon) {
        favicon.href = isDark ? '/favicon-dark.png' : '/favicon-light.png'
      }
    }

    // Set initial favicon
    updateFavicon()

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateFavicon)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', updateFavicon)
    }
  }, [])

  return null
}
