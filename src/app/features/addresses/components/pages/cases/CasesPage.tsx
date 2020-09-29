import React from "react"
import { RouteComponentProps } from "@reach/router"
//import { Row } from "@datapunt/asc-ui"

import Row from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <Row>
        <AddressDisplay bagId={ bagId! } />
      </Row>
      <Row>
        <PanoramaPreview bagId={ bagId! } />
      </Row>
      <Row>
        <p>Cases (via BAG id)</p>
      </Row>
    </DefaultLayout>
  )

export default CasesPage
