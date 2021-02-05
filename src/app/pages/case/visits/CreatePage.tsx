import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/components/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import Row, { RowWithColumn } from "app/components/shared/components/atoms/Grid/Row"
import VisitForm from "app/components/case/visits/CreateForm/CreateForm"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import CaseHeading from "app/components/cases/CaseHeading/CaseHeading"
import { Column } from "app/components/shared/components/atoms/Grid"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

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
          <VisitForm caseId={ id } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
