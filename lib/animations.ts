import { type VariantProps, cva } from "class-variance-authority"

export const fadeIn = cva("transition-opacity duration-500", {
  variants: {
    state: {
      hidden: "opacity-0",
      visible: "opacity-100",
    },
    delay: {
      none: "",
      short: "delay-100",
      medium: "delay-200",
      long: "delay-300",
    },
  },
  defaultVariants: {
    state: "visible",
    delay: "none",
  },
})

export const slideIn = cva("transition-all duration-500", {
  variants: {
    state: {
      hidden: "opacity-0 translate-y-4",
      visible: "opacity-100 translate-y-0",
    },
    direction: {
      up: "translate-y-4",
      down: "translate-y-[-1rem]",
      left: "translate-x-4",
      right: "translate-x-[-1rem]",
    },
    delay: {
      none: "",
      short: "delay-100",
      medium: "delay-200",
      long: "delay-300",
    },
  },
  defaultVariants: {
    state: "visible",
    direction: "up",
    delay: "none",
  },
})

export const scaleIn = cva("transition-all duration-500", {
  variants: {
    state: {
      hidden: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
    delay: {
      none: "",
      short: "delay-100",
      medium: "delay-200",
      long: "delay-300",
    },
  },
  defaultVariants: {
    state: "visible",
    delay: "none",
  },
})

export type FadeInProps = VariantProps<typeof fadeIn>
export type SlideInProps = VariantProps<typeof slideIn>
export type ScaleInProps = VariantProps<typeof scaleIn>

