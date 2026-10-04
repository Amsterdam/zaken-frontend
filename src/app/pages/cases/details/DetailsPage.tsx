import { useParams } from "react-router-dom"
import {
  Badge,
  Column,
  Grid,
  Row,
  Skeleton,
  StandaloneLink,
} from "@amsterdam/design-system-react"
import {
  FolderIcon,
  GavelIcon,
  HistoryIcon,
  LockClosedIcon,
  MapMarkerIcon,
  SuitcaseIcon,
} from "@amsterdam/design-system-react-icons"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { Card } from "@/components/Card/Card"
import { HeadingWithIcon } from "@/components/HeadingWithIcon/HeadingWithIcon"
import useHasPermission, {
  SENSITIVE_CASE_PERMISSION,
} from "@/hooks/useHasPermission"
import CaseDetails from "app/components/case/CaseDetails/CaseDetails"
import CaseNuisanceAlert from "app/components/case/CaseNuisanceAlert/CaseNuisanceAlert"
import CaseSensitiveAddressAlert from "app/components/case/CaseSensitiveAddressAlert/CaseSensitiveAddressAlert"
import CaseStatus from "app/components/case/CaseStatus/CaseStatus"
import TimelineContainer from "app/components/case/CaseTimeline/TimelineContainer"
import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import useExistingCase from "./hooks/useExistingCase"

type Props = {
  id: string
}

const getAddress = (address?: components["schemas"]["Address"]) => {
  if (!address) return undefined
  const { street_name, number, suffix_letter, suffix, postal_code } = address
  const houseNumber = [number, suffix_letter, suffix].filter(Boolean).join("-")
  return `${street_name} ${houseNumber}, ${postal_code} Amsterdam`
}

const DetailsPage: React.FC = () => {
  const { id: idString } = useParams<Props>()
  const [exists, isBusy, has404, id, caseItem] = useExistingCase(
    parseUrlParamId(idString),
  )
  const [hasPermission, isLoadingPermission] = useHasPermission([
    SENSITIVE_CASE_PERMISSION,
  ])
  const isLoading = isBusy || isLoadingPermission
  // Don't show if sensitive case and no permission
  const isAuthorized =
    caseItem?.sensitive === false ||
    (caseItem?.sensitive === true && hasPermission)

  if (!isLoading && has404) return <NotFoundPage />
  if (!isLoading && exists && !isAuthorized) return <NotAuthorizedPage />
  // No id, or the request failed otherwise (the error is shown as a message).
  if (!isLoading && !exists) return <NotFoundPage />

  const address = getAddress(caseItem?.address)
  const bagId = caseItem?.address?.bag_id

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Column gap="small">
          <Row align="between" alignVertical="center" wrap>
            <Row alignVertical="center" wrap>
              <HeadingWithIcon label="Zaakdetails" svg={FolderIcon} />
              {/* What kind of case this is, in words: visible at once. */}
              {caseItem?.is_enforcement_request && (
                <Badge
                  label="Handhavingsverzoek"
                  color="orange"
                  icon={GavelIcon}
                />
              )}
              {caseItem?.sensitive && (
                <Badge
                  label="Gevoelige zaak"
                  color="purple"
                  icon={LockClosedIcon}
                />
              )}
            </Row>
            {isLoading ? (
              <Skeleton style={{ flex: "0 1 20rem" }}>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
            ) : (
              address &&
              bagId && (
                // The address is the way to the other cases and the details of the address.
                <StandaloneLink
                  linkComponent={RouterLink}
                  href={`/adres/${bagId}`}
                  // A map marker: it is an address, not "the next step".
                  icon={MapMarkerIcon}
                >
                  {address}
                </StandaloneLink>
              )
            )}
          </Row>
          {/* Warnings about the case come before its facts. */}
          <CaseSensitiveAddressAlert
            isVisible={caseItem?.has_open_sensitive_case_on_address}
          />
          {!isLoading && <CaseNuisanceAlert caseId={id} />}
        </Column>
      </Grid.Cell>
      {/* Like the case page of top-frontend-v2: cards in two columns, the
          history next to the rest (below it on a narrower window). */}
      <Grid.Subgrid span={{ narrow: 4, medium: 8, wide: 8 }}>
        <Grid.Cell span="all">
          <Card title="Zaakinformatie" icon={SuitcaseIcon} headingLevel={2}>
            <CaseDetails caseId={id} />
          </Card>
        </Grid.Cell>
        {!isLoading && (
          <Grid.Cell span="all">
            <CaseStatus id={id} />
          </Grid.Cell>
        )}
      </Grid.Subgrid>
      {!isLoading && (
        <Grid.Subgrid span={{ narrow: 4, medium: 8, wide: 4 }}>
          <Grid.Cell span="all">
            <Card title="Zaakhistorie" icon={HistoryIcon} headingLevel={2}>
              <TimelineContainer caseId={id} />
            </Card>
          </Grid.Cell>
        </Grid.Subgrid>
      )}
    </DefaultLayout>
  )
}

export default DetailsPage
