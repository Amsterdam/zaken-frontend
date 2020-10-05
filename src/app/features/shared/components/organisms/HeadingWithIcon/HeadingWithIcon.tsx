import React from "react"
import { Icon, Heading, themeSpacing } from "@datapunt/asc-ui"
import * as Assets from "@datapunt/asc-assets"
import styled from "styled-components"

type Props = {
  icon: keyof typeof Assets
  header: string
  headingSize?: "h1" | "h2" | "h3" | "h4"
  iconSize?: number
}

const Div = styled.div`
    display: flex;
    margin-bottom: ${ themeSpacing(15) };

    span {
        margin-right: 20px;
    }

`

const HeadingWithIcon: React.FC<Props> = ({ icon, header, headingSize = "h1", iconSize = 48 }) => {
  const Asset = Assets[icon] ?? <span></span>
  return (
    <Div>
      <Icon size={ iconSize }><Asset /></Icon>
      <Heading forwardedAs={ headingSize }>{ header }</Heading>
    </Div>
  )
}
export default HeadingWithIcon
