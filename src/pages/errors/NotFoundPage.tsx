import { FaceSadIcon } from "@amsterdam/design-system-react-icons"
import { ErrorPage } from "@/components/ErrorPage/ErrorPage"

const NotFoundPage: React.FC = () => (
  <ErrorPage
    icon={FaceSadIcon}
    heading="404 – Oeps! We zijn de weg even kwijt."
  >
    De pagina die je zoekt bestaat niet of is verhuisd. Geen zorgen, we helpen
    je graag weer op weg.
  </ErrorPage>
)

export default NotFoundPage
