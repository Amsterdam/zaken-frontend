import { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Divider, Heading } from "@amsterdam/asc-ui"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import TimelineContainer from "app/components/cases/CaseTimeline/TimelineContainer"
import CaseDetails from "app/components/case/CaseDetails/CaseDetails"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import DetailHeaderByCaseId from "app/components/shared/DetailHeader/DetailHeaderByCaseId"
import { Column } from "app/components/layouts/Grid"
import CaseStatus from "app/components/case/CaseStatus/CaseStatus"
import useExistingCase from "./hooks/useExistingCase"
import PageSpinner from "app/components/shared/PageSpinner/PageSpinner"

type Props = {
  id: string
}

const DetailsPage: FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const [exists, isBusy, has404, id] = useExistingCase(parseUrlParamId(idString))
  const showSpinner = isBusy
  const showCase = exists
  const showNotFound = has404

  return (
    <>
    { showSpinner &&
      <PageSpinner />
    }
    { showCase &&
      <DefaultLayout>
        <DetailHeaderByCaseId caseId={ id } enableSwitch={ false } />
        <RowWithColumn>
          <PageHeading />
        </RowWithColumn>
        <Row>
          <Column spanLarge={ 78 }>
            <CaseDetails caseId={ id } />
          </Column>
        </Row>
        <RowWithColumn>
          <CaseStatus id={ id } />
        </RowWithColumn>
        <RowWithColumn>
          <Heading as="h2">Zaakhistorie</Heading>
          <Divider />
        </RowWithColumn>
        <RowWithColumn>
          <TimelineContainer caseId={ id } />
        </RowWithColumn>
      </DefaultLayout>
    }
    { showNotFound &&
      <NotFoundPage />
    }
    </>
  )
}

export default DetailsPage
