import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Breadcrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import AddressHeadingByBagId from "app/features/shared/components/molecules/AddressHeadingByBagId/AddressHeadingByBagId"
import CreateForm from "app/features/cases/components/CreateForm/CreateForm"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CreateCasePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn>
        <Breadcrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier om een nieuwe zaak toe te voegen</FormTitle>
        <AddressHeadingByBagId bagId={ bagId! } />
        <CreateForm bagId={ bagId! } />
      </RowWithColumn>
    </DefaultLayout>
  )

export default CreateCasePage