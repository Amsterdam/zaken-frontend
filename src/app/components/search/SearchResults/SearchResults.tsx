import { Alert, LinkList, Paragraph } from "@amsterdam/design-system-react"
import { useBagPdok } from "@/api/hooks"
import { BAG_PDOK_MAX_RESULTS } from "@/api/hooks/dataPunt"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const isValid = isValidSearchString(searchString)
  const { data, isLoading, isError } = useBagPdok(
    isValid ? searchString : undefined,
  )

  if (!isValid) {
    return (
      <Paragraph>
        Voer minimaal {MIN_SEARCH_LENGTH} tekens in om te zoeken.
      </Paragraph>
    )
  }
  if (isLoading) return <Paragraph>Zoeken naar adressen...</Paragraph>
  if (isError) {
    return (
      <Alert heading="Niet gelukt" headingLevel={3} severity="error">
        <Paragraph>
          Wegens een technische fout kon het adres niet worden opgezocht.
          Probeer het over een paar minuten opnieuw.
        </Paragraph>
      </Alert>
    )
  }

  const docs = data?.response?.docs ?? []
  // Only show addresses with a bagId
  const addresses = docs.filter((obj) => obj.adresseerbaarobject_id)

  if (addresses.length === 0) {
    return <Paragraph>Geen adressen gevonden.</Paragraph>
  }

  return (
    <>
      <Paragraph>
        <strong>{addresses.length}</strong>{" "}
        {addresses.length === 1 ? "adres" : "adressen"} gevonden voor "
        {searchString}"
        {docs.length >= BAG_PDOK_MAX_RESULTS &&
          ` (maximaal ${BAG_PDOK_MAX_RESULTS} getoond)`}
      </Paragraph>
      <LinkList>
        {addresses.map(({ adresseerbaarobject_id, weergavenaam }) => (
          <LinkList.Link
            key={adresseerbaarobject_id}
            linkComponent={RouterLink}
            href={`/adres/${adresseerbaarobject_id}`}
          >
            {weergavenaam}
          </LinkList.Link>
        ))}
      </LinkList>
    </>
  )
}

export default SearchResults
