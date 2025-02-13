import { Heading, Paragraph, List, ListItem, Link } from "@amsterdam/asc-ui"

const BRP_GROUP_LINK = "https://myaccess.microsoft.com/@hoofdstad.onmicrosoft.com#/access-packages/1c7f8e37-1205-4011-831a-b7a7e12b1c96"
const BRP_GROUP_NAME = "EM4A-brpproxy-reader"
const BRP_WONEN_GROUP_LINK = "https://myaccess.microsoft.com/@hoofdstad.onmicrosoft.com#/access-packages/e6886e6b-578e-45e8-b8e3-61a9daeaf31e"
const BRP_WONEN_GROUP_NAME = "EM4A-brpproxy-wonen"

const MyAccessInfo = () => (
  <>
    <Heading forwardedAs="h2">Toegang vereist</Heading>
    <Paragraph>
      Om toegang te krijgen tot de BRP-gegevens, moet je de juiste rechten aanvragen. <br />
      Volg de onderstaande stappen om toegangspakketten via Microsoft MyAccess aan te vragen.<br /><br />
    </Paragraph>
    <Heading forwardedAs="h3">1. Aanvraag voor BRP-groep</Heading>
    <br />
    <List variant="bullet" style={{ marginLeft: "3rem" }}>
      <ListItem>
        Klik op de onderstaande link om de BRP-groep aan te vragen via de MyAccess-website:
        <br /><br />
        <Link
          href={ BRP_GROUP_LINK }
          variant="inline"
          icon="external"
          target="_blank"
        >
          { BRP_GROUP_NAME}
        </Link>
        <br /><br />
      </ListItem>
      <ListItem>
        In de pop-up met de titel <strong>{BRP_GROUP_NAME}</strong>, klik op <strong>Continue</strong> en daarna op <strong>Submit request</strong>.
        <br /><br />
        De aanvraag wordt doorgestuurd naar de beheerder. Dit kan enige tijd duren. <strong>Ga door naar stap 2.</strong>
        <br /><br />
      </ListItem>
    </List>
    <Heading forwardedAs="h3">2. Aanvraag voor BRP-WONEN-groep</Heading>
    <br />
    <List variant="bullet" style={{ marginLeft: "3rem" }}>
      <ListItem>
        Klik op de onderstaande link om de BRP-WONEN-groep aan te vragen via de MyAccess-website:
        <br /><br />
        <Link
          href={ BRP_WONEN_GROUP_LINK }
          variant="inline"
          icon="external"
          target="_blank"
        >
          { BRP_WONEN_GROUP_NAME }
        </Link>
        <br /><br />
      </ListItem>
      <ListItem>
        In de pop-up met de titel <strong>{BRP_WONEN_GROUP_NAME}</strong>, klik op <strong>Continue</strong> en daarna op <strong>Submit request</strong>.
        <br /><br />
        De aanvraag wordt doorgestuurd naar de beheerder. Het kan even duren voordat de aanvraag is verwerkt.
        <br /><br />
      </ListItem>
    </List>
  </>
)

export default MyAccessInfo
