type Task = components["schemas"]["CaseUserTask"]

type GroupedTasks = {
  ownerId: string
  ownerName: string
  tasks: Task[]
}

export const UNASSIGNED_OWNER_ID = "unassigned"
export const UNASSIGNED_OWNER_NAME = "Niet toegewezen"

export const groupTasksByOwner = (
  tasks: Task[],
  ownerNamesById: Map<string, string>,
): GroupedTasks[] => {
  const grouped = new Map<string, GroupedTasks>()

  tasks.forEach((task) => {
    const ownerId = task.owner ? String(task.owner) : UNASSIGNED_OWNER_ID
    const ownerName = task.owner
      ? ownerNamesById.get(ownerId) ?? ownerId
      : UNASSIGNED_OWNER_NAME

    if (!grouped.has(ownerId)) {
      grouped.set(ownerId, { ownerId, ownerName, tasks: [] })
    }
    grouped.get(ownerId)?.tasks.push(task)
  })

  return Array.from(grouped.values()).sort((a, b) => {
    if (a.ownerId === UNASSIGNED_OWNER_ID) return 1
    if (b.ownerId === UNASSIGNED_OWNER_ID) return -1
    return a.ownerName.localeCompare(b.ownerName, "nl")
  })
}

