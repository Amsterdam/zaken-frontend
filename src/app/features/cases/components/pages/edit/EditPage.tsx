import React, { useCallback } from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets/lib"

import { useGlobalActions } from "app/state/state/globalState"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import ConfirmButton from "app/features/shared/components/molecules/ConfirmButton/ConfirmButton"

import FormEdit from "app/features/cases/components/organisms/FormEdit/FormEdit"
import { useCaseByUUID } from "app/features/cases/hooks/useCaseByUUID"

type Props = {
  uuid: API.Case["uuid"]
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ uuid }) => {
  const { cases: { del } } = useGlobalActions()
  const { caseDetails } = useCaseByUUID(uuid!)

  const handleDelete = useCallback(() => del(caseDetails!), [ caseDetails, del ])

  return (
    <DefaultLayout>
      <Heading>Aanpassen zaak:  { uuid }</Heading>
      <ActionButtonWrap>
        <ConfirmButton
          onConfirm={handleDelete}
          iconLeft={<TrashBin />}
          variant="secondary"
          modalTitle="Weet je zeker dat je deze zaak wilt verwijderen?"
          modalContent="Let op! Deze actie kan niet ongedaan worden gemaakt."
        >
          Verwijder deze zaak
        </ConfirmButton>
      </ActionButtonWrap>
      <FormTitle>Gebruik dit formulier een zaak te wijzigen</FormTitle>
      { caseDetails && <FormEdit caseDetails={caseDetails} /> }
    </DefaultLayout>
  )
}

export default EditPage
