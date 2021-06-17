
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./utils/mapCamundaToScaffold"
import mapCamundaToInitialValues from "./utils/mapCamundaToInitialValues"
import mapSubmitData from "./utils/mapSubmitData"

type Props = {
  camundaForm: Components.Schemas.CamundaTask["form"]
  onSubmit: (data: Components.Schemas.CamundaTaskComplete) => void
  isLoading?: boolean
  onCancel: () => void
}
const CamundaForm: React.FC<Props> = ({ camundaForm, isLoading, onSubmit, onCancel }) => (
  <div>
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ (data: unknown) => { onSubmit(mapSubmitData(camundaForm, data)) } }
      onCancel={ onCancel }
      initialValues={ mapCamundaToInitialValues(camundaForm) }
    >
      <ScaffoldFields { ...createScaffoldProps(camundaForm, onCancel) } />
    </ScaffoldForm>
  </div>
)

export default CamundaForm
