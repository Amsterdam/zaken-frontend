import React from "react"
import { Heading } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RouteComponentProps } from "@reach/router"

type Props = {
  bar: string
}

// NOTE: just a demo page to demonstrate route-params.
// Please remove whenever there is a real feature introduced.
const FooPage: React.FC<RouteComponentProps<Props>> = ({ bar }) => (
  <DefaultLayout>
    <Heading>Foo page</Heading>
    <p>Route param: { bar }</p>
  </DefaultLayout>
)

export default FooPage
