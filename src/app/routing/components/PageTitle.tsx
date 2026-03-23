import { useEffect } from "react"
import find from "../utils/find"
import routes from "app/routing/routes"
import { env } from "app/config/env"
import { useCase } from "app/state/rest"

const PAGE_TITLE = env.VITE_APP_TITLE_SHORT ?? ""

const PageTitle: React.FC = () => {
  const path = window.location.pathname
  const match = path.match(/\/zaken\/(\d+)/)
  const caseId = match ? parseInt(match[1], 10) : undefined
  const [caseData] = useCase(caseId)

  useEffect(() => {
    const routeKey = find(routes, path)
    const pageConfig = routeKey ? routes[routeKey] : undefined

    let title = PAGE_TITLE

    if (pageConfig?.title) {
      title = `${pageConfig.title} | ${PAGE_TITLE}`
    }

    if (pageConfig?.title === "Zaakdetails" && caseId && caseData?.address) {
      const { postal_code, number, suffix, suffix_letter } = caseData.address
      const formattedAddress = `${postal_code} ${number}${suffix ? `-${suffix}` : ""}${suffix_letter || ""}`
      title = `${formattedAddress} | ${PAGE_TITLE}`
    }

    document.title = title
  }, [caseData, caseId, path])

  return null
}

export default PageTitle
