import { Spinner, Paragraph, Heading } from "@amsterdam/asc-ui"

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

const VacationRental: React.FC<Props> = ({ bagId }) => {

  const [data, { isBusy }] = usePermitDetails(bagId)
  const reports = data?.vakantieverhuur_reports ?? undefined

  return (
    <>
      { isBusy ?
        <Spinner /> :
        <>
          <Heading forwardedAs="h4">Vakantieverhuur meldingen</Heading>
          { reports === undefined || reports?.reports.length === 0 ?
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
                    { reports.reports.map(({ check_in_date, check_out_date, is_cancellation }, index: number) =>
                        <VacationRentalReport checkInDate={ check_in_date } checkOutDate={ check_out_date } isCancellation={ is_cancellation } key={ index } />
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
