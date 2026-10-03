import { Grid, Heading } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import SearchWrapper from "@/app/components/search/SearchWrapper/SearchWrapper"
import { useRedirectFromState } from "@/app/routing/useRedirectFromState"

const HomePage: React.FC = () => {
  useRedirectFromState()

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>Adres zoeken</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <SearchWrapper />
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default HomePage
