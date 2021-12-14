
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"

type Props = {
  onSubmit: (data: any) => void
  isLoading?: boolean
  onCancel: () => void
  subjects?: Components.Schemas.Subject[]
  initialValues?: Record<string, unknown> 
}

const ChangeSubjectForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel , subjects }) => {
  console.log("subjects", subjects)

  return (
    <div>
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      onCancel={onCancel}
      initialValues={ subjects }
    >
      <ScaffoldFields { ...createScaffoldProps(onCancel ) } />
    </ScaffoldForm>
  </div>
  )
}
  

export default ChangeSubjectForm
