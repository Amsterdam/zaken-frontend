import { StandaloneLink } from "@amsterdam/design-system-react"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { type ColumnType } from "@/components/Table/types"
import { formatDate } from "@/shared/dateFormatters"

type Case = components["schemas"]["Case"]

const id: ColumnType<Case> = { header: "ID", dataIndex: "id" }
const theme: ColumnType<Case> = { header: "Thema", dataIndex: "theme.name" }

// The one way to the case, in every table: a link in the last column (a row
// is not clickable). Each link has its own name for a screen reader.
const details: ColumnType<Case> = {
  dataIndex: "navigateId",
  noWrap: true,
  render: (_, record) => (
    <StandaloneLink
      linkComponent={RouterLink}
      href={`/zaken/${record.id}`}
      aria-label={`Zaakdetails van zaak ${record.id}`}
    >
      Zaakdetails
    </StandaloneLink>
  ),
}

export const columnsOpenCases: ColumnType<Case>[] = [
  id,
  theme,
  {
    header: "Startdatum",
    dataIndex: "start_date",
    noWrap: true,
    render: (_, { start_date }) => formatDate(start_date, undefined, "-"),
  },
  {
    header: "Huidige status",
    dataIndex: "workflows",
    render: (_, { workflows }) =>
      workflows?.length > 0
        ? workflows.map((workflow) => workflow.state.name).join(", ")
        : "-",
  },
  details,
]

export const columnsClosedCases: ColumnType<Case>[] = [
  id,
  theme,
  {
    header: "Afsluitdatum",
    dataIndex: "end_date",
    noWrap: true,
    render: (_, { end_date }) => formatDate(end_date, undefined, "-"),
  },
  {
    header: "Aanleiding",
    dataIndex: "reason.name",
    render: (_, { reason }) => reason?.name ?? "-",
  },
  details,
]
