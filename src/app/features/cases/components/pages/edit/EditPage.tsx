import React, { useCallback } from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, FormTitle, Heading } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets/lib"

import { useGlobalActions } from "app/state/state/globalState"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"

import FormEdit from "app/features/cases/components/organisms/FormEdit/FormEdit"
import { useCaseByUUID } from "app/features/cases/hooks/useCaseByUUID"

type Props = {
  uuid: API.Case["uuid"]
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ uuid }) => {
  const { cases: { del } } = useGlobalActions()
  const { caseDetails } = useCaseByUUID(uuid!)

  const handleOnClickDelete = useCallback(() => del(caseDetails!), [ caseDetails, del ])

  return (
    <DefaultLayout>
      <Heading>Aanpassen zaak:  { uuid }</Heading>
      <ActionButtonWrap>
        <Button onClick={handleOnClickDelete} iconLeft={<TrashBin />} variant="secondary">Verwijder deze zaak</Button>
      </ActionButtonWrap>
      <FormTitle>Gebruik dit formulier een zaak te wijzigen</FormTitle>
      { caseDetails && <FormEdit caseDetails={caseDetails} /> }
    </DefaultLayout>
  )
}

export default EditPage
