import { Button } from "@amsterdam/asc-ui"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"
import Hidden from "app/components/shared/Hidden/Hidden"
import { useNavigate } from "react-router-dom"

type Props = {
  text: string
  path?: string
  disabled?: boolean
}

// Add an extra <span> outside the Button to help with vertical alignment
export const LinkButton: React.FC<Props> = ({ text, path, disabled }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (path) {
      navigate(path)
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <span style={{ display: "flex", alignItems: "center" }}>
        <CustomTooltip
          title={
            disabled ? "U heeft geen rechten om deze actie uit te voeren" : ""
          }
        >
          <Button
            variant="textButton"
            iconLeft={<CustomIcon name="ChevronRight" />}
            onClick={handleClick}
            disabled={disabled}
          >
            <Hidden maxBreakpoint="laptopM">{text}</Hidden>
          </Button>
        </CustomTooltip>
      </span>
    </div>
  )
}

export default LinkButton
