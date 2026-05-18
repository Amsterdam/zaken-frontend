import {
  HolidayRentalReports,
  type HolidayRentalReport,
} from "@amsterdam/wonen-ui";
import InfoAlert from "app/components/shared/InfoAlert/InfoAlert";
import { useMeldingen } from "app/state/rest";

type Props = {
  bagId: string;
};

const RentalReports: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useMeldingen(bagId);

  return (
    <>
      {data?.fifteen_nights_rule_applicable && (
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
  );
};

export default RentalReports;
