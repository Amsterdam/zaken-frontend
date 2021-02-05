import React from "react"
import { RouteComponentProps } from "@reach/router"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import { RowWithColumn } from "app/components/layouts/Grid/Row"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import DetailHeader from "app/components/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/components/shared/components/molecules/PageHeading/PageHeading"
import CasesByBagId from "app/components/addresses/CasesByBagId/CasesByBagId"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <DetailHeader bagId={ bagId } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CasesByBagId bagId={ bagId } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default CasesPage
