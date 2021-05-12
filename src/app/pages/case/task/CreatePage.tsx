
import { RouteComponentProps } from "@reach/router"

import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import isValidUrlParamUUID from "app/routing/utils/isValidUrlParamUUID"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import { Column } from "app/components/layouts/Grid"
import TaskForm from "app/components/case/forms/TaskForm/TaskForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  id: string
  camundaTaskId: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString, camundaTaskId }) => {

  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) &&
    isValidUrlParamUUID<Components.Schemas.CamundaTask["camunda_task_id"]>(camundaTaskId) ?
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
          <TaskForm id={ id } camundaTaskId={ camundaTaskId } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
