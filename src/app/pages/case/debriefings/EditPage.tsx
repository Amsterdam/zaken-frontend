import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/components/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { Row, RowWithColumn, Column } from "app/components/layouts/Grid"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import CaseHeading from "app/components/cases/CaseHeading/CaseHeading"
import DebriefDeleteButton from "app/components/case/debriefings/DebriefDeleteButton/DebriefDeleteButton"
import DebriefEditForm from "app/components/case/debriefings/DebriefForm/DebriefEditForm"

type Props = {
  id: string
  debriefingId: string
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ id: idString, debriefingId: debriefingIdString }) => {

  const id = parseUrlParamId(idString)
  const debriefingId = parseUrlParamId(debriefingIdString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) &&
    isValidUrlParamId<Components.Schemas.Debriefing["id"]>(debriefingId) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs routeParams={ { id } } />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <DebriefDeleteButton id={ id } debriefingId={ debriefingId } />
      </RowWithColumn>
      <Row>
        <Column spanLarge={ 50 }>
          <CaseHeading id={ id } />
          <DebriefEditForm id={ id } debriefingId={ debriefingId } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default EditPage
