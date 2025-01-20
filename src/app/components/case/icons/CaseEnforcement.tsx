import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"

type Props = {
  isVisible?: boolean
}

const CaseEnforcement: React.FC<Props> = ({ isVisible = false }) => (
  isVisible ? (
    <CustomTooltip title="Deze zaak heeft een handhavingsverzoek als aanleiding">
      <CustomIcon name="PanTool" color="#f44336" size={ 18 } />
    </CustomTooltip>
  ) : null
)

export default CaseEnforcement
