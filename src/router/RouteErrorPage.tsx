import { useEffect } from "react"
import { useRouteError } from "react-router"
import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Paragraph,
} from "@amsterdam/design-system-react"

/**
 * Shown in place of a page that broke while rendering. Without the layout:
 * that may be what broke.
 */
export default function RouteErrorPage() {
  const error = useRouteError()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Page>
      <Grid paddingVertical="large">
        <Grid.Cell span="all">
          <Column alignHorizontal="start">
            <Heading level={1}>Oeps, iets ging mis!</Heading>
            <Paragraph>
              Deze pagina kan niet worden getoond. Probeer het opnieuw of ga
              terug naar de startpagina.
            </Paragraph>
            {/* A full reload: what is broken is started again. */}
            <Button onClick={() => window.location.assign("/")}>
              Terug naar de startpagina
            </Button>
          </Column>
        </Grid.Cell>
      </Grid>
    </Page>
  )
}
