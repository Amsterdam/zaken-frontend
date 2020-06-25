import React from "react"
import { FormTitle, Heading } from "@datapunt/asc-ui"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import POCForm from "../../organisms/form/POCForm"

const HomePage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Heading>Proof of Concept</Heading>
    <FormTitle>Eerste versie van een formulier in het zaaksysteem</FormTitle>
    <POCForm />
  </DefaultLayout>
)

export default HomePage
