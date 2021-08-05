import mapTaskData from "../utils/mapTaskData"

export default (id: Components.Schemas.Case["id"], data: Components.Schemas.CamundaTaskWithState[] | undefined, execPost: () => Promise<unknown>) =>
  data?.map(
    ({ state: { status_name, information }, tasks }) =>
      [status_name, information, tasks.map(mapTaskData(id, execPost))] as const
  )