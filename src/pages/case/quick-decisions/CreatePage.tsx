import { useParams } from "react-router"
import QuickDecisionForm from "@/components/case/forms/QuickDecisionForm/QuickDecisionForm"
import NotFoundPage from "@/pages/errors/NotFoundPage"
import isValidUrlParamId from "@/router/utils/isValidUrlParamId"
import parseUrlParamId from "@/router/utils/parseUrlParamId"

type RouteParams = {
  id: string
  caseUserTaskId: string
}

const CreatePage: React.FC = () => {
  const { id: idString, caseUserTaskId } = useParams<RouteParams>()
  const id = parseUrlParamId(idString)

  return isValidUrlParamId<components["schemas"]["CaseDetail"]["id"]>(id) &&
    isValidUrlParamId<string>(caseUserTaskId) ? (
    <QuickDecisionForm id={id} caseUserTaskId={caseUserTaskId} />
  ) : (
    <NotFoundPage />
  )
}

export default CreatePage
