import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@datapunt/asc-ui"

import useGlobalData from "../../globalstate/useGlobalData"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Cases from "app/features/poc/organisms/cases/Cases"

const IndexPage: React.FC<RouteComponentProps> = () => {
  const cases = useGlobalData("cases")

  return (
    <DefaultLayout>
      <Heading>Zaken</Heading>
      { cases && <Cases items={ cases } /> }
    </DefaultLayout>
  )
}

export default IndexPage
