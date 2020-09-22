import React from "react"
import styled from "styled-components"
import { themeSpacing, themeColor, Link, Row, Spinner } from "@datapunt/asc-ui"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import { usePermitDetails } from "app/state/rest"

type Props = {
  bagId: string
}

const permitType = {
  BED_AND_BREAKFAST: "Bed and breakfast",
  VAKANTIEVERHUUR: "Vakantieverhuur",
  PERMIT_UNKNOWN: "Onbekend"
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

const Dl = styled.dl`

  display: flex;
  flex-wrap: wrap;
  width:100%;

  > * {
    padding-top: 0.5em;
  }
  dt {
    width:45%;
  }
  dd {
    width:55%;
    padding-left:1em;
    margin-left: 0px;
  }
`

const PermitDetails: React.FC<Props> = ({ bagId }) => {
  const { data, isBusy } = usePermitDetails(bagId)
  const listItems = data?.map((detail) => 
  
    <li key={detail.permit_type}>
      <Heading forwardedAs="h2">{ permitType[ detail.permit_type ] }</Heading>
        <Dl>
            <dt>Vergunning:</dt>
            <dd>{detail.permit_granted ? "ja" : "nee"}</dd>
            { detail.date_from && <dt>Begindatum:</dt> }
            { detail.date_from && <dd>{ detail.date_from }</dd> }
            { detail.date_to && <dt>Einddatum:</dt> }
            { detail.date_to && <dd>{ detail.date_to }</dd> }
                
        </Dl>
        <Link href="/" variant="inline" icon="external">
          B &amp; B vergunning
        </Link>
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
export default PermitDetails
