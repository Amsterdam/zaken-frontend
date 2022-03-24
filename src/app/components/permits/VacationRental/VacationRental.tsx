import { HolidayRental } from '@amsterdam/wonen-ui';
import { usePermitDetails } from 'app/state/rest';

type Props = {
  bagId: string
}

const VacationRental: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId);

  return (
    <HolidayRental
      data={data?.vakantieverhuur_reports || []}
      loading={isBusy}
    />
  );
};

export default VacationRental;
