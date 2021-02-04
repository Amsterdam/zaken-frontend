import React from "react"
import { RouteComponentProps } from "@reach/router"

import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Breadcrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import CaseHeading from "app/features/cases/components/CaseHeading/CaseHeading"
import CaseCompleteForm from "app/features/cases/components/CompleteForm/CaseCompleteForm"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  id: string
}

const CompleteCasePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <RowWithColumn>
        <Breadcrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CaseHeading id={ id } />
        <CaseCompleteForm id={ id } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CompleteCasePage