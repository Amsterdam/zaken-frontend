import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"
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

const ChangeSubjectForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel, subjects, initialValues }) => {
  const [subjectsTheme] = useSubjects(subjects[0]?.theme)

  return (
    <>
      { subjectsTheme 
      ? (
        <div>
          <ScaffoldForm
            showSpinner={ isLoading }
            onSubmit={ onSubmit }
            onCancel={onCancel}
            initialValues={ initialValues }
          >
            <ScaffoldFields { ...createScaffoldProps(onCancel, subjectsTheme?.results ?? [] ) } />
          </ScaffoldForm>
        </div>
      )
      : <Spinner />
    }
  </>
  )
}

export default ChangeSubjectForm
