import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Row } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const PeoplePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <Row>
        <BreadCrumbs bagId={ bagId! } />
      </Row>
      <Row>
        <AddressDisplay bagId={ bagId! } />
      </Row>
      <Row>
        <PanoramaPreview bagId={ bagId! } />
      </Row>
      <Row>
        <p>Ingeschreven personen (via BAG id)</p>
      </Row>
    </DefaultLayout>
  )

export default PeoplePage
