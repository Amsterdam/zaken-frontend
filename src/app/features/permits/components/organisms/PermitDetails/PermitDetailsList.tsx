import React from "react"
import styled from "styled-components"
import { themeSpacing, themeColor, Row, Spinner } from "@datapunt/asc-ui"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import { usePermitDetails } from "app/state/rest"
import PermitDetails from "./PermitDetails"

type Props = {
  bagId: string
}

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;

  li {
    margin-bottom: ${ themeSpacing(8) };
    padding-left: ${ themeSpacing(4) };
    border-left: 1px solid ${ themeColor("tint", "level3") };
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
      <Row halign="flex-start">
        <Heading forwardedAs="h2">Vergunningen vakantieverhuur</Heading>
      </Row>
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
