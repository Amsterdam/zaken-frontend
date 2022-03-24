import { PermitsOverview } from '@amsterdam/wonen-ui';
import { usePermitDetails } from 'app/state/rest';

type Props = {
  bagId: string
}

const PermitDetails: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId);

  return (
    <PermitsOverview
      permits={data?.permits || []}
      loading={isBusy}
    />
  );
};

export default PermitDetails;
