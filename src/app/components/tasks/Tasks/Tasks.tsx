import { useEffect, useContext } from "react"
import { Heading } from "@amsterdam/asc-ui"
import {
  useRoles, useTasks, useCaseThemes, useTaskNames,
  useProjects, useUsersMe, useTasksReasons, useDistricts,
  useCorporations, useSubjects, useTags
} from "app/state/rest"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import { ContextValues } from "app/state/context/ValueProvider"
import { getQueryUrl } from "app/state/rest/tasks"
import useContextCache from "app/state/rest/provider/useContextCache"

import CaseEnforcement from "app/components/case/icons/CaseEnforcement"
import getThemeId from "app/components/tasks/utils/getThemeId"

import styles from "./Tasks.module.css"

type Item = string | Components.Schemas.District["name"][]

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze taken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open taken voor de gekozen filters."
const ONDERMIJNING = "Ondermijning"

const Tasks: React.FC = () => {
  const { tasks: context, tasks: { updateContextTasks } } = useContext(ContextValues)
  const {
    count, districtNames, housingCorporations, housingCorporationIsNull, owner, pagination,
    projects, reason, results, role, sorting, subjects,
    tags, taskNames, theme
  } = context

  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [roles] = useRoles()
  const [me] = useUsersMe()
  const [caseThemes] = useCaseThemes()
  const [reasons] = useTasksReasons(theme)
  const themeId = getThemeId(caseThemes?.results, theme)
  const [projectsTheme] = useProjects(themeId)
  const [subjectsTheme] = useSubjects(themeId)
  const [tagsTheme] = useTags(themeId)
  const [tasksDistricts] = useDistricts()
  const [corporationData] = useCorporations()
  const commonTaskArgs = {
    sensitive: hasPermission,
    sorting,
    theme,
    role,
    owner,
    taskNames,
    projects,
    reason,
    subjects,
    tags,
    districtNames,
    housingCorporations,
    housingCorporationIsNull
  }
  const [dataSource, { isBusy }] = useTasks({
    ...commonTaskArgs,
    pagination,
    isEnforcementRequest: false
  })
  const [enforcementDataSource, { isBusy: isBusyEnforcement }] = useTasks({
    ...commonTaskArgs,
    pagination: {
      page: 1,
      pageSize: 1000
    },
    isEnforcementRequest: true
  })
  const [taskNamesData] = useTaskNames(role ?? "")
  const queryUrl = getQueryUrl(hasPermission, pagination, sorting, theme, role, owner)
  const { clearContextCache } = useContextCache("cases", queryUrl)


  useEffect(() => {
    // Set initial role when loaded for the first time
    if (me?.role && role === undefined) {
      updateContextTasks({ role: me.role })
    }
  }, [me, role, updateContextTasks])

  useEffect(() => {
    if (dataSource === undefined) {
      updateContextTasks({ results: [], count: 0 })
    } else {
      updateContextTasks(dataSource)
    }
  }, [dataSource, updateContextTasks])

  const onChangeFilter = (key: string, item: Item) => {
    // Empty cache to force a new data fetch.
    clearContextCache()
    const updates = {
      [key]: item,
      pagination: { ...pagination, page: 1 }
    }
    // When role is set we need to reset the taskNames dropdown to avoid a stale selection:
    if (key === "role") updates.taskNames = ""
    /*
     ** When theme is set we need to reset the selection for reason and
     ** housingCorporations to avoid a stale selection:
     */
    if (key === "theme") {
      updates.projects = []
      updates.reason = ""
      updates.subjects = []
      updates.tags = []
    }
    updateContextTasks(updates)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextTasks({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize),
        page: 1
      }
    })
  }

  const onChangeTable = (pagination: TABLE.Schemas.Pagination, sorting: TABLE.Schemas.Sorting) => {
    updateContextTasks({ pagination, sorting })
  }

  const districts = tasksDistricts?.results || []
  const emptyPlaceholder = hasPermission === false && theme === ONDERMIJNING ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT
  const enforcementTasksAvailable = !!enforcementDataSource?.results?.length

  return (
    <div className={styles.container}>
      <div>
        {enforcementTasksAvailable && (
          <div className={styles.wrap}>
            <Heading as="h2" className={styles.heading}>
              <span>
                Handhavingsverzoeken ({enforcementDataSource?.count})
                <CaseEnforcement isVisible={true} />
              </span>
            </Heading>
            <TableTasks
              data={enforcementDataSource?.results || []}
              isBusy={isBusyEnforcement}
              onChange={onChangeTable}
              pagination={false}
              sorting={sorting}
              emptyPlaceholder={emptyPlaceholder}
              isEnforcement
            />
          </div>
        )}
        <Heading as="h2">
          Alle {enforcementTasksAvailable ? "overige" : ""} taken ({count})
        </Heading>
        <TableTasks
          data={results || []}
          isBusy={isBusy}
          onChange={onChangeTable}
          pagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            collectionSize: count || 1,
            paginationLength: 9
          }}
          sorting={sorting}
          emptyPlaceholder={emptyPlaceholder}
        />
      </div>
      <div className={styles.filterContainer}>
        <TasksFilter
          districtNames={districtNames}
          districts={districts}
          corporations={corporationData?.results}
          corporationIsNull={housingCorporationIsNull}
          owner={owner}
          pageSize={pagination.pageSize?.toString() || "25"}
          projects={projectsTheme?.results}
          role={role ?? ""}
          roles={roles}
          reason={reason}
          reasons={reasons}
          selectedCorporations={housingCorporations}
          selectedProjects={projects}
          selectedSubjects={subjects}
          selectedTags={tags}
          selectedTaskNames={taskNames}
          onChangePageSize={onChangePageSize}
          onChangeFilter={onChangeFilter}
          subjects={subjectsTheme?.results}
          tags={tagsTheme?.results}
          taskNames={taskNamesData}
          theme={theme}
          themes={caseThemes?.results}
        />
      </div>
    </div>
  )
}

export default Tasks
