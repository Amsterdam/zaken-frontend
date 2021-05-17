import { Spinner, Paragraph, Heading, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import { usePermitDetails } from "app/state/rest"
import TwoColumns from "./components/TwoColumns"
import Label from "./components/Label"
import Text from "./components/Text"
import Details from "./components/Details"
import Grid from "./components/Grid"
import Hr from "./components/Hr"
import Summary from "./components/Summary"
import VacationRentalReport from "./components/VacationRentalReport"

type Props = {
  bagId: string
}

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(3) }
`

const VacationRental: React.FC<Props> = ({ bagId }) => {

  const [data, { isBusy }] = usePermitDetails(bagId)
  const reports = data?.vakantieverhuur_meldingen ?? undefined

  return (
    <>
      { isBusy ?
        <Spinner /> :
        <>
          <StyledHeading forwardedAs="h4">Vakantieverhuur meldingen</StyledHeading>
          { reports === undefined || reports?.meldingen.length === 0 ?
            <Paragraph>Geen vakantieverhuur meldingen</Paragraph> :
            <Grid>
              <Label>Nachten verhuurd</Label>
              <Text>
                <strong>{ reports.rented_days_count }</strong>
              </Text>
              <Label>Vandaag verhuurd</Label>
              <Text>{ reports.is_rented_today ? "Ja" : "Nee" }</Text>
              <Label>Nachten gepland</Label>
              <Text>{ reports.planned_days_count }</Text>
              { (reports.rented_days_count ?? 0) > 0 &&
              <>
                <TwoColumns>
                  <Hr />
                </TwoColumns>
                <Details>
                  <Summary>Alle meldingen</Summary>
                  <Grid>
                    { reports.meldingen.map(({ check_in_date, check_out_date, is_afmelding }, index: number) =>
                        <VacationRentalReport checkInDate={ check_in_date } checkOutDate={ check_out_date } isAfmelding={ is_afmelding } key={ index } />
                    ) }
                  </Grid>
                </Details>
              </>
              }
            </Grid>
          }
        </>
      }
    </>
  )
}

export default VacationRental
