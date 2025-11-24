'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 50, stiffness: 100 })
  const displayValue = useRef(0)

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [motionValue, inView, value])

  useEffect(() => {
    spring.on('change', (latest) => {
      displayValue.current = Math.round(latest)
    })
  }, [spring])

  return (
    <span ref={ref} className="inline-block">
      {displayValue.current}{suffix}
    </span>
  )
}

