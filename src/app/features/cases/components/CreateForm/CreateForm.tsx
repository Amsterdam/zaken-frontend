import React, { useState } from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useTeams, useReasons, useCase } from "app/state/rest"
import ConfirmScaffoldFields from "./ConfirmScaffoldFields"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const teams = useTeams()
  const reasons = useReasons()
  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState<any>()
  const { execPost } = useCase()

  if (teams.data === undefined || reasons.data === undefined) return <Spinner />

  const fields = scaffold(bagId, teams.data, reasons.data)

  const onSubmit = (data: any) => {
    setSubmitted(true)
    setData(data)
  }

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      { isSubmitted === false ?
        <ScaffoldFields { ...fields } /> :
        <ConfirmScaffoldFields
          fields={ fields }
          data={ data }
          onCancel={ () => setSubmitted(false) }
          submitTitle="Zaak aanmaken"
          onSubmit={ execPost }
        />
      }
    </ScaffoldForm>
  )
}
export default CreateForm