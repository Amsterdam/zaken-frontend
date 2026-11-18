import { useMemo, useState } from "react"
import { Button, Column, Grid, Heading } from "@amsterdam/design-system-react"
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
import { groupTasksByOwner } from "./groupTasksByOwner"

const EMPTY_TEXT_NO_PERMISSION =
  "Helaas, u bent niet geautoriseerd om deze taken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open taken voor de gekozen filters."
const ONDERMIJNING = "Ondermijning"
const GROUPED_VIEW_PAGE_SIZE = 1000

const Tasks: React.FC = () => {
  const [groupByOwnerView, setGroupByOwnerView] = useState(false)
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
    weekNumbers,
  } = filters

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
  const tasksPagination = groupByOwnerView
    ? {
        page: 1,
        pageSize: GROUPED_VIEW_PAGE_SIZE,
      }
    : pagination
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
    pagination: tasksPagination,
    isEnforcementRequest: false,
  })
  const {
    data: enforcementDataSource,
    isLoading: isLoadingEnforcement,
    isPlaceholderData: isPlaceholderEnforcement,
  } = useTasks({
    ...commonTaskArgs,
    pagination: {
      page: 1,
      pageSize: 1000,
    },
    isEnforcementRequest: true,
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
  const ownerNamesById = useMemo(
    () =>
      new Map((mappedTaskOwners ?? []).map((owner) => [String(owner.id), owner.name])),
    [mappedTaskOwners],
  )
  const groupedTasks = useMemo(
    () => groupTasksByOwner(dataSource?.results ?? [], ownerNamesById),
    [dataSource?.results, ownerNamesById],
  )
  const groupedEnforcementTasks = useMemo(
    () => groupTasksByOwner(enforcementTasks, ownerNamesById),
    [enforcementTasks, ownerNamesById],
  )

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
          <Button
            aria-pressed={groupByOwnerView}
            onClick={() => setGroupByOwnerView((current) => !current)}
          >
            {groupByOwnerView ? "Standaardweergave" : "Weergave per gebruiker"}
          </Button>
          {enforcementTasksAvailable && (
            <Column>
              <Heading level={2}>
                Handhavingsverzoeken ({enforcementDataSource?.count})
              </Heading>
              {groupByOwnerView ? (
                groupedEnforcementTasks.map(({ ownerId, ownerName, tasks }) => (
                  <Column key={ownerId}>
                    <Heading level={3}>
                      {ownerName} ({tasks.length})
                    </Heading>
                    <TableTasks
                      canEditWeek={canEditWeek}
                      data={tasks}
                      isBusy={isLoadingEnforcement || isPlaceholderEnforcement}
                      // As many as there are, so the table keeps its height while loading.
                      numLoadingRows={tasks.length}
                      pagination={false}
                      emptyPlaceholder={emptyPlaceholder}
                    />
                  </Column>
                ))
              ) : (
                <TableTasks
                  canEditWeek={canEditWeek}
                  data={enforcementTasks}
                  isBusy={isLoadingEnforcement || isPlaceholderEnforcement}
                  // As many as there are, so the table keeps its height while loading.
                  numLoadingRows={enforcementTasks.length}
                  pagination={false}
                  emptyPlaceholder={emptyPlaceholder}
                />
              )}
            </Column>
          )}
          <Column>
            <Heading level={2}>
              Alle {enforcementTasksAvailable ? "overige" : ""} taken (
              {dataSource?.count ?? 0})
            </Heading>
            {groupByOwnerView ? (
              groupedTasks.length > 0 ? (
                groupedTasks.map(({ ownerId, ownerName, tasks }) => (
                  <Column key={ownerId}>
                    <Heading level={3}>
                      {ownerName} ({tasks.length})
                    </Heading>
                    <TableTasks
                      canEditWeek={canEditWeek}
                      data={tasks}
                      isBusy={isLoading || isPlaceholderData}
                      // As many as there are, so the table keeps its height while loading.
                      numLoadingRows={tasks.length}
                      pagination={false}
                      emptyPlaceholder={emptyPlaceholder}
                    />
                  </Column>
                ))
              ) : (
                <TableTasks
                  canEditWeek={canEditWeek}
                  data={[]}
                  isBusy={isLoading || isPlaceholderData}
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
