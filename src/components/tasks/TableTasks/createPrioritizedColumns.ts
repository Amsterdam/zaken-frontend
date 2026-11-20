import { type ColumnType } from "@/components/Table/types"

const columnPriority = [
  "case.id",
  "case.address.street_name",
  "name",
  // Below 900px only the first four columns are shown: the assignee, not the week.
  "owner",
  "week_number",
  "case.address.postal_code",
  "due_date",
  "case.start_date",
]

const createPrioritizedColumns = <T>(
  columns: ColumnType<T>[],
  windowWidth: number,
) => {
  if (columns.length !== columnPriority.length) {
    console.warn(
      "AZA: The number of columns is not matching the number of prioritized coulumns.",
    )
    return []
  }
  let sliceIndex = columnPriority.length
  if (windowWidth < 900) {
    sliceIndex = 4
  } else if (windowWidth < 1600) {
    sliceIndex = 7
  }
  const prioArray = columnPriority.slice(0, sliceIndex)
  const prioritizedColumns = columns.filter(
    (col) => col.dataIndex && prioArray.includes(col.dataIndex),
  )

  return prioritizedColumns
}

export default createPrioritizedColumns
