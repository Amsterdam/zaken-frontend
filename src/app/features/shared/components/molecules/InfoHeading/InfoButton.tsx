import React, { ComponentProps, FC } from "react"
import { Button, Icon } from "@datapunt/asc-ui"
import { Info } from "@datapunt/asc-assets"

type Props = {
  onClick?: ComponentProps<typeof Button>["onClick"]
}

const InfoButton: FC<Props> = ({ onClick = () => {} }) =>
  <Button
    variant="blank"
    onClick={ onClick }
    icon={ <Icon><Info /></Icon> }
  />
export default InfoButton
