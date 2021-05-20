import { Link, Typography } from "@amsterdam/asc-ui"
import to from "app/routing/utils/to"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  as?: "h1" | "h2" | "span"
  title?: string
}

const AddressLink: React.FC<Props> = ({ title, bagId, as = "h2" }) => 
  <Link href={ to("/adres/:bagId", { bagId }) }>
    <Typography as={ as } styleAs={ as }>{ title }</Typography>
  </Link>
 
export default AddressLink
