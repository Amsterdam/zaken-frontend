import { useParams } from "react-router-dom"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import { RowWithColumn } from "app/components/layouts/Grid/Row"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import AddressHeader from "app/components/addresses/AddressHeader/AddressHeader"
import AddressMenu from "app/components/addresses/AddressMenu/AddressMenu"
import PanoramaPreview from "app/components/addresses/Panorama/PanoramaPreview"
import to from "app/routing/utils/to"
import CasesByBagId from "app/components/addresses/CasesByBagId/CasesByBagId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import IsAuthorizedButtonLink from "app/components/shared/ButtonLink/IsAuthorizedButtonLink"

type Props = {
  bagId: string
}

const IndexPage: React.FC = () => {
  const { bagId } = useParams<Props>()
  return (
    isValidUrlParamBAGId(bagId) ? (
      <DefaultLayout>
        <RowWithColumn>
          <AddressHeader bagId={ bagId } headingSize="h1" isHeader={ true } />
        </RowWithColumn>
        <RowWithColumn bottomSpacing={ 3 }>
          <PanoramaPreview bagId={ bagId } aspect={ 2.8 } fov={ 120 } />
        </RowWithColumn>
        <RowWithColumn>
          <AddressMenu bagId={ bagId } />
        </RowWithColumn>
        <RowWithColumn>
          <CasesByBagId
            bagId={ bagId }
            openCases={ true }
            title="Open zaken"
            emptyText="Op dit adres zijn er geen open zaken"
          />
        </RowWithColumn>
        <RowWithColumn>
          <CasesByBagId
            title="Gesloten zaken AZA"
            bagId={ bagId }
            emptyText="Op dit adres zijn geen gesloten zaken"
          />
        </RowWithColumn>
        <RowWithColumn>
          <IsAuthorizedButtonLink
            permissionNames={ ["create_case"] }
            to={ to("/adres/:bagId/zaken/nieuw", { bagId }) }
            text="Nieuwe zaak aanmaken"
            variant="primary"
            data-testid="btn_add_case"
          />
        </RowWithColumn>
      </DefaultLayout>
    ) : <NotFoundPage />
  )
}

export default IndexPage
