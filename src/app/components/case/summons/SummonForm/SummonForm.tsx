import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useSummons, useSummonTypes } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/summons/SummonForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

type SummonData = Omit<Components.Schemas.Summon, "type"> & { type: { id: number } }

const mapData = (data: SummonData) => ({ ...data, type: data.type.id })

const SummonForm: React.FC<Props> = ({ id }) => {

  const teamId = useCase(id)[0]?.team.id
  const [data] = useSummonTypes(teamId)
  const summonTypes = data?.results ?? []
  const [, { execPost }] = useSummons(id, { lazy: true })
  const postMethod = async (data: SummonData) => await execPost(mapData(data))

  return (
    <>
      <FormTitle>Meld welke aanschrijving is opgesteld en voor wie. Doe dit nadat de brief daadwerkelijk verstuurd is.</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          data={ summonTypes }
          postMethod={ postMethod }
          scaffold={ scaffold }
          initialValues={ { case: id } }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default SummonForm