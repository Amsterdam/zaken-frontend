import React, { useEffect } from "react"
import { useFine } from "app/state/rest"
import { Heading, Spinner, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import FinesSearchResult from "./FinesSearchResult"
import InfoButton from "app/components/shared/components/molecules/InfoHeading/InfoButton"

type Props = {
  searchString: string
}


const Ul = styled.ul`
  padding: 0;
  list-style: none;

  li {
    margin-bottom: ${ themeSpacing(14) };
  }
`

const FinesSearchResultsList: React.FC<Props> = ({ searchString }) => {
  const { data, isBusy, execGet } = useFine(searchString, { lazy: true })
  useEffect(() => {
    if (searchString.length === 0) return
    execGet()
  }, [searchString, execGet])

  const listItems = data?.items.map((fine) =>

    <li key={fine.identificatienummer}>
      <FinesSearchResult data={ fine } />
    </li>
  )

  const info = {
    infoTitle:"Facturatie",
    infoText: "Binnen de termijn wordt de eerste factuur naar de overtreder verstuurd."
  }

  return (
    <>

      { isBusy && <Spinner /> }
      { !isBusy &&
        <>

          { ( listItems && listItems.length > 0 ) ?
          <>
            <Heading as="h2">Resultaat invorderingscheck</Heading>
            <Ul>
              {listItems}
            </Ul>
        </> :
            ( searchString.length > 0 ) &&
            <>
              <Heading as="h2">Resultaat invorderingscheck</Heading>
              <p>De gezochte beschikking is nog niet bekend bij belastingen.</p>
              <p>Belastingen pakt overgedragen beschikkingen in principe op binnen <strong>5 werkdagen</strong>.
              <span><InfoButton infoTitle={info.infoTitle} infoText={info.infoText} /></span></p>
              <p>Indien deze tijd verstreken is, controleer dan of de beschikking juist verstuurd is.</p>
            </>
          }
        </>
      }
    </>
  )
}
export default FinesSearchResultsList
