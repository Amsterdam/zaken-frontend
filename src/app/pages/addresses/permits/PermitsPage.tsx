import { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Link, Heading } from "@amsterdam/asc-ui"

import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/components/permits/PermitDetails/PermitDetailsList"
import DetailHeader from "app/components/shared/DetailHeader/DetailHeader"
import Column from "app/components/layouts/Grid/Column"
import MockWrapper from "app/components/shared/MockWrapper/MockWrapper"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"

type Props = {
  bagId: string
}

const PermitsPage: FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <DetailHeader bagId={ bagId } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <Heading forwardedAs="h2">Vergunningen vakantieverhuur</Heading>
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <MockWrapper>
            <PermitDetailsList bagId={ bagId }></PermitDetailsList>
          </MockWrapper>
        </Column>
      </Row>
      <RowWithColumn>
        {/* TODO: make hardcoded link dynamic */}
        <Link href="https://decosdvl.amsterdam.nl/" variant="inline" icon="external" target="_blank" rel="noreferer">
            Alle vergunningen zie Decos Join
        </Link>
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default  PermitsPage
