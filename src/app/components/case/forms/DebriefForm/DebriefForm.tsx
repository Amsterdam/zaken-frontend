import { FormTitle } from "@amsterdam/asc-ui"

import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import { useCase, useCaseThemes, useDebriefingCreate, useViolationTypes } from "app/state/rest"
import useNavigation from "app/routing/useNavigation"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

const DebriefCreateForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
  const themeName = caseItem?.theme.name
  const [data] = useViolationTypes(themeId)
  const violationTypes = data?.results
  const [, { execPost }] = useDebriefingCreate()
  const { navigateTo } = useNavigation()
  const [themesData] = useCaseThemes()
  const fields = useScaffoldedFields(
    scaffold, id, navigateTo, violationTypes, themesData?.results ?? [], themeName
  )

  // Nuisance is an array but a boolean is expected.
  const mapData = (data: any) => ({
    ...data,
    nuisance_detected: data.nuisance_detected ? data.nuisance_detected.includes("nuisance_detected") : false
  })

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        postMethod={ execPost }
        caseUserTaskId={ caseUserTaskId }
        mapData={ mapData }
      />
    </>
  )
}

export default DebriefCreateForm