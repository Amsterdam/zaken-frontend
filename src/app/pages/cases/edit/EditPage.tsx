import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@amsterdam/asc-ui"
import { Delete } from "app/features/shared/components/atoms/Icons"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ConfirmButton from "app/features/shared/components/molecules/ConfirmButton/ConfirmButton"

import Form from "app/features/cases/components/molecules/Form/Form"

import { useEditPage } from "./hooks/useEditPage"

type Props = {
  id: Components.Schemas.Case["id"]
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { handleDelete, initialValues, isLoading, handleUpdate } = useEditPage(id)

  return (
    <DefaultLayout>
      <RowWithColumn>
        <Heading>Aanpassen zaak</Heading>
      </RowWithColumn>
      <RowWithColumn>
        <ConfirmButton
          data-e2e-id="delete"
          disabled={isLoading}
          onConfirm={handleDelete}
          iconLeft={<Delete />}
          variant="secondary"
          modalTitle="Weet je zeker dat je deze zaak wilt verwijderen?"
          modalContent="Let op! Deze actie kan niet ongedaan worden gemaakt."
        >
          Verwijder deze zaak
        </ConfirmButton>
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier een zaak te wijzigen</FormTitle>
        <Form
          onSubmit={handleUpdate}
          isLoading={isLoading}
          initialValues={initialValues}
        />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default EditPage
