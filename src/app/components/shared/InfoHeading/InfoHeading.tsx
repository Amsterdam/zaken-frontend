import { Heading } from '@amsterdam/asc-ui';
import InfoButton from './InfoButton';

type Props = {
  infoTitle: string
  infoText: React.ReactNode
  as?: React.ComponentProps<typeof Heading>['as']
  children?: React.ReactNode
}

const InfoHeading: React.FC<Props> = ({
  infoTitle, infoText, as = 'h2', children,
}) => (
  <Heading as={as}>
    { children }
    <InfoButton infoTitle={infoTitle} infoText={infoText} />
  </Heading>
);

export default InfoHeading;
