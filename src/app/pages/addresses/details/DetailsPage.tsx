import { useParams } from "react-router"
import { Column } from "@amsterdam/design-system-react"
import { EqualColumns } from "@/components/EqualColumns/EqualColumns"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import AddressMap from "app/components/addresses/AddressMap/AddressMap"
import AddressPage from "app/components/addresses/AddressOverview/AddressPage"
import ObjectDetails from "app/components/addresses/ObjectDetails/ObjectDetails"
import PanoramaPreview from "app/components/addresses/Panorama/PanoramaPreview"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

/** The tab "Adresdetails" of an address. */
const DetailsPage: React.FC = () => {
  const { bagId } = useParams<Props>()

  if (!isValidUrlParamBAGId(bagId)) return <NotFoundPage />

  return (
    <AddressPage bagId={bagId}>
      <EqualColumns gap="large">
        <ObjectDetails bagId={bagId} />
        <Column gap="large">
          <PanoramaPreview bagId={bagId} />
          <AddressMap bagId={bagId} />
        </Column>
      </EqualColumns>
    </AddressPage>
  )
}

export default DetailsPage
