
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import { Column } from "app/components/layouts/Grid"
import DecisionForm from "app/components/case/forms/DecisionForm/DecisionForm"
import isValidUrlParamUUID from "app/routing/utils/isValidUrlParamUUID"

type Props = {
  id: string
  camundaTaskId: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString, camundaTaskId }) => {

  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) &&
    isValidUrlParamId<Components.Schemas.CamundaTask["camunda_task_id"]>(camundaTaskId) ?
    <DefaultLayout>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CaseHeading id={ id } />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <DecisionForm id={ id } camundaTaskId={ camundaTaskId } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
