import { StandaloneLink } from "@amsterdam/design-system-react"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { type ColumnType } from "@/components/Table/types"
import { formatDate } from "@/shared/dateFormatters"

type Case = components["schemas"]["Case"]

const getAddress = ({ address }: Case) => {
  const { street_name, number, suffix, suffix_letter } = address ?? {}
  return `${street_name} ${number}${suffix ? "-" : ""}${suffix || ""}${suffix_letter ? "-" : ""}${suffix_letter || ""}`
}

const getStatus = ({ workflows, end_date }: Case) => {
  if (workflows.length > 0) {
    // Ontdubbelen
    const names = workflows.map((workflow) => workflow.state.name)
    return Array.from(new Set(names)).join(", ")
  }
  return end_date ? "Afgerond" : "-"
}

const columns: ColumnType<Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
  },
  {
    header: "Straat",
    dataIndex: "address.street_name",
    minWidth: 200,
    render: (_, record) => getAddress(record),
  },
  {
    header: "Postcode",
    dataIndex: "address.postal_code",
    noWrap: true,
  },
  {
    header: "Taak",
    dataIndex: "workflows",
    minWidth: 200,
    render: (_, record) => getStatus(record),
  },
  {
    header: "Aanleiding",
    dataIndex: "reason.name",
    minWidth: 140,
    render: (_, { reason, project }) =>
      reason?.name === "Project" && project ? project.name : reason?.name,
  },
  {
    header: "Startdatum",
    dataIndex: "start_date",
    noWrap: true,
    render: (_, { start_date }) => formatDate(start_date, undefined, "-"),
  },
  {
    header: "Laatst gewijzigd",
    dataIndex: "last_updated",
    noWrap: true,
    render: (_, { last_updated }) => formatDate(last_updated, undefined, "-"),
  },
  {
    // The one way to the case, in every table: a link in the last column (a
    // row is not clickable). Each link has its own name for a screen reader.
    dataIndex: "navigateId",
    noWrap: true,
    render: (_, record) => (
      <StandaloneLink
        linkComponent={RouterLink}
        href={`/zaken/${record.id}`}
        aria-label={`Zaakdetails van zaak ${record.id}, ${getAddress(record)}`}
      >
        Zaakdetails
      </StandaloneLink>
    ),
  },
]

export default columns
