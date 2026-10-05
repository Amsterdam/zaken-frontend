import { StandaloneLink } from "@amsterdam/design-system-react"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { type ColumnType } from "@/components/Table/types"
import { formatDate } from "@/shared/dateFormatters"
import isDateInPast from "@/app/components/shared/Date/isDateInPast"
import AssignTask from "./AssignTask/AssignTask"
import styles from "./TableTasks.module.css"

type Task = components["schemas"]["CaseUserTask"]

const getAddress = ({ case: { address } }: Task) => {
  const { street_name, number, suffix, suffix_letter } = address ?? {}
  return `${street_name} ${number}${suffix ? "-" : ""}${suffix || ""}${suffix_letter ? "-" : ""}${suffix_letter || ""}`
}

const columns: ColumnType<Task>[] = [
  {
    header: "Toegewezen",
    dataIndex: "owner",
    render: (_, { id, owner }) => <AssignTask taskId={id} taskOwner={owner} />,
  },
  {
    header: "Straat",
    dataIndex: "case.address.street_name",
    minWidth: 200,
    render: (_, record) => getAddress(record),
  },
  {
    header: "Postcode",
    dataIndex: "case.address.postal_code",
    noWrap: true,
  },
  {
    header: "Open taak",
    dataIndex: "name",
    minWidth: 200,
  },
  {
    header: "Startdatum",
    dataIndex: "case.start_date",
    noWrap: true,
    render: (_, record) => formatDate(record.case.start_date, undefined, "-"),
  },
  {
    header: "Slotdatum",
    dataIndex: "due_date",
    noWrap: true,
    // A due date that has passed is red.
    render: (_, { due_date }) =>
      due_date && isDateInPast(new Date(due_date)) ? (
        <span className={styles.overdue}>{formatDate(due_date)}</span>
      ) : (
        formatDate(due_date, undefined, "-")
      ),
  },
  {
    // The one way to the case, in every table: a link in the last column (a
    // row is not clickable). Each link has its own name for a screen reader.
    dataIndex: "case.id",
    noWrap: true,
    render: (_, record) => (
      <StandaloneLink
        linkComponent={RouterLink}
        href={`/zaken/${record.case.id}`}
        aria-label={`Zaakdetails van zaak ${record.case.id}, ${getAddress(record)}`}
      >
        Zaakdetails
      </StandaloneLink>
    ),
  },
]

export default columns
