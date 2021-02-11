import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Divider, Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import TimelineContainer from "app/components/cases/CaseTimeline/TimelineContainer"
import CaseDetails from "app/components/cases/CaseDetails/CaseDetails"
import Workflow from "app/components/cases/Workflow/Workflow"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import DetailHeaderByCaseId from "app/components/shared/DetailHeader/DetailHeaderByCaseId"
import { Column } from "app/components/layouts/Grid"
import CaseStatus from "app/components/cases/CaseStatus/CaseStatus"
import { useCaseTasks } from "app/state/rest"

type Props = {
  id: string
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const id = parseUrlParamId(idString)

  const { data } = useCaseTasks(id!)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <DetailHeaderByCaseId caseId={ id } enableSwitch={ false } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <Row>
        <Column spanLarge={ 48 }>
          <CaseDetails caseId={ id } />
        </Column>
      </Row>
      { data !== undefined && data.length > 0 ?
        <>
          <RowWithColumn>
            <CaseStatus id={ id }/>
            <Divider />
          </RowWithColumn>
          <RowWithColumn>
            <Workflow caseId={ id } tasks={ data } />
          </RowWithColumn>
        </> :
        <RowWithColumn>
          <p>Deze zaak is afgerond.</p>  
        </RowWithColumn>
      }
      <RowWithColumn>
        <Heading as="h2">Zaakhistorie</Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        <TimelineContainer caseId={ id } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default DetailsPage
