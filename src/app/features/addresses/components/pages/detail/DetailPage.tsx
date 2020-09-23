import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Row } from "@datapunt/asc-ui"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressDisplay from "app/features/addresses/components/atoms/AddressDisplay/AddressDisplay"
import PermitOverview from "app/features/permits/components/organisms/PermitOverview/PermitOverview"


type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <Row>
        <AddressDisplay bagId={ bagId! } />
      </Row>
      <Row>
        <p>{ window.location.pathname }</p>
      </Row>
      <Row>
        <PermitOverview bagId={ bagId! }></PermitOverview>
      </Row>
    </DefaultLayout>
  )

export default DetailPage
