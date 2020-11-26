import React from "react"
import { Heading } from "@datapunt/asc-ui"
import InfoButton from "./InfoButton"

type Props = {
  infoTitle: string
  infoText: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children?: React.ReactNode
}

const InfoHeading: React.FC<Props> = ({ infoTitle, infoText, as = "h2", children }) =>
    <Heading as={ as }>
      { children }
      <InfoButton infoTitle={ infoTitle} infoText = { infoText} />
    </Heading>

export default InfoHeading
