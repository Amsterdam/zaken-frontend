import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import getUrlParam from "app/routing/utils/getUrlParam"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import AddressHeadingByBagId from "app/components/shared/AddressHeadingByBagId/AddressHeadingByBagId"
import CreateForm from "app/components/cases/CreateForm/CreateForm"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import { Column } from "app/components/layouts/Grid"

type Props = {
  bagId: string
  tonId?: string
}

const CreateCasePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => {
  const tonIdParam = getUrlParam("tonId")
  const tonId = parseUrlParamId(tonIdParam)
  // Check for wrong tonId and show alert!

  return (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <AddressHeadingByBagId bagId={ bagId } />
        <FormTitle>Gebruik dit formulier om een nieuwe zaak toe te voegen</FormTitle>
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <CreateForm bagId={ bagId } tonId={ tonId } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
)
}

export default CreateCasePage