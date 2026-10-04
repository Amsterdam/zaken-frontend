import { forwardRef, type AnchorHTMLAttributes } from "react"
import { Link, useLocation } from "react-router-dom"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** What a link tells the next page: where you came from (path and search). */
export type LinkState = { from?: string }

/**
 * Lets Amsterdam Design System components that render a link with `href`
 * (e.g. PageHeader's logo link) navigate client-side with React Router. The
 * page you leave goes along as `from`, so the next page's breadcrumbs can
 * lead back to it.
 */
export const RouterLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, ...props }, ref) => {
    const { pathname, search } = useLocation()
    const state: LinkState = { from: `${pathname}${search}` }

    return <Link ref={ref} to={href} state={state} {...props} />
  },
)
