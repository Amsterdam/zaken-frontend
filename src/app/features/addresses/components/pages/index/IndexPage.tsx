import React from "react"
import { RouteComponentProps } from "@reach/router"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressHeader from "app/features/addresses/components/atoms/AddressHeader/AddressHeader"
import AddressMenu from "app/features/addresses/components/molecules/AddressMenu/AddressMenu"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"


type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  <DefaultLayout>
    <RowWithColumn>
      <BreadCrumbs bagId={ bagId! } />
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
  </DefaultLayout>
)

export default IndexPage
