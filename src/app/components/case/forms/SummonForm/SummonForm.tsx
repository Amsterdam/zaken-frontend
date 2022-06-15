
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useSummons, useSummonTypes } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/SummonForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

//TODO Schema from backend should be improved
type SummonData = Omit<Components.Schemas.Summon, "type"> & {
  type: { id: number }
  entity_type: "natural" | "legal"
  legal_entity_type: "board" | "person"
  legal_entity_name: string
  legal_entity_role: Components.Schemas.PersonRoleEnum
  persons_legal_entity: Components.Schemas.SummonedPerson[]
}

const mapData = (data: SummonData) => {
  let persons: any[] = []
  if (data.entity_type === "legal") {
    if (data.legal_entity_type === "board") {
      persons.push({
        person_role: (data.legal_entity_role as any).key,
        function: "Bestuur",
        entity_name: data.legal_entity_name
      })
    } else {
      const legalEntityPerson = data.persons_legal_entity[0]
      if (legalEntityPerson) {
        persons.push({
          ...legalEntityPerson,
          person_role: (data.legal_entity_role as any).key,
          entity_name: data.legal_entity_name
        })
      }
    }
  } else {
    data.persons?.forEach((person: Components.Schemas.SummonedPerson) => {
      const p = person
      p.person_role = (person.person_role as any).key
      p.entity_name = data.legal_entity_name
      persons.push(p)
    })
  }
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