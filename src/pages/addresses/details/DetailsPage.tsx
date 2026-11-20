import { useParams } from "react-router"
import { Grid } from "@amsterdam/design-system-react"
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
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }}>
        <ObjectDetails bagId={bagId} />
      </Grid.Cell>
      {/* Beside the details on a wide screen, below them on a medium one: the
      photo and the map are then next to each other, so they don't get small. */}
      <Grid.Subgrid span={{ narrow: 4, medium: 8, wide: 6 }}>
        <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
          <PanoramaPreview bagId={bagId} />
        </Grid.Cell>
        <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
          <AddressMap bagId={bagId} />
        </Grid.Cell>
      </Grid.Subgrid>
    </AddressPage>
  )
}

export default DetailsPage
