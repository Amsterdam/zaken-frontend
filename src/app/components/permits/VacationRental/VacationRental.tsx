import { Spinner, Paragraph, Heading } from "@amsterdam/asc-ui"
import { DefinitionList } from "@amsterdam/wonen-ui"

import { usePermitDetails } from "app/state/rest"
import VacationRentalReport from "./components/VacationRentalReport"
import useVacationRentalValues from "./components/hooks/useVacationRentalValues"

type Props = {
  bagId: string
}

const VacationRental: React.FC<Props> = ({ bagId }) => {

  const title = "Vakantieverhuur meldingen"

  const [data, { isBusy }] = usePermitDetails(bagId)
  const values = useVacationRentalValues(data?.vakantieverhuur_reports)
  const reports = data?.vakantieverhuur_reports?.reports ?? []

  return (
    <>
      { isBusy ?
        <Spinner /> :
        <>
          { reports.length === 0 ?
            <>
              <Heading forwardedAs="h4">{ title }</Heading>
              <Paragraph>Geen vakantieverhuur meldingen</Paragraph>
            </> :
            <>
              <DefinitionList title={ title } data={ values } headingSize="h4" />
              { reports.map(({ check_in_date, check_out_date, is_cancellation }, index: number) =>
                  <VacationRentalReport
                    key={ index }
                    checkInDate={ check_in_date }
                    checkOutDate={ check_out_date }
                    isCancellation={ is_cancellation }
                  />
              ) }
            </>
          }
        </>
      }
    </>
  )
}

export default VacationRental
