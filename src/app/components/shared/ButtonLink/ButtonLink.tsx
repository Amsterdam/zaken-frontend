import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.css";

type Props = React.ComponentProps<typeof Link> & {
  flex?: boolean
}

// Filter all non-standard props like flex.
const ButtonLink: React.FC<Props> = ({ flex, className, ...props }) => (
  <Link
    className={ [styles.link, flex ? styles.flex : styles.inlineBlock, className].filter(Boolean).join(" ") }
    { ...props }
  />
);

export default ButtonLink;
