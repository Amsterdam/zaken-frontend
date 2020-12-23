import React, { useEffect } from "react"
import { useFine } from "app/state/rest"
import { Spinner, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import FinesSearchResult from "./FinesSearchResult"

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
    searchString.length > 0 &&
    execGet()
  }, [searchString, execGet])

  const listItems = data?.items.map((fine) => 
  
    <li key={fine.identificatienummer}>
      <FinesSearchResult data={ fine } />
    </li>
  )

  return (
    <>
      { isBusy && <Spinner /> }
      { !isBusy && 
        <>
          { ( listItems && listItems.length > 0 ) ?
            <Ul>
              {listItems}
            </Ul> :
            <p>Er is geen invorderingsbseluit gevonden</p>
          }
        </>
      }
    </>
  )
}
export default FinesSearchResultsList
