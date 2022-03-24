import { Label, Select, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  margin: ${themeSpacing(3)} 0;
`;

export const StyledLabel = styled(Label)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${themeSpacing(3)};
`;
