import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

/**
 * Utility function to create an API URL for tasks.
 * This is used to call the tasks context that is saved by apiUrl.
 */
export default () => {
  const dutchApiUrl = `${ makeApiUrl("tasks") }${ window.location.search }`
  const apiUrlTasks = dutchApiUrl.replace("rol", "role")
  return apiUrlTasks
}
