import { Link } from '@amsterdam/asc-ui';

type Props = {
  bagId: Components.Schemas.Address['bag_id']
}

// TODO: make hardcoded link dynamic
const DecosLink: React.FC<Props> = ({ bagId }) => (
  <Link href={`https://decosdvl.amsterdam.nl/decosweb/aspx/Search.aspx?q=${bagId}`} variant="inline" icon="external" target="_blank" rel="noreferer">
    Voor alle vergunningen zie Decos Join
  </Link>
);

export default DecosLink;
