
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./utils/mapWorkflowDataToScaffold"
import mapCamundaToInitialValues from "./utils/mapWorkflowDataToInitialValues"
import mapSubmitData from "./utils/mapSubmitData"

type Props = {
  workflowForm: Components.Schemas.CaseUserTask["form"]
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
      initialValues={ mapCamundaToInitialValues(workflowForm) }
    >
      <ScaffoldFields { ...createScaffoldProps(workflowForm, onCancel) } />
    </ScaffoldForm>
  </div>
)

export default WorkflowForm
