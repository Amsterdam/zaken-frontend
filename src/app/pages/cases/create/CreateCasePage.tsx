import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Breadcrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import AddressHeadingByBagId from "app/features/shared/components/molecules/AddressHeadingByBagId/AddressHeadingByBagId"
import CreateForm from "app/features/cases/components/CreateForm/CreateForm"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CreateCasePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <RowWithColumn>
        <Breadcrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier om een nieuwe zaak toe te voegen</FormTitle>
        <AddressHeadingByBagId bagId={ bagId } />
        <CreateForm bagId={ bagId } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default CreateCasePage