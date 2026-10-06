import { useEffect } from "react"
import { Navigate, useLocation } from "react-router"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import Cases from "@/components/cases/Cases/Cases"
import {
  getLastCasesSearch,
  setLastCasesSearch,
} from "@/components/cases/useCasesFilters"

const IndexPage: React.FC = () => {
  const { search } = useLocation()

  // A link without filters (a breadcrumb) brings you back to the filters you
  // had in this tab. The layout stays, so the page does not flash.
  const lastSearch = search === "" ? getLastCasesSearch() : ""

  // A URL you arrived on (a shared link) counts as your last filters too.
  // Only here, once: a filter component that mounts while the URL is still
  // changing would store the old filters again.
  useEffect(() => {
    if (search !== "") setLastCasesSearch(search.slice(1))
  }, [search])

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
