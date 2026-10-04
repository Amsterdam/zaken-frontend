import {
  Column,
  Heading,
  Icon,
  Paragraph,
  Row,
} from "@amsterdam/design-system-react"
import {
  BedIcon,
  CalendarIcon,
  CertificateIcon,
  MailIcon,
  PersonIcon,
} from "@amsterdam/design-system-react-icons"
import { useRegistrations } from "@/api/hooks"
import { SmallSkeleton } from "@/components/SmallSkeleton/SmallSkeleton"
import { formatDate } from "@/shared/dateFormatters"
import { PermitsSection } from "../components/PermitsSection"
import type { Registration } from "../types"
import { shouldShowDummyData } from "../useDummyData"
import { dummyRegistrationsResponse } from "./data/dummyRegistrationsResponse"

type Props = {
  bagId: string
}

function getFullName(
  personalDetails?: Registration["requester"]["personalDetails"],
) {
  const { firstName, lastNamePrefix, lastName } = personalDetails ?? {}
  return [firstName, lastNamePrefix, lastName].filter(Boolean).join(" ")
}

/**
 * The holiday rental registrations of an address (the same as the
 * "Vakantieverhuur" card of top-frontend-v2).
 */
const Registrations: React.FC<Props> = ({ bagId }) => {
  const query = useRegistrations(bagId)
  const registrations = (
    Array.isArray(query.data) ? query.data : []
  ) as Registration[]
  const isDummyData = shouldShowDummyData(query, registrations.length)
  const registrationsToUse = isDummyData
    ? dummyRegistrationsResponse
    : registrations

  return (
    <PermitsSection
      title="Vakantieverhuur"
      count={registrationsToUse.length}
      isPending={query.isPending}
      isError={query.isError}
      errorText="Registraties konden niet worden opgehaald."
      emptyText="Geen registraties gevonden."
      isDummyData={isDummyData}
    >
      {query.isPending ? (
        <SmallSkeleton height={10} maxRandomWidth={300} />
      ) : (
        <Column gap="large">
          {registrationsToUse.map((reg) => (
            <Column as="article" key={reg.registrationNumber} gap="small">
              <Row>
                <Icon
                  svg={CertificateIcon}
                  size="heading-4"
                  title="Registratienummer"
                />
                <Heading level={3} size="level-4">
                  {reg.registrationNumber}
                </Heading>
              </Row>
              <Row>
                <Icon svg={PersonIcon} title="Volledige naam" />
                <Paragraph>
                  {getFullName(reg.requester?.personalDetails)}
                </Paragraph>
              </Row>
              <Row>
                <Icon svg={MailIcon} title="E-mailadres" />
                <Paragraph>{reg.requester?.email}</Paragraph>
              </Row>
              <Row>
                <Icon svg={CalendarIcon} title="Aangemaakt" />
                <Paragraph>Aangemaakt: {formatDate(reg.createdAt)}</Paragraph>
              </Row>
              <Row>
                <Icon svg={CalendarIcon} title="Overeenkomst" />
                <Paragraph>
                  Overeenkomst: {formatDate(reg.agreementDate)}
                </Paragraph>
              </Row>
              <Row>
                <Icon svg={BedIcon} title="B&B" />
                <Paragraph>
                  B&B: {reg.requestForBedAndBreakfast ? "Ja" : "Nee"}
                </Paragraph>
              </Row>
            </Column>
          ))}
        </Column>
      )}
    </PermitsSection>
  )
}

export default Registrations
