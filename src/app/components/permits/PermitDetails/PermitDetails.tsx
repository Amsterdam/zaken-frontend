import { Link } from "@amsterdam/asc-ui"
import { DateDisplay } from "@amsterdam/wonen-ui"
import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { Heading } from "@amsterdam/asc-ui"

type Props = {detail: Components.Schemas.DecosPermit}

const Label = styled.label`
  color: ${ themeColor("tint", "level5") };
  font-weight: 500;
  word-break: break-word;
`
const Text = styled.span`
  word-break: break-word;
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  grid-gap: ${ themeSpacing(3) } ${ themeSpacing(4) };
  place-items: baseline start;
`

const PermitDetail: React.FC<Props> = ({ detail }) => {
  const { permit_granted, permit_type, details, decos_join_web_url } = detail

  const permitHasBeenGranted = (permit: Components.Schemas.DecosPermit) => permit.permit_granted === "GRANTED"
  const permitIsForBAndB = (permit: Components.Schemas.DecosPermit) => permit.permit_type.startsWith("B&B")
  const permitHasEndDate = (permit: Components.Schemas.DecosPermit) => permit.details?.DATE_VALID_TO || permit.details?.DATE_VALID_UNTIL

  return (
  <>
            <Heading forwardedAs="h4">{ permit_type }</Heading>
            <Grid>
              <Label>Conclusie</Label>
              <Text>{ permit_granted === "GRANTED" ? "Geldig" : "Niet geldig" }</Text>
              <Label>Resultaat</Label>
              <Text>{details?.RESULT}</Text>
              <Label>Omschrijving zaak</Label>
              <Text>{ details?.SUBJECT }</Text>
              <Label>Soort vergunning</Label>
              <Text>{details?.PERMIT_TYPE}</Text>
              <Label>Aangevraagd door</Label>
              <Text>{ details?.APPLICANT }</Text>
              { permitIsForBAndB(detail) &&
              <>
                <Label>Vergunninghouder</Label>
                <Text>{ details?.HOLDER }</Text>
              </>
              }
              <Label>Locatie</Label>
              <Text>{ details?.ADDRESS }</Text>
              { permitHasBeenGranted(detail) &&
              <>
                <Label>Verleend per</Label>
                <Text><DateDisplay date= { details?.DATE_VALID_FROM } /></Text>
                { permitHasEndDate(detail) &&
                permitIsForBAndB(detail) ?
                  <>
                    <Label>Geldig tot en met</Label>
                    <Text><DateDisplay date= { details?.DATE_VALID_UNTIL ?? details?.DATE_VALID_TO } /></Text>
                  </> :
                  <>
                    <Label>Geldig tot</Label>
                    <Text><DateDisplay date= { details?.DATE_VALID_TO ?? details?.DATE_VALID_UNTIL } /></Text>
                  </>
                }
              </>
              }
              { permit_granted === "NOT_GRANTED" && details?.DATE_DECISION &&
              <>
                <Label>Datum besluit</Label>
                <Text><DateDisplay date= { details?.DATE_DECISION } /></Text>
              </>
              }
            </Grid>

    { decos_join_web_url && permit_type &&
      <Link href={ decos_join_web_url } variant="inline" icon="external" target="_blank" rel="noreferer">
        { permit_type }
      </Link>
    }
  </>
  )
}
export default PermitDetail
