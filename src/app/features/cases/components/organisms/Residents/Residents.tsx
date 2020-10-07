import React from "react"
import styled from "styled-components"
import { themeSpacing, Heading } from "@datapunt/asc-ui"

import { useCaseResidents } from "app/state/rest"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"
import Resident from "./Resident"

type Props = {
  id: NonNullable<Components.Schemas.Case["identification"]>
}

const Ul = styled.ul`
  margin-top: ${ themeSpacing(8) };
  padding: 0;
  list-style: none;

  li {
    margin-bottom: ${ themeSpacing(14) };
  }
`

const Residents: React.FC<Props> = ({ id }) => {
  const { data: caseResidents } = useCaseResidents(id)

  return (
    <>
      { caseResidents ?
        <>
          <Heading as="h2">Actueel ingeschreven personen ({ caseResidents.items.length })</Heading>
          <Ul>
          { caseResidents.items
              .map((resident, index) =>
                <li key={ index }><Resident resident={ resident } num={ index + 1 }/></li>)
          }
          </Ul>
        </>
        :
        <LoadingDetails numRows={4} />
      }
    </>
  )
}
export default Residents
