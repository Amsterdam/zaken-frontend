import { useParams } from "react-router-dom"
import {
  Column,
  Grid,
  Heading,
  Row,
  Skeleton,
  StandaloneLink,
} from "@amsterdam/design-system-react"
import { FolderIcon, MapMarkerIcon } from "@amsterdam/design-system-react-icons"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
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
            <HeadingWithIcon label="Zaakdetails" svg={FolderIcon} />
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
      {/* One white area for the whole case. */}
      <Grid.Cell span="all">
        <Column gap="x-large">
          <Column gap="small">
            <Heading level={2}>Zaakgegevens</Heading>
            <CaseDetails caseId={id} />
          </Column>
          {!isLoading && (
            <>
              {/* Still the old components (MIGRATION.md: the next steps of this page). */}
              <CaseStatus id={id} />
              <Column gap="small">
                <Heading level={2}>Zaakhistorie</Heading>
                <TimelineContainer caseId={id} />
              </Column>
            </>
          )}
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default DetailsPage
