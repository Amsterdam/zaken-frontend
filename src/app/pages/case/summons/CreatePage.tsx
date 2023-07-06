
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
  caseUserTaskId: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString, caseUserTaskId }) => {

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
            <SummonForm id={ id } caseUserTaskId={ caseUserTaskId } />
          </Column>
        </Row>
      </DefaultLayout>
      : <NotFoundPage />
  )
}

export default CreatePage
