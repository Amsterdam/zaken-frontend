import { HolidayRentalReports } from "@amsterdam/wonen-ui"
import { useMeldingen, useRegistrations } from "app/state/rest"

type Props = {
  bagId: string
}

const RentalReports: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useMeldingen(bagId)

  const [datasource] = useRegistrations(bagId)
  console.log("datasource", datasource)

  return (
    <HolidayRentalReports
      data={ data?.data || [] }
      loading={ isBusy }
    />
  )
}

export default RentalReports
