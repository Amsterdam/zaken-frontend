import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Link, themeSpacing } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/features/permits/components/organisms/PermitDetails/PermitDetailsList"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (

    <DefaultLayout>
      <RowWithColumn marginBottom={ themeSpacing(10) }>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
          <Heading>Vergunningen vakantieverhuur</Heading>
      </RowWithColumn>
      <RowWithColumn>
        <PermitDetailsList bagId={ bagId! }></PermitDetailsList>
      </RowWithColumn>
      <RowWithColumn>
        {/* TODO: make hardcoded link dynamic */}
        <Link href="https://decosdvl.amsterdam.nl/" variant="inline" icon="external" target="_blank" rel="noreferer">
            Alle vergunningen zie Decos Join
        </Link>
      </RowWithColumn>
    </DefaultLayout>
  )

export default IndexPage
