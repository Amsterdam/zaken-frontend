import { Link } from "react-router-dom";
import { Typography } from "@amsterdam/asc-ui";
import styles from "./AddressLink.module.css";
import to from "app/routing/utils/to";

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  as?: React.ComponentProps<typeof Typography>["styleAs"]
  title?: string
}

const AddressLink: React.FC<Props> = ({ title, bagId, as = "h2" }) =>
  <Link className={ styles.styledLink } to={ to("/adres/:bagId", { bagId }) }>
    <Typography as={ as } styleAs={ as }>{ title }</Typography>
  </Link>;

export default AddressLink;
