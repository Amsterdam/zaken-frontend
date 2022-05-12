
import { RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"
import { isDate } from "@amsterdam/wonen-ui"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import TimelineContainer from "app/components/case/CaseTimeline/TimelineContainer"
import CaseDetails from "app/components/case/CaseDetails/CaseDetails"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import DetailHeaderByCaseId from "app/components/shared/DetailHeader/DetailHeaderByCaseId"
import { Column } from "app/components/layouts/Grid"
import CaseStatus from "app/components/case/CaseStatus/CaseStatus"
import useExistingCase from "./hooks/useExistingCase"
import PageSpinner from "app/components/shared/PageSpinner/PageSpinner"
import CaseNuisanceAlert from "app/components/case/CaseNuisanceAlert/CaseNuisanceAlert"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import { Tabs, Tab } from "app/components/Tabs"
import Documents from "app/components/case/Documents/Documents"

type Props = {
  id: string
}

const PaddedContent = styled.div`
  padding-top: ${ themeSpacing(8) };
`

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const [exists, isBusy, has404, id, caseItem] = useExistingCase(parseUrlParamId(idString))
  const [hasPermission, isLoading] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const showSpinner = isBusy || isLoading
  // Don't show if sensitive case and no permission
  const isAuthorized = caseItem?.sensitive === false || (caseItem?.sensitive === true && hasPermission)
  const showNotFound = has404
  const isClosed = isDate(caseItem?.end_date)

  if (showSpinner) {
    return <PageSpinner />
  }
  if (exists && !isAuthorized) {
    return <NotAuthorizedPage />
  }
  return (
    <>
      { exists && isAuthorized && (
      <DefaultLayout>
        <Row>
          <Column spanLarge={ 50 }>
            <PageHeading />
          </Column>
          <Column spanLarge={ 50 }>
            <DetailHeaderByCaseId caseId={ id } enableSwitch={ false } />
          </Column>
        </Row>
        <Row bottomSpacing={ 4 }>
          <Column spanLarge={ 75 }>
            <CaseDetails caseId={ id } isClosed={ isClosed } />
          </Column>
        </Row>

        <CaseNuisanceAlert caseId={ id } />

        <Tabs label="An example of tabs">
          <Tab id="1" label="Actuele taken & historie">
            <PaddedContent>
              { isClosed === false && (
                <RowWithColumn>
                  <CaseStatus id={ id } />
                </RowWithColumn>
              )}
              <RowWithColumn>
                <Heading as="h2">Zaakhistorie</Heading>
                <Divider />
              </RowWithColumn>
              <RowWithColumn>
                <TimelineContainer caseId={ id } />
              </RowWithColumn>
            </PaddedContent>
          </Tab>
          <Tab id="2" label="Documenten">
            <PaddedContent>
              <Documents />
            </PaddedContent>
          </Tab>
        </Tabs>
      </DefaultLayout>
    )}
      { showNotFound && <NotFoundPage /> }
    </>
  )
}

export default DetailsPage
