import { useParams } from "react-router-dom"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import CaseFormPage from "app/components/case/CaseFormPage/CaseFormPage"
import TaskForm from "app/components/case/forms/TaskForm/TaskForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type RouteParams = {
  id: string
}

const CreatePage: React.FC = () => {
  const { id: idString } = useParams<RouteParams>()
  const id = parseUrlParamId(idString)

  if (!isValidUrlParamId<components["schemas"]["CaseDetail"]["id"]>(id)) {
    return <NotFoundPage />
  }

  return (
    <CaseFormPage id={id} title="Taak opvoeren">
      <TaskForm id={id} />
    </CaseFormPage>
  )
}

export default CreatePage
