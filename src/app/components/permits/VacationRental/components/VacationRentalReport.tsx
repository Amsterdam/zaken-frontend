import useNumberOfDaysBetweenDates from "./hooks/useNumberOfDaysBetweenDates"
import useVacationRentalReportValues from "./hooks/useVacationRentalReportValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  checkInDate: string
  checkOutDate: string
  isCancellation: boolean
}

const VactionRentalReport: React.FC<Props> = ({ checkInDate, checkOutDate, isCancellation }) => {

  const nightsRented = useNumberOfDaysBetweenDates(checkInDate, checkOutDate)
  const title = `${ isCancellation ? "Afmelding" : "Melding" } (${ nightsRented } nachten)`
  const values = useVacationRentalReportValues(checkInDate, checkOutDate)

  return <DefinitionList title={ title } data={ values } headingSize="h4" />
}

export default VactionRentalReport