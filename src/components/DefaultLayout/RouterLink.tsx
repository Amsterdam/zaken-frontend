import { forwardRef, type AnchorHTMLAttributes } from "react"
import { Link } from "react-router-dom"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/**
 * Lets Amsterdam Design System components that render a link with `href`
 * (e.g. PageHeader's logo link) navigate client-side with React Router.
 */
export const RouterLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, ...props }, ref) => <Link ref={ref} to={href} {...props} />,
)
