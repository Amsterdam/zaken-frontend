import { useParams } from "react-router"
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
import CaseDetails from "@/components/case/CaseDetails/CaseDetails"
import CaseNuisanceAlert from "@/components/case/CaseNuisanceAlert/CaseNuisanceAlert"
import CaseSensitiveAddressAlert from "@/components/case/CaseSensitiveAddressAlert/CaseSensitiveAddressAlert"
import CaseStatus from "@/components/case/CaseStatus/CaseStatus"
import TimelineContainer from "@/components/case/CaseTimeline/TimelineContainer"
import NotAuthorizedPage from "@/pages/auth/NotAuthorizedPage"
import NotFoundPage from "@/pages/errors/NotFoundPage"
import parseUrlParamId from "@/router/utils/parseUrlParamId"
import useExistingCase from "./hooks/useExistingCase"

type Params = {
  id: string
}

const getAddress = (address?: components["schemas"]["Address"]) => {
  if (!address) return undefined
  const { street_name, number, suffix_letter, suffix, postal_code } = address
  const houseNumber = [number, suffix_letter, suffix].filter(Boolean).join("-")
  return `${street_name} ${houseNumber}, ${postal_code} Amsterdam`
}

const DetailsPage: React.FC = () => {
  const { id: idString } = useParams<Params>()
  const parsedId = parseUrlParamId(idString)
  const [exists, isBusy, has404, id, caseItem] = useExistingCase(parsedId)
  const [hasPermission, isLoadingPermission] = useHasPermission([
    SENSITIVE_CASE_PERMISSION,
  ])
  const isLoading = isBusy || isLoadingPermission
  // Don't show if sensitive case and no permission
  const isAuthorized =
    caseItem?.sensitive === false ||
    (caseItem?.sensitive === true && hasPermission)

  if (parsedId === undefined) return <NotFoundPage />
  if (!isLoading && has404) return <NotFoundPage />
  if (!isLoading && exists && !isAuthorized) return <NotAuthorizedPage />
  // The request failed otherwise (the error is shown as a message).
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
      {/* The cards below each other, so the open tasks (what you act on) have
          the full width; the history (what you look things up in) comes last.
          All three are there at once and load side by side. */}
      <Grid.Cell span="all">
        <Card title="Zaakinformatie" icon={SuitcaseIcon} headingLevel={2}>
          <CaseDetails caseId={id} />
        </Card>
      </Grid.Cell>
      <Grid.Cell span="all">
        <CaseStatus id={id} />
      </Grid.Cell>
      <Grid.Cell span="all">
        <Card title="Zaakhistorie" icon={HistoryIcon} headingLevel={2}>
          {/* The API gives the history of a sensitive case to anyone, so it
              is only asked for once the case says you may see it. */}
          <TimelineContainer caseId={id} enabled={!isLoading} />
        </Card>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default DetailsPage
