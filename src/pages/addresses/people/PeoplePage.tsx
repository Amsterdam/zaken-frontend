import { useParams } from "react-router"
import isValidUrlParamBAGId from "@/router/utils/isValidUrlParamBAGId"
import AddressPage from "@/components/addresses/AddressOverview/AddressPage"
import Residents from "@/components/addresses/Residents/Residents"
import NotFoundPage from "@/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

/** The tab "Persoonsgegevens" of an address. */
const PeoplePage: React.FC = () => {
  const { bagId } = useParams<Props>()

  if (!isValidUrlParamBAGId(bagId)) return <NotFoundPage />

  return (
    <AddressPage bagId={bagId}>
      <Residents bagId={bagId} />
    </AddressPage>
  )
}

export default PeoplePage
