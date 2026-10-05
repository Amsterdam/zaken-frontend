import { Column, Heading, Paragraph } from "@amsterdam/design-system-react"
import { useFine } from "@/api/hooks"
import FinesSearchResult from "./FinesSearchResult"

type Props = {
  searchString: string
}

const FinesSearchResultsList: React.FC<Props> = ({ searchString }) => {
  const { data, isLoading } = useFine(
    searchString.length > 0 ? searchString : undefined,
  )
  const fines = data?.items ?? []

  if (isLoading) return <Paragraph>Zoeken naar de beschikking…</Paragraph>
  if (searchString.length === 0) return null

  return (
    <Column>
      <Heading level={2}>Resultaat invorderingscheck</Heading>
      {fines.length > 0 ? (
        <Column gap="large">
          {fines.map((fine) => (
            <FinesSearchResult key={fine.identificatienummer} fine={fine} />
          ))}
        </Column>
      ) : (
        <>
          <Paragraph>
            De gezochte beschikking is nog niet bekend bij belastingen.
          </Paragraph>
          <Paragraph>
            Belastingen pakt overgedragen beschikkingen in principe op binnen{" "}
            <strong>5 werkdagen</strong>. Binnen die termijn wordt de eerste
            factuur naar de overtreder verstuurd.
          </Paragraph>
          <Paragraph>
            Indien deze tijd verstreken is, controleer dan of de beschikking
            juist verstuurd is.
          </Paragraph>
        </>
      )}
    </Column>
  )
}

export default FinesSearchResultsList
