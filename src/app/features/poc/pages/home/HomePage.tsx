import React from "react"
import { FormTitle, Heading } from "@datapunt/asc-ui"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

const HomePage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Heading>Proof of Concept</Heading>
    <FormTitle>Consectetur Mattis Egestas Amet Ligula</FormTitle>
    <p>TODO show form</p>
  </DefaultLayout>
)

export default HomePage
