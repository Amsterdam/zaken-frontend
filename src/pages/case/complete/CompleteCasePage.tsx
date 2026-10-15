import { useParams } from "react-router"
import CaseCompleteForm from "@/components/case/forms/CaseCompleteForm/CaseCompleteForm"
import NotFoundPage from "@/pages/errors/NotFoundPage"
import isValidUrlParamId from "@/router/utils/isValidUrlParamId"
import parseUrlParamId from "@/router/utils/parseUrlParamId"

type RouteParams = {
  id: string
  caseUserTaskId: string
}

const CompleteCasePage: React.FC = () => {
  const { id: idString, caseUserTaskId } = useParams<RouteParams>()
  const id = parseUrlParamId(idString)

  return isValidUrlParamId<components["schemas"]["CaseDetail"]["id"]>(id) &&
    isValidUrlParamId<string>(caseUserTaskId) ? (
    <CaseCompleteForm id={id} caseUserTaskId={caseUserTaskId} />
  ) : (
    <NotFoundPage />
  )
}

export default CompleteCasePage
