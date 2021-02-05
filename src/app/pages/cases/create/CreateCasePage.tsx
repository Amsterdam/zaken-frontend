import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import { RowWithColumn } from "app/components/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/components/shared/components/layouts/DefaultLayout/DefaultLayout"
import BreadCrumbs from "app/components/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/components/shared/components/molecules/PageHeading/PageHeading"
import AddressHeadingByBagId from "app/components/shared/components/molecules/AddressHeadingByBagId/AddressHeadingByBagId"
import CreateForm from "app/components/cases/CreateForm/CreateForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

const CreateCasePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs routeParams={ { bagId } } />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <AddressHeadingByBagId bagId={ bagId } />
        <FormTitle>Gebruik dit formulier om een nieuwe zaak toe te voegen</FormTitle>
        <CreateForm bagId={ bagId } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default CreateCasePage