import styled from "styled-components"
import { Heading } from "@amsterdam/asc-ui"
import CustomIcon, { CustomIconProps } from "../CustomIcon/CustomIcon"

type Props = {
  header: string
  headingSize?: React.ComponentProps<typeof Heading>["forwardedAs"]
  icon?: CustomIconProps["name"]
  iconSize?: number
}

const Div = styled.div`
  display: flex;
  gap: 8px;
`

const HeadingWithIcon: React.FC<Props> = ({ icon, header, headingSize = "h1", iconSize = 48 }) => (
  <Div>
    { icon && <CustomIcon name={icon} size={iconSize} /> }
    <Heading forwardedAs={ headingSize }>{ header }</Heading>
  </Div>
  )
export default HeadingWithIcon
