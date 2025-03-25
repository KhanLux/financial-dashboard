"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { fadeIn, slideIn, scaleIn, type FadeInProps, type SlideInProps } from "@/lib/animations"

type AnimationType = "fade" | "slide" | "scale"

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: AnimationType
  delay?: FadeInProps["delay"]
  direction?: SlideInProps["direction"]
  show?: boolean
  duration?: "fast" | "normal" | "slow"
  children: React.ReactNode
}

export function AnimatedContainer({
  animation = "fade",
  delay = "none",
  direction = "up",
  show = true,
  duration = "normal",
  className,
  children,
  ...props
}: AnimatedContainerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show])

  const getDurationClass = () => {
    switch (duration) {
      case "fast":
        return "duration-300"
      case "slow":
        return "duration-700"
      default:
        return "duration-500"
    }
  }

  const getAnimationClass = () => {
    const state = isVisible ? "visible" : "hidden"

    switch (animation) {
      case "fade":
        return fadeIn({ state, delay })
      case "slide":
        return slideIn({ state, delay, direction })
      case "scale":
        return scaleIn({ state, delay })
      default:
        return fadeIn({ state, delay })
    }
  }

  return (
    <div className={cn(getAnimationClass(), getDurationClass(), className)} {...props}>
      {children}
    </div>
  )
}

