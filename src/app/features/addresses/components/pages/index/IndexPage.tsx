import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import AddressMenu from "app/features/addresses/components/molecules/AddressMenu/AddressMenu"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  <DefaultLayout>
    <BreadCrumbs bagId={ bagId! } />
    <AddressDisplay bagId={ bagId! } />
    <AddressMenu bagId={ bagId! } />
  </DefaultLayout>
)

export default IndexPage
