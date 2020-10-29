import React, { useCallback } from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@datapunt/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DebriefForm from "app/features/cases/components/organisms/DebriefForm/DebriefForm"
import useCreatePage from "./hooks/useCreatePage"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data } = useCase(id!)
  const { handleCreate } = useCreatePage(id!)
  const onSubmit = useCallback(async (payload: any) => {
    const p = { ...payload, violation: payload.violation !== "false" }
    return handleCreate(p)
  }, [handleCreate])

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
            <DebriefForm caseId={ id! } onSubmit={ onSubmit } initialValues={ undefined /*{ case: id }*/ } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
