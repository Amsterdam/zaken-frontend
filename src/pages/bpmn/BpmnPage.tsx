import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { Grid, Heading } from "@amsterdam/design-system-react"
import { useBpmnModelNames, useBpmnModels } from "@/api/hooks"
import { BpmnDiagram } from "@/components/bpmn/BpmnDiagram"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import filterStyles from "@/components/filters/filters.module.css"
import { SelectFilter } from "@/components/filters/SelectFilter"
import { capitalize } from "@/shared/textFormatters"

// The choices live in the URL, so a diagram can be linked to.
const MODEL_PARAM = "model"
const VERSION_PARAM = "versie"
// The ids of the tasks to highlight, separated by commas.
const TASKS_PARAM = "taken"

/** "sub_workflow" -> "Sub workflow" */
const formatModelName = (name: string) => capitalize(name.replace(/_/g, " "))

/** Choose a BPMN model and a version of it, and look at its diagram. */
const BpmnPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const modelName = searchParams.get(MODEL_PARAM) ?? undefined
  const tasksParam = searchParams.get(TASKS_PARAM)
  const currentTaskSpecs = useMemo(
    () => tasksParam?.split(",").filter(Boolean),
    [tasksParam],
  )

  const { data: modelNames = [], isLoading: isLoadingNames } =
    useBpmnModelNames()
  const { data: models = [], isLoading: isLoadingModels } =
    useBpmnModels(modelName)
  // Without a choice: the latest version.
  const version = searchParams.get(VERSION_PARAM) ?? models.at(-1)?.version

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>BPMN</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <div className={filterStyles.filters}>
          <SelectFilter
            label="Naam"
            options={[
              { label: "Selecteer naam", value: "" },
              ...modelNames.map((name) => ({
                label: formatModelName(name),
                value: name,
              })),
            ]}
            value={modelName ?? ""}
            disabled={isLoadingNames}
            onChange={(name) =>
              setSearchParams(name ? { [MODEL_PARAM]: name } : {})
            }
          />
          {modelName && (
            <SelectFilter
              label="Versie"
              // The latest version first.
              options={models
                .map(({ version }) => ({ label: version, value: version }))
                .reverse()}
              value={version ?? ""}
              disabled={isLoadingModels}
              onChange={(version) =>
                setSearchParams({
                  [MODEL_PARAM]: modelName,
                  [VERSION_PARAM]: version,
                })
              }
            />
          )}
        </div>
      </Grid.Cell>
      {modelName && version && (
        <Grid.Cell span="all">
          <BpmnDiagram
            model={modelName}
            version={version}
            currentTaskSpecs={currentTaskSpecs}
          />
        </Grid.Cell>
      )}
    </DefaultLayout>
  )
}

export default BpmnPage
