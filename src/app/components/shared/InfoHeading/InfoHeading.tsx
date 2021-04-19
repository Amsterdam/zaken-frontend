import { FC, ReactNode } from "react"
import { Heading } from "@amsterdam/asc-ui"
import InfoButton from "./InfoButton"

type Props = {
  infoTitle: string
  infoText: ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children?: ReactNode
}

const InfoHeading: FC<Props> = ({ infoTitle, infoText, as = "h2", children }) =>
    <Heading as={ as }>
      { children }
      <InfoButton infoTitle={ infoTitle} infoText = { infoText} />
    </Heading>

export default InfoHeading
