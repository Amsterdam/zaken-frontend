import { useParams } from "react-router"
import VisitForm from "app/components/case/forms/VisitForm/VisitForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"

type RouteParams = {
  id: string
  caseUserTaskId: string
}

const CreatePage: React.FC = () => {
  const { id: idString, caseUserTaskId } = useParams<RouteParams>()
  const id = parseUrlParamId(idString)

  return isValidUrlParamId<components["schemas"]["CaseDetail"]["id"]>(id) &&
    isValidUrlParamId<string>(caseUserTaskId) ? (
    <VisitForm id={id} caseUserTaskId={caseUserTaskId} />
  ) : (
    <NotFoundPage />
  )
}

export default CreatePage
