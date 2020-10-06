import React from "react"

import routes from "app/config/routes"
import find from "app/features/shared/routing/find"
import HeadingWithIcon from "app/features/shared/components/organisms/HeadingWithIcon/HeadingWithIcon"

const PageHeading: React.FC = () => {
  const route = find(routes, window.location.pathname)
  const pageConfig = route ? routes[route] : undefined
  return <HeadingWithIcon icon={ pageConfig?.icon } header={ pageConfig?.title ?? "" } />
}

export default PageHeading
