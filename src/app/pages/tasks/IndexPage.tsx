import { Navigate, useLocation } from "react-router-dom"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import Tasks from "app/components/tasks/Tasks/Tasks"
import { getLastTasksSearch } from "app/components/tasks/useTasksFilters"

const IndexPage: React.FC = () => {
  const { search } = useLocation()

  // A link without filters (the menu, a breadcrumb) brings you back to the
  // filters you had in this tab.
  const lastSearch = search === "" ? getLastTasksSearch() : ""
  if (lastSearch !== "") {
    return <Navigate to={{ search: lastSearch }} replace />
  }

  return (
    <DefaultLayout>
      <Tasks />
    </DefaultLayout>
  )
}

export default IndexPage
