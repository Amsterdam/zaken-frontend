import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"
import BagMap from "app/features/cases/components/organisms/BagMap/BagMap"
import BagDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn marginBottom={ themeSpacing(10) }>
        <AddressDisplay bagId={ bagId! } />
      </RowWithColumn>
      <Row>
        <Column spanSmall={100} spanLarge={40}>
          <PanoramaPreview bagId={ bagId! } />
          </Column>
        <Column spanSmall={100} spanLarge={60}>
          <BagMap bagId={ bagId! } />
        </Column>
      </Row>
      <RowWithColumn>
        <BagDetails bagId={ bagId ! } />
      </RowWithColumn>
    </DefaultLayout>
  )

export default DetailPage
