import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { Row, RowWithColumn, Column } from "app/features/shared/components/atoms/Grid"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import CaseHeading from "app/features/cases/CaseHeading/CaseHeading"
import DebriefDeleteButton from "app/features/debriefings/DebriefDeleteButton/DebriefDeleteButton"
import DebriefEditForm from "app/features/debriefings/DebriefForm/DebriefEditForm"

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
