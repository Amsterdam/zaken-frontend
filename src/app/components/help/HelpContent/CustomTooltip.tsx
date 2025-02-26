import { Tooltip } from "react-tooltip"

type Props = {
  children: React.ReactNode
  title: string
}

const CustomTooltip: React.FC<Props> = ({ children, title }) => {
  const tooltipId = `tooltip-${title}`
  return (
    <>
      <span data-tooltip-id={tooltipId}>{children}</span>
      <Tooltip id={tooltipId} content={title} place="bottom" />
    </>
  )
}

export default CustomTooltip
