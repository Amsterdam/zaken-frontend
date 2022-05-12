import type { FunctionComponent, HTMLAttributes, ReactNode } from "react"

// Some props are omitted since they cannot be overwritten.
type OmittedProps = "role" | "aria-controls" | "aria-selected" | "tabIndex"

export type TabProps = {
  id: string
  label: ReactNode
} & Omit<HTMLAttributes<HTMLButtonElement>, OmittedProps>

// eslint-disable-next-line react/function-component-definition
export const Tab: FunctionComponent<TabProps> = () => null
