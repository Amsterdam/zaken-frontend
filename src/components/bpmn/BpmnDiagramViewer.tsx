import { useEffect, useRef, useState } from "react"
import { Alert, Paragraph } from "@amsterdam/design-system-react"
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer"
import type Canvas from "diagram-js/lib/core/Canvas"
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry"
import styles from "./BpmnDiagramViewer.module.css"

type Props = {
  /** The content of the BPMN file. Give the viewer a `key` per file. */
  xml: string
  /** The ids of the tasks to highlight. */
  currentTaskSpecs?: string[]
}

const NO_TASK_SPECS: string[] = []

/**
 * Draws a BPMN file with bpmn-js; you can zoom and drag. After zwd-frontend.
 * Import it with `lazy`: bpmn-js is large and only this component needs it.
 */
export default function BpmnDiagramViewer({
  xml,
  currentTaskSpecs = NO_TASK_SPECS,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  // The viewer, once it has drawn the diagram.
  const [viewer, setViewer] = useState<NavigatedViewer | null>(null)
  const [hasError, setHasError] = useState(false)

  // Before the effect that makes the viewer: cleanups run in this order, and
  // the markers must be removed before the viewer is destroyed.
  useEffect(() => {
    if (!viewer) return

    const canvas = viewer.get<Canvas>("canvas")
    const elementRegistry = viewer.get<ElementRegistry>("elementRegistry")
    // A task of another version of the model may not be in this diagram.
    const marked = currentTaskSpecs.filter((id) => elementRegistry.get(id))

    marked.forEach((id) => canvas.addMarker(id, styles.currentTask))
    return () =>
      marked.forEach((id) => canvas.removeMarker(id, styles.currentTask))
  }, [viewer, currentTaskSpecs])

  useEffect(() => {
    if (!containerRef.current) return

    const instance = new NavigatedViewer({ container: containerRef.current })
    let cancelled = false

    instance
      .importXML(xml)
      .then(() => {
        if (cancelled) return
        instance.get<Canvas>("canvas").zoom("fit-viewport")
        setViewer(instance)
      })
      .catch(() => {
        if (!cancelled) setHasError(true)
      })

    return () => {
      cancelled = true
      instance.destroy()
    }
  }, [xml])

  return (
    <>
      {hasError && (
        <Alert
          heading="Het diagram kan niet worden getoond"
          headingLevel={2}
          severity="error"
        >
          <Paragraph>Het BPMN-bestand kon niet worden ingelezen.</Paragraph>
        </Alert>
      )}
      <div ref={containerRef} className={styles.container} hidden={hasError} />
    </>
  )
}
