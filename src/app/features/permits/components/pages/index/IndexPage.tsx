import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Link, themeSpacing } from "@datapunt/asc-ui"

import routesObject from "app/config/routes"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import HeadingWithIcon from "app/features/shared/components/organisms/HeadingWithIcon/HeadingWithIcon"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/features/permits/components/organisms/PermitDetails/PermitDetailsList"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import Column from "app/features/shared/components/atoms/Grid/Column"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const route = "/adres/:bagId/vergunningen/"

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => {
  const page = routesObject[route]

  return (
    <DefaultLayout>
      <RowWithColumn marginBottom={ themeSpacing(10) }>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <HeadingWithIcon icon={ page?.icon ?? "ChevronRight" } header={ page?.title ?? "" } />
        <Heading forwardedAs="h2">Vergunningen vakantieverhuur</Heading>
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
}

export default IndexPage
