import { ScaffoldForm } from '@amsterdam/amsterdam-react-final-form';
import ScaffoldFields from 'app/components/shared/Form/ScaffoldFields';
import styled from 'styled-components';
import createScaffoldProps from './scaffold';

type Props = {
  onSubmit: (data: Components.Schemas.GenericCompletedTask) => Promise<unknown>
  isLoading?: boolean
  onCancel: () => void
}

const Div = styled.div`
  button[type=submit] {
    float: right;
    clear: both;
  }
`;

const CompleteTaskForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel }) => (
  <Div>
    <ScaffoldForm
      showSpinner={isLoading}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <ScaffoldFields {...createScaffoldProps(onCancel)} />
    </ScaffoldForm>
  </Div>
);

export default CompleteTaskForm;
