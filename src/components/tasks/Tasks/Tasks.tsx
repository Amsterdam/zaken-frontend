import { useMemo } from "react"
import { Column, Grid, Heading } from "@amsterdam/design-system-react"
import {
  useCaseThemes,
  useCorporations,
  useDistricts,
  useProjects,
  useRoles,
  useSubjects,
  useTags,
  useTaskNames,
  useTasks,
  useTasksReasons,
  useUsersMe,
} from "@/api/hooks"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import TableTasks from "@/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import useHasPermission, {
  EDIT_TASK_WEEK_NUMBER_PERMISSION,
  SENSITIVE_CASE_PERMISSION,
} from "@/hooks/useHasPermission"
import getThemeId from "@/components/tasks/utils/getThemeId"
import { useMappedTaskOwners } from "../hooks/useMappedTaskOwners"
import { useTasksFilters } from "../useTasksFilters"
import { groupTasksByOwner, UNASSIGNED_OWNER_ID } from "./groupTasksByOwner"

const EMPTY_TEXT_NO_PERMISSION =
  "Helaas, u bent niet geautoriseerd om deze taken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open taken voor de gekozen filters."
const ONDERMIJNING = "Ondermijning"
const FULL_LIST_PAGE_SIZE = 1000

const Tasks: React.FC = () => {
  const { filters, update } = useTasksFilters()
  const {
    districtNames,
    housingCorporations,
    housingCorporationIsNull,
    owners,
    pagination,
    projects,
    reason,
    sorting,
    subjects,
    tags,
    taskNames,
    theme,
    view,
    weekNumbers,
  } = filters
  const groupByOwnerView = view === "perOwner"

  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [canEditWeek] = useHasPermission([EDIT_TASK_WEEK_NUMBER_PERMISSION])
  const { data: roles } = useRoles()
  const { data: me } = useUsersMe()
  // Until you choose a role, the overview shows the tasks of your own role.
  const role = filters.role ?? me?.role ?? ""
  const { data: caseThemes } = useCaseThemes()
  const { data: reasons } = useTasksReasons(theme)
  const themeId = getThemeId(caseThemes?.results, theme)
  const { data: projectsTheme } = useProjects(themeId)
  const { data: subjectsTheme } = useSubjects(themeId)
  const { data: tagsTheme } = useTags(themeId)
  const { data: tasksDistricts } = useDistricts()
  const { data: corporationData } = useCorporations()
  const mappedTaskOwners = useMappedTaskOwners()
  const fullListPagination = {
    page: 1,
    pageSize: FULL_LIST_PAGE_SIZE,
  }
  const commonTaskArgs = {
    districtNames,
    housingCorporations,
    housingCorporationIsNull,
    owner: owners,
    projects,
    reason,
    role,
    sensitive: hasPermission,
    sorting,
    subjects,
    tags,
    taskNames,
    theme,
    weekNumbers,
  }
  // While the next page/filter loads, the previous results stay visible (isPlaceholderData).
  const {
    data: dataSource,
    isLoading,
    isPlaceholderData,
  } = useTasks({
    ...commonTaskArgs,
    pagination,
    isEnforcementRequest: false,
    enabled: !groupByOwnerView,
  })
  const {
    data: enforcementDataSource,
    isLoading: isLoadingEnforcement,
    isPlaceholderData: isPlaceholderEnforcement,
  } = useTasks({
    ...commonTaskArgs,
    pagination: fullListPagination,
    isEnforcementRequest: true,
    enabled: !groupByOwnerView,
  })
  const {
    data: assignedTasksByOwnerDataSource,
    isLoading: isLoadingAssignedTasksByOwner,
    isPlaceholderData: isPlaceholderAssignedTasksByOwner,
  } = useTasks({
    ...commonTaskArgs,
    pagination: fullListPagination,
    hasOwner: true,
    enabled: groupByOwnerView,
  })
  const {
    data: unassignedTasksDataSource,
    isLoading: isLoadingUnassignedTasks,
    isPlaceholderData: isPlaceholderUnassignedTasks,
  } = useTasks({
    ...commonTaskArgs,
    pagination,
    hasOwner: false,
    enabled: groupByOwnerView,
  })
  const { data: taskNamesData } = useTaskNames(theme ?? null, role ?? null)

  const onChangeTable = ({ page = 1 }: TABLE.Schemas.Pagination) => {
    update((current) => ({ pagination: { ...current.pagination, page } }))
  }

  const emptyPlaceholder =
    hasPermission === false && theme === ONDERMIJNING
      ? EMPTY_TEXT_NO_PERMISSION
      : EMPTY_TEXT
  const enforcementTasks = useMemo(
    () => enforcementDataSource?.results ?? [],
    [enforcementDataSource?.results],
  )
  const enforcementTasksAvailable = enforcementTasks.length > 0
  const assignedTasksByOwner = useMemo(
    () => assignedTasksByOwnerDataSource?.results ?? [],
    [assignedTasksByOwnerDataSource?.results],
  )
  const unassignedTasks = useMemo(
    () => unassignedTasksDataSource?.results ?? [],
    [unassignedTasksDataSource?.results],
  )
  const allTasks = useMemo(
    () =>
      groupByOwnerView
        ? [...assignedTasksByOwner, ...unassignedTasks]
        : [...(dataSource?.results ?? []), ...enforcementTasks],
    [
      assignedTasksByOwner,
      dataSource?.results,
      enforcementTasks,
      groupByOwnerView,
      unassignedTasks,
    ],
  )
  const allTasksCount =
    groupByOwnerView
      ? (assignedTasksByOwnerDataSource?.count ?? 0) +
        (unassignedTasksDataSource?.count ?? 0)
      : (dataSource?.count ?? 0) + (enforcementDataSource?.count ?? 0)
  const ownerNamesById = useMemo(
    () =>
      new Map((mappedTaskOwners ?? []).map((owner) => [String(owner.id), owner.name])),
    [mappedTaskOwners],
  )
  const groupedTasks = useMemo(
    () => groupTasksByOwner(allTasks, ownerNamesById),
    [allTasks, ownerNamesById],
  )
  const unassignedTasksCount = unassignedTasksDataSource?.count ?? 0

  return (
    <>
      <PageHeading title="Takenoverzicht" />
      <Grid.Cell span="all">
        <Column gap="large">
          <TasksFilter
            corporations={corporationData?.results}
            districts={tasksDistricts?.results ?? []}
            myRole={me?.role ?? ""}
            projects={projectsTheme?.results}
            reasons={reasons}
            roles={roles}
            subjects={subjectsTheme?.results}
            tags={tagsTheme?.results}
            taskNames={taskNamesData}
            taskOwners={mappedTaskOwners}
            themes={caseThemes?.results}
          />
          {!groupByOwnerView && enforcementTasksAvailable && (
            <Column>
              <Heading level={2}>
                Handhavingsverzoeken ({enforcementDataSource?.count})
              </Heading>
              <TableTasks
                canEditWeek={canEditWeek}
                data={enforcementTasks}
                isBusy={isLoadingEnforcement || isPlaceholderEnforcement}
                // As many as there are, so the table keeps its height while loading.
                numLoadingRows={enforcementTasks.length}
                pagination={false}
                emptyPlaceholder={emptyPlaceholder}
              />
            </Column>
          )}
          <Column>
            <Heading level={2}>
              Alle {groupByOwnerView ? "" : enforcementTasksAvailable ? "overige" : ""} taken (
              {groupByOwnerView ? allTasksCount : dataSource?.count ?? 0})
            </Heading>
            {groupByOwnerView ? (
              groupedTasks.length > 0 ? (
                // Like the enforcement requests above.
                <Column gap="x-large">
                  {groupedTasks.map(({ ownerId, ownerName, tasks }) => (
                    <Column key={ownerId} gap="small">
                      <Heading level={3}>
                        {ownerName} ({
                          ownerId === UNASSIGNED_OWNER_ID
                            ? unassignedTasksCount
                            : tasks.length
                        })
                      </Heading>
                      <TableTasks
                        canEditWeek={canEditWeek}
                        data={tasks}
                        isBusy={
                          ownerId === UNASSIGNED_OWNER_ID
                            ? isLoadingUnassignedTasks ||
                              isPlaceholderUnassignedTasks
                            : isLoadingAssignedTasksByOwner ||
                              isPlaceholderAssignedTasksByOwner
                        }
                        // Keep table height stable: one page for unassigned, all rows for assigned.
                        numLoadingRows={
                          ownerId === UNASSIGNED_OWNER_ID
                            ? pagination.pageSize
                            : tasks.length
                        }
                        onChange={
                          ownerId === UNASSIGNED_OWNER_ID
                            ? onChangeTable
                            : undefined
                        }
                        pagination={
                          ownerId === UNASSIGNED_OWNER_ID
                            ? {
                                page: pagination.page,
                                pageSize: pagination.pageSize,
                                collectionSize: unassignedTasksCount || 1,
                              }
                            : false
                        }
                        emptyPlaceholder={emptyPlaceholder}
                      />
                    </Column>
                  ))}
                </Column>
              ) : (
                <TableTasks
                  canEditWeek={canEditWeek}
                  data={[]}
                  isBusy={
                    isLoadingAssignedTasksByOwner ||
                    isPlaceholderAssignedTasksByOwner ||
                    isLoadingUnassignedTasks ||
                    isPlaceholderUnassignedTasks
                  }
                  numLoadingRows={1}
                  pagination={false}
                  emptyPlaceholder={emptyPlaceholder}
                />
              )
            ) : (
              <TableTasks
                canEditWeek={canEditWeek}
                data={dataSource?.results ?? []}
                isBusy={isLoading || isPlaceholderData}
                // As many as a page has, so the table keeps its height while loading.
                numLoadingRows={pagination.pageSize}
                onChange={onChangeTable}
                pagination={{
                  page: pagination.page,
                  pageSize: pagination.pageSize,
                  collectionSize: dataSource?.count || 1,
                }}
                emptyPlaceholder={emptyPlaceholder}
              />
            )}
          </Column>
        </Column>
      </Grid.Cell>
    </>
  )
}

export default Tasks
