import { useEffect } from "react"
import { useLocation } from "react-router"
import { useCase } from "@/api/hooks"
import { env } from "@/config/env"
import { getPageTitle } from "./routeTitles"

const PAGE_TITLE = env.VITE_APP_TITLE_SHORT ?? ""

/**
 * Sets the title of the browser tab for the current page: the title of its
 * route, or for a case its address.
 */
export default function PageTitle() {
  const { pathname } = useLocation()
  const match = pathname.match(/\/zaken\/(\d+)/)
  const caseId = match ? parseInt(match[1], 10) : undefined
  const { data: caseData } = useCase(caseId)
  const routeTitle = getPageTitle(pathname)

  useEffect(() => {
    let title = PAGE_TITLE

    if (routeTitle) {
      title = `${routeTitle} | ${PAGE_TITLE}`
    }

    if (routeTitle === "Zaakdetails" && caseId && caseData?.address) {
      const { postal_code, number, suffix, suffix_letter } = caseData.address
      const formattedAddress = `${postal_code} ${number}${suffix ? `-${suffix}` : ""}${suffix_letter || ""}`
      title = `${formattedAddress} | ${PAGE_TITLE}`
    }

    document.title = title
  }, [caseData, caseId, routeTitle])

  return null
}
