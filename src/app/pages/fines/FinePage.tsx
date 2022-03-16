import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import FinesSearchWrapper from "app/components/fines/FinesSearchWrapper"

const FinePage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <PageHeading />
    </RowWithColumn>
    <FinesSearchWrapper />
  </DefaultLayout>
  )

export default FinePage
