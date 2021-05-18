import { DateDisplay } from "@amsterdam/wonen-ui"

import useNumberOfDaysBetweenDates from "./hooks/useNumberOfDaysBetweenDates"
import TwoColumns from "./TwoColumns"
import Label from "./Label"
import Text from "./Text"

type Props = {
  checkInDate: string
  checkOutDate: string
  isCancellation: boolean
}

const VactionRentalReport: React.FC<Props> = ({ checkInDate, checkOutDate, isCancellation }) => {

  const nightsRented = useNumberOfDaysBetweenDates(checkInDate, checkOutDate)

  return (
    <>
      <TwoColumns>
        <strong>
          { `${ isCancellation ? "Afmelding" : "Melding" } ${ nightsRented } nachten` }
        </strong>
      </TwoColumns>
      <Label>Check in</Label>
      <Text><DateDisplay date={ checkInDate } /></Text>
      <Label>Check out</Label>
      <Text><DateDisplay date={ checkOutDate } /></Text>
    </>
  )
}

export default VactionRentalReport