import type { ColumnType } from "@amsterdam/wonen-ui"

const columnPriority = [
  "navigateId",
  "address.street_name",
  "address.postal_code",
  "start_date",
  "workflows",
  "reason.name",
  "last_updated",
  "id"
]

const createPrioritizedColumns = (columns: ColumnType[], windowWidth: number) => {
  if (columns.length !== columnPriority.length) {
    console.warn("AZA: The number of columns is not matching the number of prioritized coulumns.")
    return []
  }
  let sliceIndex = columnPriority.length
  if (windowWidth < 900) {
    sliceIndex = 4
  } else if (windowWidth < 1600) {
    sliceIndex = 6
  }
  const prioArray = columnPriority.slice(0, sliceIndex)
  const prioritizedColumns = columns.filter(col => col.dataIndex && prioArray.includes(col.dataIndex))

  return prioritizedColumns
}

export default createPrioritizedColumns
