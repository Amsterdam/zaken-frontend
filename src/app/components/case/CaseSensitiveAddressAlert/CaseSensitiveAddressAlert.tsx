import { Alert, Heading, Paragraph } from "@amsterdam/asc-ui";

type Props = {
  isVisible?: boolean;
};

const CaseSensitiveAddressAlert: React.FC<Props> = ({ isVisible = false }) =>
  isVisible ? (
    <Alert level="error" style={{ marginBottom: 24 }}>
      <Heading forwardedAs="h2">Er loopt een ondermijningszaak</Heading>
      <Paragraph>
        Het is op dit moment niet mogelijk om voor dit adres een huisbezoek af
        te leggen. Dit adres is daarom uitgesloten van TOP. Neem voor meer
        informatie contact op met team Ondermijning.
      </Paragraph>
    </Alert>
  ) : null;

export default CaseSensitiveAddressAlert;