import { Navigate, useLocation } from "react-router"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import Tasks from "app/components/tasks/Tasks/Tasks"
import { getLastTasksSearch } from "app/components/tasks/useTasksFilters"

const IndexPage: React.FC = () => {
  const { search } = useLocation()

  // A link without filters (a breadcrumb) brings you back to the filters you
  // had in this tab. The layout stays, so the page does not flash.
  const lastSearch = search === "" ? getLastTasksSearch() : ""

  return (
    <DefaultLayout>
      {lastSearch !== "" ? (
        <Navigate to={{ search: lastSearch }} replace />
      ) : (
        <Tasks />
      )}
    </DefaultLayout>
  )
}

export default IndexPage
