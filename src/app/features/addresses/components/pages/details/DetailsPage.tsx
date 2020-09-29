import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Row } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"
import BagMap from "app/features/cases/components/organisms/BagMap/BagMap"
import BagDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
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
        <BagMap bagId={ bagId! } />
      </Row>
      <Row>
        <BagDetails bagId={ bagId ! } />
      </Row>
    </DefaultLayout>
  )

export default DetailPage
