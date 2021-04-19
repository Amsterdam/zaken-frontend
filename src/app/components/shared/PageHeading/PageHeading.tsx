import { FC } from "react"

import routes from "app/routing/routes"
import find from "app/routing/utils/find"
import HeadingWithIcon from "app/components/shared/HeadingWithIcon/HeadingWithIcon"

const PageHeading: FC = () => {
  const route = find(routes, window.location.pathname)
  const pageConfig = route ? routes[route] : undefined
  return <HeadingWithIcon icon={ pageConfig?.icon } header={ pageConfig?.title ?? "" } />
}

export default PageHeading
