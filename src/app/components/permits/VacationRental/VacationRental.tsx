import { Spinner, Paragraph, Heading } from "@amsterdam/asc-ui"

import { usePermitDetails } from "app/state/rest"
import VacationRentalReport from "./components/VacationRentalReport"

type Props = {
  bagId: string
}

const TITLE = "Vakantieverhuur meldingen"

const VacationRental: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId)
  const vakantieverhuurReports = data?.vakantieverhuur_reports ?? []
  vakantieverhuurReports.sort((a, b) => b.year - a.year ) // Oldest year at the end.

  if (isBusy) {
    return <Spinner />
  }
  if (!(vakantieverhuurReports.length > 0)) {
    return (
      <>
        <Heading forwardedAs="h4">{ TITLE }</Heading>
        <Paragraph>Geen vakantieverhuur meldingen</Paragraph>
      </>
    )
  }
  return (
    <>
      { vakantieverhuurReports.map((vakantieverhuurReport) => (
          <VacationRentalReport
            vakantieverhuurReport={ vakantieverhuurReport }
            title={TITLE}
            key={vakantieverhuurReport.year}
          />
        ))
      }
    </>
  )
}

export default VacationRental
