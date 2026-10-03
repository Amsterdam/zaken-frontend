import { useParams } from "react-router-dom"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import AddressPage from "app/components/addresses/AddressOverview/AddressPage"
import ObjectDetails from "app/components/addresses/ObjectDetails/ObjectDetails"
import PanoramaPreview from "app/components/addresses/Panorama/PanoramaPreview"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import styles from "./DetailsPage.module.css"

type Props = {
  bagId: string
}

/** The tab "Adresdetails" of an address. */
const DetailsPage: React.FC = () => {
  const { bagId } = useParams<Props>()

  if (!isValidUrlParamBAGId(bagId)) return <NotFoundPage />

  return (
    <AddressPage bagId={bagId}>
      <div className={styles.top}>
        <ObjectDetails bagId={bagId} />
        <PanoramaPreview bagId={bagId} />
      </div>
    </AddressPage>
  )
}

export default DetailsPage
