import React from "react"


import Row from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import AddressHeader from "app/features/addresses/components/AddressHeader/AddressHeader"

type Props = {
  bagId: string
  enableSwitch?: boolean
}

const DetailHeader: React.FC<Props> = ({ bagId, enableSwitch }) => (
  <Row>
    <Column spanLarge={50}>
      <BreadCrumbs routeParams={ { bagId } } />
    </Column>
    <Column spanLarge={50}>
      <AddressHeader bagId={ bagId! } enableSwitch = { enableSwitch } />
    </Column>
  </Row>
)

export default DetailHeader
