
import { RouteComponentProps } from "@reach/router"

import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import { RowWithColumn } from "app/components/layouts/Grid/Row"
import VisitCreateForm from "app/components/case/forms/VisitForm/VisitForm"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  id: string
  caseUserTaskId: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString, caseUserTaskId }) => {

  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.CaseDetail["id"]>(id) &&
    isValidUrlParamId<Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]>(caseUserTaskId) ?
      <DefaultLayout>
        <RowWithColumn>
          <PageHeading />
        </RowWithColumn>
        <RowWithColumn>
          <CaseHeading id={ id } />
        </RowWithColumn>
        <RowWithColumn>
          <VisitCreateForm id={ id } caseUserTaskId={ caseUserTaskId } />
        </RowWithColumn>
      </DefaultLayout> :
      <NotFoundPage />
  )
}

export default CreatePage
