import React from "react"
import styled from "styled-components"
import { themeSpacing, Row, Spinner } from "@datapunt/asc-ui"

import { usePermitDetails } from "app/state/rest"
import PermitDetails from "./PermitDetails"

type Props = {
  bagId: string
}

const Ul = styled.ul`
  margin: ${ themeSpacing(8) } 0 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: ${ themeSpacing(8) };
    max-width: 390px;
  }
`

const PermitDetailsList: React.FC<Props> = ({ bagId }) => {
  const { data, isBusy } = usePermitDetails(bagId)
  const listItems = data?.map((detail) => 
  
    <li key={detail.permit_type}>
      <PermitDetails detail={ detail } />
    </li>
  )
  
  return (
    <>
      <Row>
        { isBusy && <Spinner /> }
        { !isBusy && 
          <Ul>
            {listItems}
          </Ul>
        }
      </Row>
    </>
  )
}
export default PermitDetailsList
