import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import AddressMenu from "app/features/addresses/components/molecules/AddressMenu/AddressMenu"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"
import PermitOverview from "app/features/permits/components/organisms/PermitOverview/PermitOverview"


type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  <DefaultLayout>
    <RowWithColumn>
      <BreadCrumbs bagId={ bagId! } />
    </RowWithColumn>
    <RowWithColumn marginBottom={ themeSpacing(10) }>
      <AddressDisplay bagId={ bagId! } />
    </RowWithColumn>
    <RowWithColumn>
      <PanoramaPreview bagId={ bagId! } />
    </RowWithColumn>
    <RowWithColumn>
      <AddressMenu bagId={ bagId! } />
    </RowWithColumn>
    <RowWithColumn>
      <PermitOverview bagId={ bagId! }></PermitOverview>
    </RowWithColumn>
  </DefaultLayout>
)

export default IndexPage
