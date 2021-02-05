import React from "react"
import { RouteComponentProps } from "@reach/router"

import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import CaseHeading from "app/components/cases/CaseHeading/CaseHeading"
import CaseCompleteForm from "app/components/cases/CaseCompleteForm/CaseCompleteForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import { Column } from "app/components/layouts/Grid"

type Props = {
  id: string
}

const CompleteCasePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs routeParams={ { id } } />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CaseHeading id={ id } />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <CaseCompleteForm id={ id } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CompleteCasePage