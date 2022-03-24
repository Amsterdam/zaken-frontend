import { useEffect, useContext } from 'react';
import { useRoles, useTasks, useCaseThemes } from 'app/state/rest';
import { Row, Column } from 'app/components/layouts/Grid';
import TableTasks from 'app/components/tasks/TableTasks/TableTasks';
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from 'app/state/rest/custom/usePermissions/useHasPermission';
import { ContextValues } from 'app/state/context/ValueProvider';
import { getQueryUrl } from 'app/state/rest/tasks';
import useContextCache from 'app/state/rest/provider/useContextCache';
import TasksFilter from '../TasksFilter/TasksFilter';

const EMPTY_TEXT_NO_PERMISSION = 'Helaas, u bent niet geautoriseerd om deze taken te bekijken.';
const EMPTY_TEXT = 'Er zijn momenteel geen open taken voor de gekozen filters.';
const UNDERMINING = 'Ondermijning';

const Tasks: React.FC = () => {
  const {
    results, count, pagination, sorting, role, theme, updateContextTasks, owner,
  } = useContext(ContextValues).tasks;
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION]);
  const [roles] = useRoles();
  const [caseThemes] = useCaseThemes();
  const [dataSource, { isBusy }] = useTasks(
    hasPermission,
    pagination,
    sorting,
    theme,
    role,
    owner,
  );
  const queryUrl = getQueryUrl(hasPermission, pagination, sorting, theme, role, owner);
  const { clearContextCache } = useContextCache('cases', queryUrl);

  useEffect(() => {
    if (dataSource === undefined) {
      updateContextTasks({
        results: [],
        count: 0,
      });
    } else {
      updateContextTasks(dataSource);
    }
  }, [dataSource, updateContextTasks]);

  const onChangeFilter = (key: string, item: string) => {
    // Empty cache to force a new data fetch.
    clearContextCache();
    updateContextTasks({
      [key]: item,
      pagination: {
        ...pagination,
        page: 1,
      },
    });
  };

  const onChangePageSize = (pageSize: string) => {
    updateContextTasks({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize),
        page: 1,

      },
    });
  };

  const onChangeTable = (pagination: TABLE.Schemas.Pagination, sorting: TABLE.Schemas.Sorting) => {
    updateContextTasks({ pagination, sorting });
  };

  const emptyPlaceholder = hasPermission === false && theme === UNDERMINING ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT;

  return (
    <Row>
      <Column spanLarge={72}>
        <TableTasks
          data={results || []}
          isBusy={isBusy}
          onChange={onChangeTable}
          pagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            collectionSize: count || 1,
          }}
          sorting={sorting}
          emptyPlaceholder={emptyPlaceholder}
        />
      </Column>
      <Column spanLarge={28}>
        <TasksFilter
          role={role}
          roles={roles}
          setRole={(value: string) => onChangeFilter('role', value)}
          theme={theme}
          themes={caseThemes?.results}
          setTheme={(value: string) => onChangeFilter('theme', value)}
          setPageSize={onChangePageSize}
          pageSize={pagination.pageSize?.toString() || '10'}
          owner={owner}
          setOwner={(value: string) => onChangeFilter('owner', value)}
        />
      </Column>
    </Row>
  );
};

export default Tasks;
