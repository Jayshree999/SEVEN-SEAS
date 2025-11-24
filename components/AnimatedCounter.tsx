'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 50, stiffness: 100 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [motionValue, inView, value])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    
    return () => unsubscribe()
  }, [spring])

  return (
    <span ref={ref} className="inline-block">
      {displayValue}{suffix}
    </span>
  )
}

