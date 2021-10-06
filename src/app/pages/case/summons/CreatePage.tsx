
import { RouteComponentProps } from "@reach/router"

import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import { Column } from "app/components/layouts/Grid"
import SummonForm from "app/components/case/forms/SummonForm/SummonForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"

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
          <SummonForm id={ id } camundaTaskId={ camundaTaskId } />
          </Column>
        </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
