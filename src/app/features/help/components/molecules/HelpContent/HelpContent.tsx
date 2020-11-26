import React from "react"
import { Heading } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/"

const HelpContent: React.FC = () => (
  <>
    <RowWithColumn>
      <Heading as="h2">Technisch support</Heading>
      <p>text 1</p>
    </RowWithColumn>
    <RowWithColumn>
      <Heading as="h2">Vraag een demo aan</Heading>
      <p>text 2</p>
    </RowWithColumn>
  </>
)
export default HelpContent
