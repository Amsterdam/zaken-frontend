import React, { ReactNode } from "react"
import styles from "./Hidden.module.css"

type Breakpoint =
  | "mobileS"
  | "mobileM"
  | "mobileL"
  | "tabletS"
  | "tabletM"
  | "laptop"
  | "laptopM"
  | "laptopL"
  | "desktop"
  | "desktopL"

type HiddenProps = {
  maxBreakpoint?: Breakpoint
  minBreakpoint?: Breakpoint
  children: ReactNode
}

export const Hidden: React.FC<HiddenProps> = ({
  maxBreakpoint,
  minBreakpoint,
  children
}) => {
  let classes = ""

  if (minBreakpoint) {
    classes += ` ${styles[`hideUntil-${minBreakpoint}`]}`
  }

  if (maxBreakpoint) {
    classes += ` ${styles[`hideFrom-${maxBreakpoint}`]}`
  }

  return <span className={classes.trim()}>{children}</span>
}

export default Hidden
