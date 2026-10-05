import { type ReactNode } from "react"
import { useNavigate } from "react-router"
import {
  Button,
  Column,
  Grid,
  Heading,
  Icon,
  type IconProps,
  Paragraph,
} from "@amsterdam/design-system-react"
import { HouseIcon } from "@amsterdam/design-system-react-icons"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import styles from "./ErrorPage.module.css"

type Props = {
  icon: IconProps["svg"]
  heading: string
  children: ReactNode
}

/** A full page for an error (404, 403), with a button back to the start page. */
export function ErrorPage({ icon, heading, children }: Props) {
  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Column gap="large" className={styles.content}>
          <Icon svg={icon} className={styles.icon} />
          <Heading level={1}>{heading}</Heading>
          <Paragraph>{children}</Paragraph>
          <Button icon={HouseIcon} iconBefore onClick={() => navigate("/")}>
            Terug naar de startpagina
          </Button>
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default ErrorPage
