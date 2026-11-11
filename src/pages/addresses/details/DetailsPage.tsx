import { useParams } from "react-router"
import { Column, Grid } from "@amsterdam/design-system-react"
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
      <Grid.Cell span={{ narrow: 4, medium: 5, wide: 7 }}>
        <ObjectDetails bagId={bagId} />
      </Grid.Cell>
      <Grid.Cell span={{ narrow: 4, medium: 3, wide: 5 }}>
        <Column gap="large">
          <PanoramaPreview bagId={bagId} />
          <AddressMap bagId={bagId} />
        </Column>
      </Grid.Cell>
    </AddressPage>
  )
}

export default DetailsPage
