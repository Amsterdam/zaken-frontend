import { Heading } from "@amsterdam/asc-ui";
import CustomIcon, { CustomIconProps } from "../CustomIcon/CustomIcon";

type Props = {
  header: string;
  headingSize?: React.ComponentProps<typeof Heading>["forwardedAs"];
  icon?: CustomIconProps["name"];
  iconSize?: number;
};

const HeadingWithIcon: React.FC<Props> = ({
  icon,
  header,
  headingSize = "h1",
  iconSize = 48,
}) => (
  <div style={{ display: "flex", gap: 8 }}>
    {icon && <CustomIcon name={icon} size={iconSize} />}
    <Heading forwardedAs={headingSize}>{header}</Heading>
  </div>
);
export default HeadingWithIcon;
