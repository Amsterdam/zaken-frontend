import AddressHeader from 'app/components/addresses/AddressHeader/AddressHeader';

type Props = {
  bagId: string
  enableSwitch?: boolean
}

const DetailHeader: React.FC<Props> = ({ bagId, enableSwitch }) => (
  <AddressHeader bagId={bagId!} enableSwitch={enableSwitch} headingSize="h2" />
);

export default DetailHeader;
