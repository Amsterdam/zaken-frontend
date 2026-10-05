import { Navigate, useLocation } from "react-router"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import Cases from "app/components/cases/Cases/Cases"
import { getLastCasesSearch } from "app/components/cases/useCasesFilters"

const IndexPage: React.FC = () => {
  const { search } = useLocation()

  // A link without filters (a breadcrumb) brings you back to the filters you
  // had in this tab. The layout stays, so the page does not flash.
  const lastSearch = search === "" ? getLastCasesSearch() : ""

  return (
    <DefaultLayout>
      {lastSearch !== "" ? (
        <Navigate to={{ search: lastSearch }} replace />
      ) : (
        <Cases />
      )}
    </DefaultLayout>
  )
}

export default IndexPage
