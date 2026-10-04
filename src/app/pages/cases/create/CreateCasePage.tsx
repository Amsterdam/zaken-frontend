import { useParams, useSearchParams } from "react-router-dom"
import CreateForm from "app/components/cases/CreateForm/CreateForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"

type RouteParams = {
  bagId: string
}

const CreateCasePage: React.FC = () => {
  const { bagId } = useParams<RouteParams>()
  const [searchParams] = useSearchParams()
  // The listing in TON (digital surveillance) the case is made for, if any.
  const tonId = searchParams.get("tonId")

  return isValidUrlParamBAGId(bagId) ? (
    <CreateForm bagId={bagId} tonId={tonId || undefined} />
  ) : (
    <NotFoundPage />
  )
}

export default CreateCasePage
