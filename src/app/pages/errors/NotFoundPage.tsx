import { useNavigate } from "react-router-dom"
import {
  Button,
  Column,
  Grid,
  Heading,
  Icon,
  Paragraph,
} from "@amsterdam/design-system-react"
import { FaceSadIcon, HouseIcon } from "@amsterdam/design-system-react-icons"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import styles from "./NotFoundPage.module.css"

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Column gap="large" className={styles.content}>
          <Icon svg={FaceSadIcon} className={styles.icon} />
          <Heading level={1}>404 – Oeps! We zijn de weg even kwijt.</Heading>
          <Paragraph>
            De pagina die je zoekt bestaat niet of is verhuisd. Geen zorgen, we
            helpen je graag weer op weg.
          </Paragraph>
          <Button icon={HouseIcon} iconBefore onClick={() => navigate("/")}>
            Terug naar de startpagina
          </Button>
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default NotFoundPage
