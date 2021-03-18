import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useDecisions } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/decisions/DecisionForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import DecisionHeader from "../DecisionHeader"
import { useDecisionTypes } from "app/state/rest/teams"

type Props = {
  id: Components.Schemas.Case["id"]
}

type DecisionData = Omit<Components.Schemas.Decision, "decision_type"> & { decision_type: { id: number } }

const mapData = (data: DecisionData) => ({ ...data, decision_type: data.decision_type.id })
const DecisionForm: React.FC<Props> = ({ id }) => {

  const teamId = useCase(id)[0]?.team.id
  const [data] = useDecisionTypes(teamId)
  const decisionTypes = data?.results ?? []
  const [, { execPost }] = useDecisions({ lazy: true })
  const postMethod = async (data: DecisionData) => await execPost(mapData(data))
  
  return (
    <>
      <DecisionHeader caseId={ id }/>
      <FormTitle>Gebruik dit formulier om aan te geven welk besluit is genomen</FormTitle>
      <FormWithExtraLabel>
      <WorkflowForm
          caseId={ id }
          data={ decisionTypes }
          postMethod={ postMethod }
          scaffold={ scaffold }
          initialValues={ { case: id } }
      />
      </FormWithExtraLabel>
    </>
  )
}

export default DecisionForm