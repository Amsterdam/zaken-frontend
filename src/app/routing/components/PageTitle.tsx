import { useEffect } from "react"
import find from "../utils/find"
import routes from "app/routing/routes"
import { env } from "app/config/env"

const PAGE_TITLE = env.VITE_APP_TITLE_SHORT ?? ""

const setPageTitle = () => {
  const route = find(routes, window.location.pathname)
  const pageConfig = route ? routes[route] : undefined
  const title = pageConfig?.title ? `${ pageConfig.title } | ${ PAGE_TITLE }` : PAGE_TITLE
  document.title = title
}

const PageTitle: React.FC = () => {
  useEffect(() => {
    setPageTitle()
  }, [])
  return null
}

export default PageTitle
