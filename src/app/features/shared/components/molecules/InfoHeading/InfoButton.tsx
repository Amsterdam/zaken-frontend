import React from "react"
import styled from "styled-components"
import { Button, Icon } from "@datapunt/asc-ui"

type Props = {
  onClick?: () => void
}

const StyledIcon = styled(Icon)`
  background-size: contain;
`

const InfoButton: React.FC<Props> = ({ onClick = () => {} }) =>
  <Button
    variant="blank"
    onClick={ onClick }
    // TODO: Use Info icon from ASC. Once https://github.com/Amsterdam/amsterdam-styled-components/pull/1122 has been merged.
    icon={ <StyledIcon size={ 20 } iconUrl={ `${ process.env.PUBLIC_URL }/icons/Info.svg` } /> }
  />
export default InfoButton
