import {
  Spinner, Heading, Paragraph, themeColor,
} from '@amsterdam/asc-ui';
import { Link } from '@reach/router';
import { DefinitionList } from '@amsterdam/wonen-ui';
import styled from 'styled-components';

import to from 'app/routing/utils/to';
import { usePermitDetails } from 'app/state/rest';
import usePermitValues from './hooks/usePermitValues';

type Props = {
  bagId: string
}

const StyledLink = styled(Link)`
  color: ${themeColor('primary')};
  font-size: 18px;
  &:hover {
    color: ${themeColor('secondary')};
  }
`;

const PermitOverview: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId);
  const values = usePermitValues(data);

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      { values === undefined ? (
        <>
          <Heading forwardedAs="h2">Vergunningen</Heading>
          <Paragraph>Geen vergunningen gevonden</Paragraph>
        </>
      ) : (
        <DefinitionList loading={isBusy} numLoadingRows={2} title="Vergunningen" data={values} />
      )}
      <StyledLink to={to('/adres/:bagId/vergunningen', { bagId })}>Alle vergunningen details</StyledLink>
    </>
  );
};

export default PermitOverview;
