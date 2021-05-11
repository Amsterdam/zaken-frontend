import { FormTitle } from "@amsterdam/asc-ui"
import { useParams } from "@reach/router"

import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import { useDebriefingCreate } from "app/state/rest"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DebriefCreateForm: React.FC<Props> = ({ id }) => {

  const [, { execPost }] = useDebriefingCreate()
  const fields = useScaffoldedFields(scaffold, id)
  const taskId = useParams().camundaTaskId

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          fields={ fields }
          postMethod={ execPost }
          camundaTaskId={ taskId }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default DebriefCreateForm