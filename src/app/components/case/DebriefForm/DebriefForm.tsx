import { FC } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import usePageDebriefing from "app/pages/case/debriefings/hooks/usePageDebriefing"
import scaffold from "./scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DebriefCreateForm: FC<Props> = ({ id }) => {

  const { handleCreate } = usePageDebriefing(id)
  const fields = scaffold(id)
  const initialValues = { case: id }

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          fields={ fields }
          postMethod={ handleCreate }
          initialValues={ initialValues }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default DebriefCreateForm