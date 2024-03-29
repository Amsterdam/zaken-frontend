import { useCitizenReports } from "app/state/rest"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CitizenReportForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import { useCase } from "app/state/rest"
import useNavigation from "app/routing/useNavigation"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

// Nuisance is an array but a boolean is expected.
const mapData = (data: any) => ({
  ...data,
  nuisance: data.nuisance ? data.nuisance.includes("nuisance") : false
})

const CitizenReportForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const [, { execPost }] = useCitizenReports(id)
  const [data] = useCase(id)
  const themeName = data?.theme.name
  const { navigateTo } = useNavigation()
  const fields = useScaffoldedFields(scaffold, id, navigateTo, themeName as string)

  return (
    <WorkflowForm
      id={ id }
      postMethod={ execPost }
      fields={ fields }
      caseUserTaskId={ caseUserTaskId }
      mapData={ mapData }
    />
  )
}

export default CitizenReportForm