import { Navigate, useLocation } from "react-router-dom"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import Cases from "app/components/cases/Cases/Cases"
import { getLastCasesSearch } from "app/components/cases/useCasesFilters"

const IndexPage: React.FC = () => {
  const { search } = useLocation()

  // A link without filters (the menu, a breadcrumb) brings you back to the
  // filters you had in this tab.
  const lastSearch = search === "" ? getLastCasesSearch() : ""
  if (lastSearch !== "") {
    return <Navigate to={{ search: lastSearch }} replace />
  }

  return (
    <DefaultLayout>
      <Cases />
    </DefaultLayout>
  )
}

export default IndexPage
