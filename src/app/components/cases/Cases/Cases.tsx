import { useContext } from "react";
import { Heading } from "@amsterdam/asc-ui";
import TableCases from "app/components/cases/TableCases/TableCases";
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter";
import { useCases, useCaseThemes, useCorporations, useDistricts, useProjects, useSubjects, useTags, useTasksReasons } from "@/api/hooks";
import useHasPermission, {
  SENSITIVE_CASE_PERMISSION,
} from "app/state/rest/custom/usePermissions/useHasPermission";
import { ContextValues } from "app/state/context/ValueProvider";
import { RowWithColumn } from "app/components/layouts/Grid";
import getThemeId from "app/components/tasks/utils/getThemeId";
import SearchBarCases from "app/components/cases/SearchBarCases/SearchBarCases";
import styles from "./Cases.module.css";

const EMPTY_TEXT_NO_PERMISSION =
  "Helaas, u bent niet geautoriseerd om deze zaken te bekijken.";
const EMPTY_TEXT = "Er zijn momenteel geen open zaken voor de gekozen filters.";
const ONDERMIJNING = "Ondermijning";

const getThemeIdByName = (
  themes: components["schemas"]["CaseTheme"][],
  themeName?: string,
) => themes.find((e) => e.name === themeName)?.id;

const Cases: React.FC = () => {
  const {
    districtNames,
    fromStartDate,
    housingCorporations,
    housingCorporationIsNull,
    openCases,
    pagination,
    projects,
    reason,
    sorting,
    addressSearch,
    subjects,
    tags,
    theme,
    updateContextCases,
  } = useContext(ContextValues)["cases"];
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION]);
  const { data: caseThemes } = useCaseThemes();
  const { data: reasons } = useTasksReasons(theme);
  const themeId = getThemeId(caseThemes?.results, theme);
  const { data: projectsTheme } = useProjects(themeId);
  const { data: subjectsTheme } = useSubjects(themeId);
  const { data: tagsTheme } = useTags(themeId);
  const { data: caseDistricts } = useDistricts();
  const { data: corporationData } = useCorporations();
  // While the next page/filter loads, the previous results stay visible (isPlaceholderData).
  const { data: dataSource, isLoading, isPlaceholderData } = useCases({
    sensitive: hasPermission,
    pagination,
    sorting,
    theme,
    fromStartDate,
    openCases,
    projects,
    reason,
    addressSearch,
    subjects,
    tags,
    districtNames,
    housingCorporations,
    housingCorporationIsNull,
  });

  const onChangeTable = (
    pagination: TABLE.Schemas.Pagination,
    sorting: TABLE.Schemas.Sorting,
  ) => {
    updateContextCases({ pagination, sorting });
  };

  const themes = caseThemes?.results || [];
  const ondermijningId = getThemeIdByName(themes, ONDERMIJNING);
  const districts = caseDistricts?.results || [];
  const emptyPlaceholder =
    hasPermission === false && theme === ondermijningId?.toString()
      ? EMPTY_TEXT_NO_PERMISSION
      : EMPTY_TEXT;

  return (
    <>
      <RowWithColumn bottomSpacing={6}>
        <Heading>Zakenoverzicht ({dataSource?.count ?? 0})</Heading>
      </RowWithColumn>
      <RowWithColumn bottomSpacing={6}>
        <SearchBarCases searchString={addressSearch} />
      </RowWithColumn>
      <div className={styles.Grid}>
        <TableCases
          data={dataSource?.results ?? []}
          isBusy={isLoading || isPlaceholderData}
          onChange={onChangeTable}
          pagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            collectionSize: dataSource?.count || 1,
          }}
          sorting={sorting}
          emptyPlaceholder={emptyPlaceholder}
        />
        <div className={styles.Filter}>
          <CasesFilter
            date={fromStartDate}
            corporations={corporationData?.results}
            corporationIsNull={housingCorporationIsNull}
            districts={districts}
            districtNames={districtNames}
            pageSize={pagination.pageSize?.toString() || "10"}
            openCases={openCases}
            projects={projectsTheme?.results}
            reason={reason}
            reasons={reasons}
            selectedCorporations={housingCorporations}
            selectedProjects={projects}
            selectedSubjects={subjects}
            selectedTags={tags}
            subjects={subjectsTheme?.results}
            tags={tagsTheme?.results}
            theme={theme}
            themes={themes}
          />
        </div>
      </div>
    </>
  );
};

export default Cases;
