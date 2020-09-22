import React from "react"
import styled from "styled-components"
import { Link } from "@datapunt/asc-ui"
import Heading from "app/features/shared/components/atoms/Heading/Heading"

type Props = {
    detail: {
        permit_granted: boolean
        permit_type: "BED_AND_BREAKFAST" | "VAKANTIEVERHUUR" | "PERMIT_UNKNOWN"
        processed: string
        date_from: string | null
        date_to: string | null
        decos_join_web_url: string | null
    }
  }

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
            <Heading forwardedAs="h2">{ permitType[ permit_type ] }</Heading>
            <Dl>
                <dt>Vergunning:</dt>
                <dd>{permit_granted ? "ja" : "nee"}</dd>
                { date_from && <dt>Begindatum:</dt> }
                { date_from && <dd>{ date_from }</dd> }
                { date_to && <dt>Einddatum:</dt> }
                { date_to && <dd>{ date_to }</dd> }
                    
            </Dl>
            { decos_join_web_url && <Link href={ decos_join_web_url } variant="inline" icon="external">
                { decos_join_web_url } vergunning
            </Link>}
        </>
    )
}
export default PermitDetail
