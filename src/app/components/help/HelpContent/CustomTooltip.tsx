import { Tooltip } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

const CustomTooltip = withStyles(theme => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 14
  }
}))(Tooltip)

export default CustomTooltip
