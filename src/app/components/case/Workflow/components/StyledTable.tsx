import styled from 'styled-components';
import { Table } from '@amsterdam/wonen-ui';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

export default styled(Table)`
  margin-bottom: ${themeSpacing(5)};
  th {
    color: ${themeColor('tint', 'level4')};
  }
  td {
    padding: ${themeSpacing(3)};
    line-height: ${themeSpacing(5)};
    vertical-align: middle;
    &:first-child {
      width: 32px;
    }
  }
`;
