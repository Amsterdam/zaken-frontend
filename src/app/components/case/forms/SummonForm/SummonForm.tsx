
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useSummons, useSummonTypes } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/SummonForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTask["case_user_task_id"]
}

//TODO Schema from backend should be improved
type SummonData = Omit<Components.Schemas.Summon, "type"> & { type: { id: number } }
const mapData = (data: SummonData) => {
  
  const persons = data.persons.map(person => { 
    const p = person
    p.person_role = (person.person_role as any).key
    return p
  })
  return ({ ...data, type: data.type.id, persons })

}

const SummonForm: React.FC<Props> = ({ id, caseUserTaskId }) => {

  const themeId = useCase(id)[0]?.theme.id
  const [data] = useSummonTypes(themeId)
  const summonTypes = data?.results
  const fields = useScaffoldedFields(scaffold, id, summonTypes)
  const [, { execPost }] = useSummons({ lazy: true })

  return (
    <>
      <FormTitle>Meld welke aanschrijving is opgesteld en voor wie. Doe dit nadat de brief daadwerkelijk verstuurd is.</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        mapData={ mapData }
        postMethod={ execPost }
        caseUserTaskId={ caseUserTaskId }
      />
    </>
  )
}

export default SummonForm