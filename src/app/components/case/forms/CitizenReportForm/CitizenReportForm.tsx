import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CitizenReportForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import { useCase, useCreateCitizenReport } from "@/api/hooks"
import { toPostMethod } from "@/api/utils/toPostMethod"
import useNavigation from "app/routing/useNavigation"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

// Nuisance is an array but a boolean is expected.
const mapData = (data: any) => ({
  ...data,
  nuisance: data.nuisance ? data.nuisance.includes("nuisance") : false,
})

const CitizenReportForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const createCitizenReport = toPostMethod(
    useCreateCitizenReport(id).mutateAsync,
  )
  const { data } = useCase(id)
  const themeName = data?.theme.name
  const { navigateTo } = useNavigation()
  const fields = useScaffoldedFields(
    scaffold,
    id,
    navigateTo,
    themeName as string,
  )

  return (
    <WorkflowForm
      id={id}
      postMethod={createCitizenReport}
      fields={fields}
      caseUserTaskId={caseUserTaskId}
      mapData={mapData}
    />
  )
}

export default CitizenReportForm
