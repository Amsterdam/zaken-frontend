import { useParams } from "react-router"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import AddressPage from "app/components/addresses/AddressOverview/AddressPage"
import Residents from "app/components/addresses/Residents/Residents"
import NotFoundPage from "app/pages/errors/NotFoundPage"

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
