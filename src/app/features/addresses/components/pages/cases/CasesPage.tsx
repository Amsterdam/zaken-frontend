import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
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
        <p>Cases (via BAG id)</p>
      </RowWithColumn>
    </DefaultLayout>
  )

export default CasesPage
