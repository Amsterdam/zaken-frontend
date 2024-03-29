
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import PageHeading from "app/components/shared/PageHeading/PageHeading"

const IndexPage: React.FC = () => (
  <DefaultLayout>
    <RowWithColumn topSpacing={ 12 }>
      <PageHeading />
    </RowWithColumn>
  </DefaultLayout>
)

export default IndexPage
