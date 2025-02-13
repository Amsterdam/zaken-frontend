import { HolidayRentalReports } from "@amsterdam/wonen-ui"
import { useMeldingen } from "app/state/rest"

type Props = {
  bagId: string
}

const RentalReports: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useMeldingen(bagId)

  return (
    <HolidayRentalReports
      data={ data?.data || [] }
      loading={ isBusy }
    />
  )
}

export default RentalReports
