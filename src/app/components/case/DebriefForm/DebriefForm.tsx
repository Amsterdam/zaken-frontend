import { FC } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"
import { useDebriefingCreate } from "app/state/rest"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DebriefCreateForm: FC<Props> = ({ id }) => {

  const [, { execPost }] = useDebriefingCreate()
  const fields = useScaffoldedFields(scaffold, id)

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          fields={ fields }
          postMethod={ execPost }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default DebriefCreateForm