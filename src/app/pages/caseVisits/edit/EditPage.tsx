import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Form from "app/features/caseVisits/components/Form/Form"
import { useEditPage } from "./hooks/useEditPage"

type Props = {
  id: Components.Schemas.Case["id"]
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { initialValues, isLoading, handleUpdate } = useEditPage(id!)

  return (
    <DefaultLayout>
      <Heading>Afronden zaakbezoek</Heading>
      <FormTitle>Gebruik dit formulier om een zaakbezoek af te ronden</FormTitle>
      <Form
        onSubmit={handleUpdate}
        isLoading={isLoading}
        initialValues={initialValues}
      />
    </DefaultLayout>
  )
}

export default EditPage
