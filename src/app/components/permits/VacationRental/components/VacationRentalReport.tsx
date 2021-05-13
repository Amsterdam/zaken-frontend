import { DateDisplay } from "@amsterdam/wonen-ui"

import TwoColumns from "./TwoColumns"
import Label from "./Label"
import Text from "./Text"

type Props = {
  checkInDate: string
  checkOutDate: string
  isAfmelding: boolean
}

const VactionRentalReport: React.FC<Props> = ({ checkInDate, checkOutDate, isAfmelding }) => {

  const checkIn = new Date(checkInDate)
  const checkOut = new Date(checkOutDate)
  // TODO: Document that magic number
  const nightsRented = (checkOut.getTime() - checkIn.getTime()) / 8.64e+7

  return (
    <>
      <TwoColumns>
        <strong>
          { isAfmelding ? "Afmelding " : "Melding " }
          { nightsRented } nachten
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