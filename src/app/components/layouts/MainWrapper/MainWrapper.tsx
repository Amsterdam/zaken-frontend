import styled from 'styled-components';
import { breakpoint, themeSpacing } from '@amsterdam/asc-ui';
import { sizes } from '@amsterdam/asc-ui/lib/theme/default/breakpoints';

const Main = styled.main`
  box-sizing: border-box;
  margin: 0 auto ${themeSpacing(8)};
  padding: ${themeSpacing(6)} ${themeSpacing(3)};
  width: 100%;
  max-width: ${sizes.laptopL}px;

  @media screen and ${breakpoint('min-width', 'laptopM')} {
    padding: ${themeSpacing(2)} ${themeSpacing(10)} ${themeSpacing(12)};
  }
`;
const MainWrapper: React.FC = ({ children }) => (
  <Main id="a11y_content">
    { children }
  </Main>
);

export default MainWrapper;
