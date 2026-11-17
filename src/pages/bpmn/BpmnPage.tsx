import { useMemo } from "react"
import { useSearchParams } from "react-router"

import {
  Column,
  Grid,
  Link,
  Paragraph,
} from "@amsterdam/design-system-react"
import { useBpmnModelNames, useBpmnModels } from "@/api/hooks"
import { BpmnDiagram } from "@/components/bpmn/BpmnDiagram"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import filterStyles from "@/components/filters/filters.module.css"
import { SelectFilter } from "@/components/filters/SelectFilter"
import { formatWorkflowType } from "@/shared/textFormatters"

// The choices live in the URL, so a diagram can be linked to.
const MODEL_PARAM = "model"
const VERSION_PARAM = "versie"
// The ids of the tasks to highlight, separated by commas.
const TASKS_PARAM = "taken"

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
      <PageHeading title="BPMN" />
      <Grid.Cell span="all">
        <Column>
          <Paragraph>
            Een BPMN is een visuele weergave van een werkproces. Je ziet welke
            stappen het proces bevat, in welke volgorde ze worden uitgevoerd en
            waar keuzes of beslissingen worden gemaakt. Selecteer een proces en
            een versie om de bijbehorende tekening te bekijken. Je kunt de
            tekening verplaatsen door{" "}
            <strong>
              erop te klikken, de muisknop ingedrukt te houden en te slepen
            </strong>
            . Je kunt ook <strong>scrollen</strong> om verticaal te bewegen.
            Houd <strong>Shift</strong> ingedrukt tijdens het scrollen om
            horizontaal te bewegen en <strong>Ctrl</strong> om{" "}
            <strong>in en uit te zoomen</strong>. Meer uitleg over BPMN en hoe
            je een procesdiagram leest, vind je bij{" "}
            <Link linkComponent={RouterLink} href="/hulp">
              Hulp
            </Link>
            .
          </Paragraph>
          <div className={filterStyles.filters}>
            <SelectFilter
              label="Naam"
              options={[
                { label: "Selecteer naam", value: "" },
                ...modelNames.map((name) => ({
                  label: formatWorkflowType(name),
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
        </Column>
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
