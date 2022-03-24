import styled from 'styled-components';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

export default styled.div`
  background: ${themeColor('tint', 'level2')};
  margin-top: ${themeSpacing(8)};
  padding: ${themeSpacing(4)} ${themeSpacing(6)};
`;
