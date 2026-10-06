import { Alert, Paragraph } from "@amsterdam/design-system-react"

type Props = {
  isVisible?: boolean
}

const CaseSensitiveAddressAlert: React.FC<Props> = ({ isVisible = false }) =>
  isVisible ? (
    <Alert
      heading="Er loopt een ondermijningszaak"
      headingLevel={2}
      severity="error"
    >
      <Paragraph>
        Het is op dit moment niet mogelijk om voor dit adres een huisbezoek af
        te leggen. Dit adres is daarom uitgesloten van TOP. Neem voor meer
        informatie contact op met team Ondermijning.
      </Paragraph>
    </Alert>
  ) : null

export default CaseSensitiveAddressAlert
