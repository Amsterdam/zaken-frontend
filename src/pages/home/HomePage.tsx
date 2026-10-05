import {
  Alert,
  Column,
  Grid,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import SearchWrapper from "@/components/search/SearchWrapper/SearchWrapper"
import { useAddressSearch } from "@/components/search/useAddressSearch"
import { useRedirectFromState } from "@/hooks/useRedirectFromState"

const HomePage: React.FC = () => {
  useRedirectFromState()
  const { isError } = useAddressSearch()

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Column>
          <Heading level={1}>Adres zoeken</Heading>
          {isError && (
            <Alert heading="Niet gelukt" headingLevel={2} severity="error">
              <Paragraph>
                Wegens een technische fout kon het adres niet worden opgezocht.
                Probeer het over een paar minuten opnieuw.
              </Paragraph>
            </Alert>
          )}
        </Column>
      </Grid.Cell>
      <Grid.Cell span="all">
        <SearchWrapper />
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default HomePage
