import { useState } from "react"
import styled from "styled-components"
import { Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useParams } from "react-router-dom"
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
import { LoadingScreen } from "app/components/shared/loading"
import CaseNuisanceAlert from "app/components/case/CaseNuisanceAlert/CaseNuisanceAlert"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import { Tabs, Tab } from "app/components/Tabs"
import Documents from "app/components/case/Documents/Documents"
import { env } from "app/config/env"


type Props = {
  id: string
}

const PaddedContent = styled.div`
  padding-top: ${ themeSpacing(8) };
`

const DetailsPage: React.FC = () => {
  const { id: idString } = useParams<Props>()
  const [exists, isBusy, has404, id, caseItem] = useExistingCase(parseUrlParamId(idString))
  const [hasPermission, isLoading] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const showSpinner = isBusy || isLoading
  // Don't show if sensitive case and no permission
  const isAuthorized = caseItem?.sensitive === false || (caseItem?.sensitive === true && hasPermission)
  const showNotFound = has404
  const [isDocumentsTabActive, setIsDocumentsTabActive] = useState(false)

  if (showSpinner) {
    return <LoadingScreen />
  }
  if (exists && !isAuthorized) {
    return <NotAuthorizedPage />
  }

  const tabs = [
    <Tab id="1" key="1" label="Open taken & historie">
      <PaddedContent>
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
      </PaddedContent>
    </Tab>
  ]
  if (env.VITE_ENVIRONMENT !== "production") {
    tabs.push(
      <Tab id="2" key="2" label="Documenten" onClick={ () => setIsDocumentsTabActive(true) } >
        <PaddedContent>
          <Documents caseId={ id } isActiveTab={ isDocumentsTabActive }/>
        </PaddedContent>
      </Tab>
    )
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
              <CaseDetails caseId={ id } />
            </Column>
          </Row>

          <CaseNuisanceAlert caseId={ id } />

          <Tabs label="Tabs voor zaak informatie">
            { tabs.map((item) => item) }
          </Tabs>
        </DefaultLayout>
      )}
      { showNotFound && <NotFoundPage /> }
    </>
  )
}

export default DetailsPage
