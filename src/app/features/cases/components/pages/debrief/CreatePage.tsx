import React from "react"
import { FormTitle, Heading } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"

import Form from "app/features/cases/components/organisms/DebriefForm/DebriefForm"

const CreatePage: React.FC = () => {
  const handleCreate = async () => console.log("create")

  return (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <Heading>Nieuwe debrief</Heading>
        <FormTitle>Gebruik dit formulier om terugkoppeling te geven van een debrief</FormTitle>
        <Form onSubmit={ handleCreate } />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
