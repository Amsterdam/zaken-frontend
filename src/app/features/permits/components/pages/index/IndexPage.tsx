import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Link } from "@datapunt/asc-ui"
import { Row } from "@datapunt/asc-ui/lib/components/Grid"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/features/permits/components/organisms/PermitDetails/PermitDetailsList"
import BreadCrumbs from "app/features/addresses/components/molecules/BreadCrumbs/BreadCrumbs"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (

    <DefaultLayout>
      <Row>
        <BreadCrumbs bagId={ bagId! } />
      </Row>
      <Row halign="flex-start">
        <Heading>Vergunningen vakantieverhuur</Heading>
      </Row>
      <PermitDetailsList bagId={ bagId! }></PermitDetailsList>
      <Row>
        {/* TODO: make hardcoded link dynamic */}
        <Link href="https://decosdvl.amsterdam.nl/" variant="inline" icon="external" target="_blank" rel="noreferer">
            Alle vergunningen zie Decos Join
        </Link>
      </Row>
    </DefaultLayout>
  )

export default IndexPage
