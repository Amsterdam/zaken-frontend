import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import CorrespondenceForm from "app/features/correspondence/components/CorrespondenceForm/CorrespondenceForm"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)
  const { data } = useCase(id)

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
            <FormTitle>Gebruik dit formulier om notitie van correspondentie toe te voegen</FormTitle>
            <AddressHeading caseId={ id } />
            <CorrespondenceForm caseId={ id! } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
