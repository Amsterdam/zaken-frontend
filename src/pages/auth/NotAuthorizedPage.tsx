import { LockClosedIcon } from "@amsterdam/design-system-react-icons"
import { ErrorPage } from "@/components/ErrorPage/ErrorPage"

const NotAuthorizedPage: React.FC = () => (
  <ErrorPage icon={LockClosedIcon} heading="403 – Geen toegang">
    Helaas, je bent niet geautoriseerd om deze pagina te bekijken.
  </ErrorPage>
)

export default NotAuthorizedPage
