import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import { useSubjects } from "app/state/rest"
import createScaffoldProps from "./scaffold"

type Props = {
  onSubmit: (data: any) => void
  isLoading?: boolean
  onCancel: () => void
  subjects: Components.Schemas.Subject[]
  initialValues?: Record<string, unknown> 
}

const ChangeSubjectForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel , subjects }) => {
  const [subjectsTheme] = useSubjects(subjects[0]?.theme)
  return (
    <div>
      <ScaffoldForm
        showSpinner={ isLoading }
        onSubmit={ onSubmit }
        onCancel={onCancel}
        initialValues={ subjects }
      >
        <ScaffoldFields { ...createScaffoldProps(onCancel, subjectsTheme?.results ?? [] ) } />
      </ScaffoldForm>
    </div>
  )
}

export default ChangeSubjectForm
