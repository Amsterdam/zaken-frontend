import { DateDisplay } from "@amsterdam/wonen-ui"

import useNumberOfDaysBetweenDates from "./hooks/useNumberOfDaysBetweenDates"
import TwoColumns from "./TwoColumns"
import Label from "./Label"
import Text from "./Text"

type Props = {
  checkInDate: string
  checkOutDate: string
  isAfmelding: boolean
}

const VactionRentalReport: React.FC<Props> = ({ checkInDate, checkOutDate, isAfmelding }) => {

  const nightsRented = useNumberOfDaysBetweenDates(checkInDate, checkOutDate)

  return (
    <>
      <TwoColumns>
        <strong>
          { `${ isAfmelding ? "Afmelding" : "Melding" } ${ nightsRented } nachten` }
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