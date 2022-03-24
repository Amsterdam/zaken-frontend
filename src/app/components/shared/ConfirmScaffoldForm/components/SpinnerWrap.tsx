import styled from 'styled-components';
import { Spinner } from '@amsterdam/asc-ui';

const Div = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerWrap: React.FC = () => (
  <Div>
    <Spinner size={36} />
  </Div>
);

export default SpinnerWrap;
