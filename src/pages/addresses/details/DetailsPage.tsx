import { useParams } from "react-router"
import { Column } from "@amsterdam/design-system-react"
import { EqualColumns } from "@/components/EqualColumns/EqualColumns"
import isValidUrlParamBAGId from "@/router/utils/isValidUrlParamBAGId"
import AddressMap from "@/components/addresses/AddressMap/AddressMap"
import AddressPage from "@/components/addresses/AddressOverview/AddressPage"
import ObjectDetails from "@/components/addresses/ObjectDetails/ObjectDetails"
import PanoramaPreview from "@/components/addresses/Panorama/PanoramaPreview"
import NotFoundPage from "@/pages/errors/NotFoundPage"

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
