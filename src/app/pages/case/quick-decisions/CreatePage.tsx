
import { useParams } from "react-router-dom"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import { Column } from "app/components/layouts/Grid"
import QuickDecisionForm from "app/components/case/forms/QuickDecisionForm/QuickDecisionForm"

type RouteParams = {
  id: string
  caseUserTaskId: string
}

const CreatePage: React.FC = () => {
  const { id: idString, caseUserTaskId  } = useParams<RouteParams>()
  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.CaseDetail["id"]>(id)
    && isValidUrlParamId<Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]>(caseUserTaskId)
      ? <DefaultLayout>
        <RowWithColumn>
          <PageHeading />
        </RowWithColumn>
        <RowWithColumn>
          <CaseHeading id={ id } />
        </RowWithColumn>
        <Row>
          <Column spanLarge={ 50 }>
            <QuickDecisionForm id={ id } caseUserTaskId={ caseUserTaskId } />
          </Column>
        </Row>
      </DefaultLayout>
      : <NotFoundPage />
  )
}

export default CreatePage
