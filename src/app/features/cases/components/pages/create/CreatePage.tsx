import React from "react"
import { FormTitle, Heading } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import FormCreate from "app/features/cases/components/organisms/FormCreate/FormCreate"

const CreatePage: React.FC = () => (
  <DefaultLayout>
    <Heading>Nieuwe zaak</Heading>
    <FormTitle>Gebruik dit formulier om een nieuwe zaak toe te voegen</FormTitle>
    <FormCreate />
  </DefaultLayout>
)

export default CreatePage
