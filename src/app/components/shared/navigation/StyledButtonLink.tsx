import ButtonLink from "app/components/shared/ButtonLink/ButtonLink";
import styles from "./StyledButtonLink.module.css";

type Props = React.ComponentProps<typeof ButtonLink>

const StyledButtonLink: React.FC<Props> = ({ className, ...props }) => (
  <ButtonLink
    className={ [styles.styledButtonLink, className].filter(Boolean).join(" ") }
    { ...props }
  />
);

export default StyledButtonLink;
