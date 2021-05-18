import styled from "styled-components"
import { Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { DateDisplay } from "@amsterdam/wonen-ui"

type Props = {
  detail: Components.Schemas.DecosPermit
}

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(3) }
`

const Label = styled.label`
  color: ${ themeColor("tint", "level5") };
  font-weight: 500;
  word-break: break-word;
`

const Text = styled.span`
  word-break: break-word;
  margin-right: ${ themeSpacing(4) };
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  grid-gap: ${ themeSpacing(3) } ${ themeSpacing(4) };
  place-items: baseline start;
`

const PermitDetail: React.FC<Props> = ({ detail }) => {

  const { permit_granted, permit_type, details } = detail

  const permitIsForBAndB = permit_type.startsWith("B&B")
  const endDateBAndB = details?.DATE_VALID_UNTIL ?? details?.DATE_VALID_TO
  const endDate = details?.DATE_VALID_TO ?? details?.DATE_VALID_UNTIL

  return (
    <>
      <StyledHeading forwardedAs="h4">{ permit_type }</StyledHeading>
      <Grid>
        <Label>Conclusie</Label>
        <Text>{ permit_granted === "GRANTED" ? "Geldig" : "Niet geldig" }</Text>
        <Label>Resultaat</Label>
        <Text>{ details?.RESULT ?? "-" }</Text>
        <Label>Omschrijving zaak</Label>
        <Text>{ details?.SUBJECT ?? "-" }</Text>
        <Label>Soort vergunning</Label>
        <Text>{ details?.PERMIT_TYPE ?? "-"}</Text>
        <Label>Aangevraagd door</Label>
        <Text>{ details?.APPLICANT ?? "-" }</Text>
        { permitIsForBAndB &&
        <>
          <Label>Vergunninghouder</Label>
          <Text>{ details?.HOLDER }</Text>
        </>
        }
        <Label>Locatie</Label>
        <Text>{ details?.ADDRESS }</Text>
        { permit_granted === "GRANTED" &&
        <>
          <Label>Verleend per</Label>
          <Text>{ details?.DATE_VALID_FROM ? <DateDisplay date={ details.DATE_VALID_FROM } /> : "-" }</Text>
          { permitIsForBAndB && endDateBAndB ?
            <>
              <Label>Geldig tot en met</Label>
              <Text><DateDisplay date={ endDateBAndB } /></Text>
            </> :
            <>
              <Label>Geldig tot</Label>
              <Text>{ endDate ? <DateDisplay date={ endDate } /> : "-" }</Text>
            </>
          }
        </>
        }
        { permit_granted === "NOT_GRANTED" && details?.DATE_DECISION &&
          <>
            <Label>Datum besluit</Label>
            <Text><DateDisplay date={ details.DATE_DECISION } /></Text>
          </>
        }
      </Grid>
    </>
  )
}
export default PermitDetail
