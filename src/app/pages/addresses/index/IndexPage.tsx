import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button } from "@amsterdam/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressHeader from "app/features/addresses/components/AddressHeader/AddressHeader"
import AddressMenu from "app/features/addresses/components/AddressMenu/AddressMenu"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PanoramaPreview from "app/features/shared/components/molecules/Panorama/PanoramaPreview"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import CasesByBagId from "app/features/addresses/components/CasesByBagId/CasesByBagId"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  <DefaultLayout>
    <RowWithColumn>
      <BreadCrumbs routeParams={ { bagId } } />
    </RowWithColumn>
    <RowWithColumn>
      <AddressHeader bagId={ bagId! } headingSize="h1" isHeader={true} />
    </RowWithColumn>
    <RowWithColumn bottomSpacing={ 3 }>
      <PanoramaPreview bagId={ bagId! } aspect={ 2.8 } fov={ 120 } />
    </RowWithColumn>
    <RowWithColumn>
      <AddressMenu bagId={ bagId! } />
    </RowWithColumn>
    <RowWithColumn>
      <CasesByBagId
        bagId={ bagId! }
        openCases={ true }
        title="Lopende zaken"
        emptyText="Op dit adres zijn er geen lopende zaken"
      />
    </RowWithColumn>
    <RowWithColumn>
      <ButtonLink to={ to("/adres/:bagId/zaken/nieuw", { bagId })}>
        <Button variant="primary" as="span">Nieuwe zaak aanmaken</Button>
      </ButtonLink>
    </RowWithColumn>
  </DefaultLayout>
)

export default IndexPage
