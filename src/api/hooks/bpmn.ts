import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

// The models only change with a release of the backend.
const staleTime = Infinity

export const useBpmnModelNames = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.bpmn.modelNames(),
    queryFn: () => fetch<string[]>(makeApiUrl("bpmn-models")),
    staleTime,
  })
}

/** The versions of a model, the oldest first. */
export const useBpmnModels = (modelName?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.bpmn.models(modelName),
    queryFn: () =>
      fetch<components["schemas"]["BpmnModel"][]>(
        makeApiUrl("bpmn-models", modelName),
      ),
    enabled: modelName !== undefined,
    staleTime,
  })
}

/** The BPMN file (XML) of one version of a model. */
export const useBpmnFile = (modelName?: string, version?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.bpmn.file(modelName, version),
    // Not JSON: useApiFetch then gives the text of the response.
    queryFn: () =>
      fetch<string>(makeApiUrl("bpmn-models", modelName, "file", version)),
    enabled: modelName !== undefined && version !== undefined,
    staleTime,
  })
}
