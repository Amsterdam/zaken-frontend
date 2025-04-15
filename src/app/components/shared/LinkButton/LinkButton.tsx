import { Button } from "@amsterdam/asc-ui"
import { Link } from "react-router-dom"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"
import Hidden from "app/components/shared/Hidden/Hidden"
import styles from "./LinkButton.module.css"

type Props = {
  text: string
  path: string
  disabled?: boolean
}

// Link is used for the href open on new tab.
// Button is used for the disable property.
export const LinkButton: React.FC<Props> = ({ text, path, disabled }) => (
  <span className={styles.LinkButton}>
    {disabled ? (
      <CustomTooltip title="U heeft geen rechten om deze actie uit te voeren">
        <Button
          variant="textButton"
          iconLeft={<CustomIcon name="ChevronRight" />}
          disabled={true}
        >
          <Hidden maxBreakpoint="laptopM">{text}</Hidden>
        </Button>
      </CustomTooltip>
    ) : (
      <Link to={path} className={styles.link}>
        <CustomIcon name="ChevronRight" size={20} />
        <Hidden maxBreakpoint="laptopM">{text}</Hidden>
      </Link>
    )}
  </span>
)

export default LinkButton
