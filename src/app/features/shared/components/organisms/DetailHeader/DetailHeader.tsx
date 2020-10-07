import React from "react"


import Row from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"
import AddressHeader from "app/features/addresses/components/atoms/AddressHeader/AddressHeader"

type Props = {
  bagId: string
}

const DetailHeader: React.FC<Props> = ({ bagId }) => (
  <Row>
    <Column spanLarge={50}>
      <BreadCrumbs bagId={ bagId! } />
    </Column>
    <Column spanLarge={50}>
      <AddressHeader bagId={ bagId! } />
    </Column>
  </Row>
)

export default DetailHeader
