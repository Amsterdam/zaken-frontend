import React from "react"
import { FormTitle, Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import Form from "app/features/cases/components/molecules/Form/Form"

import useCreatePage from "./hooks/useCreatePage"

const CreatePage: React.FC = () => {
  const { handleCreate } = useCreatePage()
  return (
    <DefaultLayout>
      <Heading>Nieuwe zaak</Heading>
      <FormTitle>Gebruik dit formulier om een nieuwe zaak toe te voegen</FormTitle>
      <Form onSubmit={handleCreate} />
    </DefaultLayout>
  )
}

export default CreatePage
