import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets/lib"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import ConfirmButton from "app/features/shared/components/molecules/ConfirmButton/ConfirmButton"

import FormEdit from "app/features/cases/components/organisms/FormEdit/FormEdit"

import { useEditPage } from "./hooks/useEditPage"

type Props = {
  uuid: API.Case["uuid"]
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ uuid }) => {
  const { handleDelete, caseDetails, isLoading, hasError, errorMessage, handleUpdate } = useEditPage(uuid)

  return (
    <DefaultLayout>
      <Heading>Aanpassen zaak</Heading>
      <ActionButtonWrap>
        <ConfirmButton
          disabled={isLoading}
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
      <FormEdit
        errorMessage={errorMessage as unknown as { detail: string }}
        hasError={hasError}
        onSubmit={handleUpdate}
        isLoading={isLoading}
        caseDetails={caseDetails}
      />
    </DefaultLayout>
  )
}

export default EditPage
