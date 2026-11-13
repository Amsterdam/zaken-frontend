import { type ReactNode } from "react"
import { Grid, Heading } from "@amsterdam/design-system-react"
import { Breadcrumbs } from "@/components/DefaultLayout/Breadcrumbs"

type Props = {
  /** The title of the page (the h1)... */
  title?: string
  /** ...or a heading with more than a title (an icon, badges). */
  children?: ReactNode
  /** For a page with its own navigation (e.g. tabs), where the path adds nothing. */
  hideBreadcrumbs?: boolean
}

/**
 * The top of a page: the breadcrumbs and the title in one Grid.Cell, as in
 * the examples of the Amsterdam Design System. In cells of their own the gap
 * of the Grid would come between them. Every page in a DefaultLayout starts
 * with one.
 */
export function PageHeading({ title, children, hideBreadcrumbs = false }: Props) {
  return (
    <Grid.Cell span="all" appearance="transparent">
      {!hideBreadcrumbs && <Breadcrumbs />}
      {title !== undefined && <Heading level={1}>{title}</Heading>}
      {children}
    </Grid.Cell>
  )
}
