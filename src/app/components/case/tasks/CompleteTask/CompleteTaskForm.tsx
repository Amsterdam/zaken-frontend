import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form";
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields";
import createScaffoldProps from "./scaffold";
import styles from "./CompleteTaskForm.module.css";

type Props = {
  onSubmit: (data: components["schemas"]["GenericCompletedTask"]) => Promise<unknown>
  isLoading?: boolean
  onCancel: () => void
}

const CompleteTaskForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel }) =>
  <div className={ styles.div }>
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      onCancel={ onCancel }
    >
      <ScaffoldFields {...createScaffoldProps(onCancel) } />
    </ScaffoldForm>
  </div>;

export default CompleteTaskForm;
