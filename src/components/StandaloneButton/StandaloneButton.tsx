import { type ButtonHTMLAttributes } from "react"
import { Icon, type IconProps } from "@amsterdam/design-system-react"
import { ChevronForwardIcon } from "@amsterdam/design-system-react-icons"
import styles from "./StandaloneButton.module.css"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconProps["svg"]
}

/**
 * An action that looks like the Amsterdam Design System's standalone link
 * (an icon and bold text) but is a button: for something that happens on the
 * page, like opening a dialog, next to links that go to another page. Lighter
 * than a Button, e.g. in a table row.
 */
export function StandaloneButton({
  children,
  className,
  icon = ChevronForwardIcon,
  ...restProps
}: Props) {
  return (
    <button
      type="button"
      {...restProps}
      className={`ams-standalone-link ${styles.button} ${className ?? ""}`.trim()}
    >
      <Icon svg={icon} />
      {children}
    </button>
  )
}
