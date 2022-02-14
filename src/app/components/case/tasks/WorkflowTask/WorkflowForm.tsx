
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import mapWorkflowDataToScaffold from "./utils/mapWorkflowDataToScaffold"
import mapWorkflowDataToInitialValues from "./utils/mapWorkflowDataToInitialValues"
import mapSubmitData from "./utils/mapSubmitData"

type Props = {
  workflowForm: Components.Schemas.CaseUserTaskWorkdflow["form"]
  onSubmit: (data: Components.Schemas.GenericCompletedTask) => void
  isLoading?: boolean
  onCancel: () => void
}
const WorkflowForm: React.FC<Props> = ({ workflowForm, isLoading, onSubmit, onCancel }) => (
  <div>
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ (data: unknown) => { onSubmit(mapSubmitData(workflowForm, data)) } }
      onCancel={ onCancel }
      initialValues={ mapWorkflowDataToInitialValues(workflowForm) }
    >
      <ScaffoldFields { ...mapWorkflowDataToScaffold(workflowForm, onCancel) } />
    </ScaffoldForm>
  </div>
)

export default WorkflowForm
