import { LinkList, Paragraph } from "@amsterdam/design-system-react"
import { BAG_PDOK_MAX_RESULTS } from "@/api/hooks/externalApis"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import {
  MIN_SEARCH_LENGTH,
  useAddressSearch,
} from "@/components/search/useAddressSearch"

const SearchResults: React.FC = () => {
  const { searchString, isValid, data, isLoading, isError } = useAddressSearch()

  if (!isValid) {
    return (
      <Paragraph>
        Voer minimaal {MIN_SEARCH_LENGTH} tekens in om te zoeken.
      </Paragraph>
    )
  }
  if (isLoading) return <Paragraph>Zoeken naar adressen...</Paragraph>
  // The page says so, under its title.
  if (isError) return null

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
