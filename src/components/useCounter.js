import { useEffect, useState, useRef } from 'react'

// Smoothly counts from `from` to `to` with easing.
export function useCounter(to, { duration = 1400, from = 0, decimals = 0, startDelay = 0 } = {}) {
  const [value, setValue] = useState(from)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let timeoutId = null

    const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic

    const run = (ts) => {
      if (cancelled) return
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const t = Math.min(elapsed / duration, 1)
      const eased = ease(t)
      const next = from + (to - from) * eased
      setValue(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(run)
      }
    }

    timeoutId = setTimeout(() => {
      startRef.current = null
      rafRef.current = requestAnimationFrame(run)
    }, startDelay)

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [to, from, duration, startDelay])

  if (decimals > 0) return value.toFixed(decimals)
  return Math.round(value).toLocaleString()
}
