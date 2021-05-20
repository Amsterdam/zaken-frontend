import { useEffect } from "react"
import { useFine } from "app/state/rest"
import { Heading, Spinner } from "@amsterdam/asc-ui"
import List from "app/components/shared/List/List"
import FinesSearchResult from "./FinesSearchResult"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"

type Props = {
  searchString: string
}

const FinesSearchResultsList: React.FC<Props> = ({ searchString }) => {

  const [data, { isBusy, execGet }] = useFine(searchString, { lazy: true })

  // TODO: Make search string optional and remove this useEffect. And instead use lazyness of cache hook.
  useEffect(() => {
    if (searchString.length === 0) return
    execGet()
  }, [searchString, execGet])

  const items = data?.items.map((fine) => <FinesSearchResult fine={ fine } />) ?? []

  return (
    <>
      { isBusy ?
        <Spinner /> :
        <>
          { items.length > 0 ?
            <>
              <Heading as="h2">Resultaat invorderingscheck</Heading>
              <List items={ items } />
            </> :
            searchString.length > 0 &&
            <>
              <Heading as="h2">Resultaat invorderingscheck</Heading>
              <p>De gezochte beschikking is nog niet bekend bij belastingen.</p>
              <p>Belastingen pakt overgedragen beschikkingen in principe op binnen <strong>5 werkdagen</strong>.
                <span>
                  <InfoButton
                    infoTitle="Facturatie"
                    infoText="Binnen de termijn wordt de eerste factuur naar de overtreder verstuurd."
                  />
                </span>
              </p>
              <p>Indien deze tijd verstreken is, controleer dan of de beschikking juist verstuurd is.</p>
            </>
          }
        </>
      }
    </>
  )
}

export default FinesSearchResultsList
