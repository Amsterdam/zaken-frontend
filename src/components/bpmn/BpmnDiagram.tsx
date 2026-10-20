import { lazy, Suspense } from "react"
import { Skeleton } from "@amsterdam/design-system-react"
import { useBpmnFile } from "@/api/hooks"

// bpmn-js is large: only loaded when a diagram is shown.
const BpmnDiagramViewer = lazy(() => import("./BpmnDiagramViewer"))

type Props = {
  model: string
  version: string
  /** The ids of the tasks to highlight. */
  currentTaskSpecs?: string[]
}

const loading = (
  <Skeleton>
    <Skeleton.Image aspectRatio="16:9" />
  </Skeleton>
)

/** The diagram of one version of a BPMN model. */
export function BpmnDiagram({ model, version, currentTaskSpecs }: Props) {
  const { data: xml, isLoading } = useBpmnFile(model, version)

  if (isLoading) return loading
  // The fetch failed: the error is shown as a toast.
  if (!xml) return null

  return (
    <Suspense fallback={loading}>
      <BpmnDiagramViewer
        key={`${model}/${version}`}
        xml={xml}
        currentTaskSpecs={currentTaskSpecs}
      />
    </Suspense>
  )
}
