import { Link } from '@reach/router';
import { Typography, themeColor } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import to from 'app/routing/utils/to';

type Props = {
  bagId: Components.Schemas.Address['bag_id']
  as?: React.ComponentProps<typeof Typography>['styleAs']
  title?: string
}

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${themeColor('secondary')};
  }
`;

const AddressLink: React.FC<Props> = ({ title, bagId, as = 'h2' }) => (
  <StyledLink to={to('/adres/:bagId', { bagId })}>
    <Typography as={as} styleAs={as}>{ title }</Typography>
  </StyledLink>
);

export default AddressLink;
