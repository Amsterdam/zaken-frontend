
import { useParams } from 'react-router-dom'
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import CaseCompleteForm from "app/components/case/forms/CaseCompleteForm/CaseCompleteForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import { Column } from "app/components/layouts/Grid"


type RouteParams = {
  id: string
  caseUserTaskId: string
}

const CompleteCasePage: React.FC = () => {
  const { id: idString, caseUserTaskId  } = useParams<RouteParams>()
  const id = parseUrlParamId(idString)

  const isValid = isValidUrlParamId<Components.Schemas.CaseDetail["id"]>(id)
    && isValidUrlParamId<Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]>(caseUserTaskId)

    return (
      isValid ? (
        <DefaultLayout>
          <RowWithColumn>
            <PageHeading />
          </RowWithColumn>
          <RowWithColumn>
            <CaseHeading id={ id } />
          </RowWithColumn>
          <Row>
            <Column spanLarge={50}>
              <CaseCompleteForm id={ id } caseUserTaskId={ caseUserTaskId } />
            </Column>
          </Row>
        </DefaultLayout>
      ) : <NotFoundPage />
  )
}

export default CompleteCasePage