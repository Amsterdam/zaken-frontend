import React, { ComponentProps, FC } from "react"
import { Button, Icon } from "@datapunt/asc-ui"

type Props = {
  onClick?: ComponentProps<typeof Button>["onClick"]
}

const InfoButton: FC<Props> = ({ onClick = () => {} }) =>
  <Button
    variant="blank"
    onClick={ onClick }
    // TODO: Use Info icon from ASC. Once https://github.com/Amsterdam/amsterdam-styled-components/pull/1122 has been merged.
    icon={ <Icon size={ 20 } iconUrl={ `${ process.env.PUBLIC_URL }/icons/Info.svg` } /> }
  />
export default InfoButton
