import { useParams } from "react-router"
import { Column } from "@amsterdam/design-system-react"
import { EqualColumns } from "@/components/EqualColumns/EqualColumns"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import AddressPage from "app/components/addresses/AddressOverview/AddressPage"
import DecosLink from "app/components/permits/DecosLink/DecosLink"
import PermitsDecos from "app/components/permits/Decos/PermitsDecos"
import Meldingen from "app/components/permits/Meldingen/Meldingen"
import PermitsPowerBrowser from "app/components/permits/PowerBrowser/PermitsPowerBrowser"
import Registrations from "app/components/permits/Registrations/Registrations"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

/** The tab "Vergunningen" of an address. */
const PermitsPage: React.FC = () => {
  const { bagId } = useParams<Props>()

  if (!isValidUrlParamBAGId(bagId)) return <NotFoundPage />

  return (
    <AddressPage bagId={bagId}>
      <EqualColumns>
        <Column gap="x-large">
          <PermitsPowerBrowser bagId={bagId} />
          <PermitsDecos bagId={bagId} />
          <DecosLink bagId={bagId} />
        </Column>
        <Column gap="x-large">
          <Registrations bagId={bagId} />
          <Meldingen bagId={bagId} />
        </Column>
      </EqualColumns>
    </AddressPage>
  )
}

export default PermitsPage
