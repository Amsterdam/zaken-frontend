import { HolidayRentalReports } from "@amsterdam/wonen-ui"
import { useMeldingen } from "app/state/rest"

type Props = {
  bagId: string
}

const VacationRental: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useMeldingen(bagId)

  return (
    <HolidayRentalReports
      data={ ((data?.data) != null) || [] }
      loading={ isBusy }
    />
  )
}

export default VacationRental
