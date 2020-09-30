import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const PeoplePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn marginBottom={ themeSpacing(10)}>
        <AddressDisplay bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <PanoramaPreview bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <p>Ingeschreven personen (via BAG id)</p>
      </RowWithColumn>
    </DefaultLayout>
  )

export default PeoplePage
