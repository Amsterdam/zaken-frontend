import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import ViewForm from "app/features/views/components/ViewForm/ViewForm"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import usePageView from "./hooks/usePageView"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)

  const { data } = useCase(id)
  const { handleCreate } = usePageView(id)

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
            <FormTitle>Gebruik dit formulier om aan te geven wat de beoordeling van de zienswijze is</FormTitle>
            <AddressHeading caseId={ id } />
            <ViewForm caseId={ id! } onSubmit={ handleCreate } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
