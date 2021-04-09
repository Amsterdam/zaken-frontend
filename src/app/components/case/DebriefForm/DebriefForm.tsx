import { FC } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import usePageDebriefing from "app/pages/case/debriefings/hooks/usePageDebriefing"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"
import scaffold from "./scaffold"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DebriefCreateForm: FC<Props> = ({ id }) => {

  const { handleCreate } = usePageDebriefing(id)
  const initialValues = { case: id }

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          postMethod={ handleCreate }
          scaffold={ scaffold }
          initialValues={ initialValues }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default DebriefCreateForm