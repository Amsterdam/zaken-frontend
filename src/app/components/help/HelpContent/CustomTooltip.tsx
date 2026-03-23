import { Tooltip } from "react-tooltip"
import styled from "styled-components"

type Props = {
  children: React.ReactNode
  title: string
}

const StyledTooltip = styled(Tooltip)`
  z-index: 1000;
  font-size: 0.875rem !important;
  font-weight: 400;
`

const CustomTooltip: React.FC<Props> = ({ children, title }) => {
  const tooltipId = `tooltip-${title}`
  return (
    <>
      <span data-tooltip-id={tooltipId}>{children}</span>
      <StyledTooltip
        id={tooltipId}
        content={title}
        place="bottom"
        className="custom-tooltip"
      />
    </>
  )
}

export default CustomTooltip
