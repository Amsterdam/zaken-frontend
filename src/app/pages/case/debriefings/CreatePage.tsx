
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import CaseHeading from "app/components/case/CaseHeading/CaseHeading"
import { Column } from "app/components/layouts/Grid"
import DebriefCreateForm from "app/components/case/DebriefForm/DebriefForm"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs routeParams={ { id } } />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CaseHeading id={ id } />
      </RowWithColumn>
      <Row>
        <Column spanLarge={ 50 }>
          <DebriefCreateForm id={ id } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
