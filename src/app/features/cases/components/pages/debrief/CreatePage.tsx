import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@datapunt/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Form from "app/features/cases/components/organisms/DebriefForm/DebriefForm"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const handleCreate = async () => console.log("create")
  const { data } = useCase(id!)

  return (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        { data !== undefined &&
          <>
            <Heading as="h2">Nieuwe debrief</Heading>
            <FormTitle>Gebruik dit formulier om terugkoppeling te geven van een debrief</FormTitle>
            <Heading as="h3">Adres</Heading>
            <p>{ data.address.street_name }</p>
            <p>{ data.address.postal_code }</p>
            <Form onSubmit={ handleCreate } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
