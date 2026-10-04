import { Alert, Column, Paragraph, Row } from "@amsterdam/design-system-react"
import { DeleteIcon, PencilIcon } from "@amsterdam/design-system-react-icons"
import dayjs from "dayjs"
import { useMeldingen } from "@/api/hooks"
import { Description } from "@/components/Description/Description"
import { Table } from "@/components/Table/Table"
import { type ColumnType } from "@/components/Table/types"
import { formatDate } from "@/shared/dateFormatters"
import { renderStatusBadge } from "@/shared/renderStatusBadge"
import { PermitsSection } from "../components/PermitsSection"
import type { Melding } from "../types"
import { shouldShowDummyData } from "../useDummyData"
import { dummyMeldingenResponse } from "./data/dummyMeldingenResponse"

type Props = {
  bagId: string
}

// The reports are fetched from the start of last year (see useMeldingen).
const START_DATE = dayjs().subtract(1, "years").startOf("year")

/** The nights of a report; the year only when it is not obvious. */
function formatMeldingPeriod(melding: Melding) {
  const currentYear = dayjs().year()
  const startYear = dayjs(melding.startDatum).year()
  const endYear = dayjs(melding.eindDatum).year()

  const startFormat = startYear !== endYear ? "D MMM [']YY" : "D MMM"
  const endFormat = endYear !== currentYear ? "D MMM [']YY" : "D MMM"

  return `${formatDate(melding.startDatum, startFormat, "-")} - ${formatDate(melding.eindDatum, endFormat, "-")}`
}

function renderMeldingStatus(melding: Melding) {
  if (!melding.isAangepast && !melding.isVerwijderd) {
    return "-"
  }
  return (
    <Row wrap>
      {melding.isAangepast &&
        renderStatusBadge("Aangepast", {
          variant: "warning",
          icon: PencilIcon,
        })}
      {melding.isVerwijderd &&
        renderStatusBadge("Verwijderd", {
          variant: "error",
          icon: DeleteIcon,
        })}
    </Row>
  )
}

const createMeldingDescriptionData = (melding: Melding) => [
  { label: "Periode", value: formatMeldingPeriod(melding) },
  { label: "Nachten", value: melding.nachten },
  { label: "Gasten", value: melding.gasten },
  { label: "Status", value: renderMeldingStatus(melding) },
  {
    label: "Gemaakt op",
    value: formatDate(melding.gemaaktOp, "DD MMM YYYY, HH:mm", "-"),
  },
]

const columns: ColumnType<Melding>[] = [
  {
    header: "Periode",
    dataIndex: "startDatum",
    render: (_, melding) => <strong>{formatMeldingPeriod(melding)}</strong>,
  },
  { header: "Gasten", dataIndex: "gasten" },
  {
    header: "Status",
    dataIndex: "status",
    hideOnMobile: true,
    render: (_, melding) => renderMeldingStatus(melding),
  },
]

/**
 * The holiday rental reports of an address, latest first, with the total of
 * nights (the same as the reports card of top-frontend-v2).
 */
const Meldingen: React.FC<Props> = ({ bagId }) => {
  const query = useMeldingen(bagId)
  const meldingen = (query.data?.data ?? []) as unknown as Melding[]
  const isDummyData = shouldShowDummyData(query, meldingen.length)
  const sortedMeldingen = [
    ...(isDummyData ? dummyMeldingenResponse : meldingen),
  ].sort((a, b) => dayjs(b.eindDatum).diff(dayjs(a.eindDatum)))
  const totalNights = sortedMeldingen.reduce(
    (total, { nachten }) => total + nachten,
    0,
  )

  return (
    <Column gap="large">
      {query.data?.fifteenNightsRuleApplicable && (
        <Alert heading="15-nachtenregel van toepassing!" headingLevel={2}>
          <Paragraph>
            Dit adres ligt in een gebied waar vanaf 1 april 2026 de
            15-nachtenregel voor vakantieverhuur geldt.
          </Paragraph>
        </Alert>
      )}
      <PermitsSection
        title="Meldingen"
        count={sortedMeldingen.length}
        isPending={query.isPending}
        isError={query.isError}
        errorText="Meldingen konden niet worden opgehaald."
        emptyText="Geen meldingen gevonden."
        isDummyData={isDummyData}
      >
        {!query.isPending && (
          <Paragraph size="small">
            {totalNights} nachten sinds{" "}
            {formatDate(START_DATE.format(), "D MMM YYYY")}
          </Paragraph>
        )}
        <Table
          columns={columns}
          data={sortedMeldingen}
          loading={query.isPending}
          numLoadingRows={3}
          pagination={false}
          verticalAlign="middle"
          expandable={{
            expandedRow: (melding) => (
              <Description
                termsWidth="narrow"
                data={createMeldingDescriptionData(melding)}
              />
            ),
            rowLabel: (melding) => formatMeldingPeriod(melding),
          }}
        />
      </PermitsSection>
    </Column>
  )
}

export default Meldingen
