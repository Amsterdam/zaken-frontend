import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Link, themeSpacing } from "@datapunt/asc-ui"

import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Heading from "app/features/addresses/components/molecules/Heading/Heading"
import SubHeading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/features/permits/components/organisms/PermitDetails/PermitDetailsList"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import Column from "app/features/shared/components/atoms/Grid/Column"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  <DefaultLayout>
    <RowWithColumn marginBottom={ themeSpacing(10) }>
      <DetailHeader bagId={ bagId! } />
    </RowWithColumn>
    <RowWithColumn>
      <Heading />
      <SubHeading forwardedAs="h2">Vergunningen vakantieverhuur</SubHeading>
    </RowWithColumn>
    <Row>
      <Column spanLarge={50}>
        <PermitDetailsList bagId={ bagId! }></PermitDetailsList>
      </Column>
    </Row>
    <RowWithColumn>
      {/* TODO: make hardcoded link dynamic */}
      <Link href="https://decosdvl.amsterdam.nl/" variant="inline" icon="external" target="_blank" rel="noreferer">
          Alle vergunningen zie Decos Join
      </Link>
    </RowWithColumn>
  </DefaultLayout>
)

export default IndexPage
