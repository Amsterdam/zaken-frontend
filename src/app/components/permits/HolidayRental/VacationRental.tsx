import {
  HolidayRentalReports,
  type HolidayRentalReport,
} from "@amsterdam/wonen-ui"
import InfoAlert from "app/components/shared/InfoAlert/InfoAlert"
import { useMeldingen } from "@/api/hooks"

type Props = {
  bagId: string
}

const RentalReports: React.FC<Props> = ({ bagId }) => {
  const { data, isLoading: isBusy } = useMeldingen(bagId)

  return (
    <>
      {data?.fifteenNightsRuleApplicable && (
        <>
          <InfoAlert
            title="15-nachtenregel van toepassing!"
            message="Dit adres ligt in een gebied waar vanaf 1 april 2026 de 15-nachtenregel voor vakantieverhuur geldt."
          />
          <br />
        </>
      )}
      <HolidayRentalReports
        data={(data?.data || []) as HolidayRentalReport[]}
        loading={isBusy}
      />
    </>
  )
}

export default RentalReports
