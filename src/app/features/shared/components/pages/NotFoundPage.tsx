import React from "react"
import { RouteComponentProps } from "@reach/router"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Heading from "app/features/shared/components/atoms/Heading/Heading"

const NotFoundPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Heading>404</Heading>
    <p>Helaas, deze pagina bestaat niet</p>
  </DefaultLayout>
)

export default NotFoundPage
