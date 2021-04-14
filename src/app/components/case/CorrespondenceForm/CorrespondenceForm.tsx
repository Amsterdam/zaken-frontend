import { FC, useMemo } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCorrespondence } from "app/state/rest/"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"
import scaffold from "app/components/case/CorrespondenceForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CorrespondenceForm: FC<Props> = ({ id }) => {

  const [correspondences, { execPost }] = useCorrespondence()

  const fields = useMemo(
    () => correspondences !== undefined ? scaffold(id, correspondences) : undefined,
    [id, correspondences]
  )

  return (
    <>
      <FormTitle>Gebruik dit formulier om notitie van correspondentie toe te voegen</FormTitle>
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

export default CorrespondenceForm
