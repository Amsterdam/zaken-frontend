import { FormTitle } from "@amsterdam/asc-ui"

import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import {
  useCase,
  useCaseThemes,
  useCreateDebriefing,
  useViolationTypes,
} from "@/api/hooks"
import { toPostMethod } from "@/api/utils/toPostMethod"
import useNavigation from "app/routing/useNavigation"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

const DebriefCreateForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const themeId = caseItem?.theme.id
  const themeName = caseItem?.theme.name
  const { data } = useViolationTypes(themeId)
  const violationTypes = data?.results ?? []
  const createDebriefing = toPostMethod(useCreateDebriefing(id).mutateAsync)
  const { navigateTo } = useNavigation()
  const { data: themesData } = useCaseThemes()
  const fields = useScaffoldedFields(
    scaffold,
    id,
    navigateTo,
    violationTypes,
    themesData?.results ?? [],
    themeName,
  )

  // Nuisance is an array but a boolean is expected.
  const mapData = (data: any) => ({
    ...data,
    nuisance_detected: data.nuisance_detected
      ? data.nuisance_detected.includes("nuisance_detected")
      : false,
  })

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <WorkflowForm
        id={id}
        fields={fields}
        postMethod={createDebriefing}
        caseUserTaskId={caseUserTaskId}
        mapData={mapData}
      />
    </>
  )
}

export default DebriefCreateForm
