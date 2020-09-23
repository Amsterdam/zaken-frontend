import React from "react"
import styled from "styled-components"
import { Link } from "@datapunt/asc-ui"
import Heading from "app/features/shared/components/atoms/Heading/Heading"

type Props = {detail: Components.Schemas.DecosPermit}

  const permitType = {
    BED_AND_BREAKFAST: "Bed and breakfast",
    VAKANTIEVERHUUR: "Vakantieverhuur",
    PERMIT_UNKNOWN: "Onbekend"
  }

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
const PermitDetail: React.FC<Props> = ({ detail }) => {
    const { permit_granted, permit_type, date_from, date_to, decos_join_web_url } = detail
    return (
        <>
            { permit_type && <Heading forwardedAs="h2">{ permitType[ permit_type ] }</Heading> }
            <Dl>
                <dt>Vergunning:</dt>
                <dd>{permit_granted ? "ja" : "nee"}</dd>
                <dt>Begindatum:</dt>
                <dd>{ date_from || "-" }</dd>
                <dt>Einddatum:</dt>
                <dd>{ date_to ?? "-" }</dd>
                    
            </Dl>
            { decos_join_web_url && permit_type &&
              <Link href={ decos_join_web_url } variant="inline" icon="external" target="_blank">
                { permitType[ permit_type ] } vergunning
            </Link>}
        </>
    )
}
export default PermitDetail
