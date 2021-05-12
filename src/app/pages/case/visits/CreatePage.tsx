
import { RouteComponentProps } from "@reach/router"

import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import isValidUrlParamUUID from "app/routing/utils/isValidUrlParamUUID"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/components/layouts/Grid/Row"
import VisitCreateForm from "app/components/case/forms/VisitForm/VisitForm"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
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
      <RowWithColumn>
        <VisitCreateForm id={ id } camundaTaskId={ camundaTaskId } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
