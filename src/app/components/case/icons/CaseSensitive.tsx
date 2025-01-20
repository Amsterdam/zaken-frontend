import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"

type Props = {
  isVisible?: boolean
}

const CaseSensitive: React.FC<Props> = ({ isVisible = false }) => (
  isVisible ? (
    <CustomTooltip title="Dit betreft een gevoelige zaak">
      <CustomIcon name="VerifiedUser" size={ 20 } />
    </CustomTooltip>
  ) : null
)

export default CaseSensitive
