import { type AnchorHTMLAttributes, type Ref } from "react"
import { Link, useLocation } from "react-router-dom"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  ref?: Ref<HTMLAnchorElement>
}

/** What a link tells the next page: where you came from (path and search). */
export type LinkState = { from?: string }

/**
 * Lets Amsterdam Design System components that render a link with `href`
 * (e.g. PageHeader's logo link) navigate client-side with React Router. The
 * page you leave goes along as `from`, so the next page's breadcrumbs can
 * lead back to it.
 */
export function RouterLink({ href, ...props }: Props) {
  const { pathname, search } = useLocation()
  const state: LinkState = { from: `${pathname}${search}` }

  return <Link to={href} state={state} {...props} />
}
