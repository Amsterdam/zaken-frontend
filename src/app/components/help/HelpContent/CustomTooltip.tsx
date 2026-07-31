import { Tooltip } from "react-tooltip";
import styles from "./CustomTooltip.module.css";

type Props = {
  children: React.ReactNode;
  title: string;
};

const CustomTooltip: React.FC<Props> = ({ children, title }) => {
  const tooltipId = `tooltip-${title}`;

  return (
    <>
      <span data-tooltip-id={tooltipId}>{children}</span>
      {title && (
        <Tooltip
          id={tooltipId}
          content={title}
          place="bottom"
          className={ `${ styles.styledTooltip } custom-tooltip` }
        />
      )}
    </>
  );
};

export default CustomTooltip;
