import { FC } from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./utils/mapCamundaToScaffold"
import mapCamundaToInitialValues from "./utils/mapCamundaToInitialValues"
import mapSubmitData from "./utils/mapSubmitData"

type Props = {
  camundaForm: any
  onSubmit: (data: Components.Schemas.CamundaTaskComplete) => void
  isLoading?: boolean
  onCancel: () => void
}

const CamundaForm: FC<Props> = ({ camundaForm, isLoading, onSubmit, onCancel }) =>
  <div>
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ (data: any) => { onSubmit(mapSubmitData(camundaForm, data)) } }
      onCancel={ onCancel }
      initialValues={ mapCamundaToInitialValues(camundaForm) }
    >
      <ScaffoldFields { ...createScaffoldProps(camundaForm, onCancel) } />
    </ScaffoldForm>
  </div>

export default CamundaForm
