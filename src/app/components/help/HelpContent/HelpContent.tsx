import {
  Accordion,
  Column,
  Heading,
  Icon,
  Link,
  Paragraph,
  UnorderedList,
} from "@amsterdam/design-system-react"
import { RefreshIcon } from "@amsterdam/design-system-react-icons"

const title = "AZA, TON en TOP"
const titleShort = "AZA"

const EmailLink = ({ email }: { email: string }) => (
  <Link href={`mailto:${email}`}>{email}</Link>
)

const HelpContent: React.FC = () => (
  <>
    <Heading level={2} className="ams-mb-s">
      Waar kan ik terecht met vragen over {title}?
    </Heading>
    <Accordion headingLevel={3}>
      <Accordion.Section label="Werkproces">
        <Paragraph>
          Voor afspraken over het werkproces met betrekking tot het gebruik van
          de applicaties, kan je terecht bij je teamleider. De teamleider is er
          verder ook om vragen en suggesties betreft het werkproces te
          beantwoorden.
        </Paragraph>
      </Accordion.Section>
      <Accordion.Section label="Algemeen gebruik">
        <Column>
          <Paragraph>
            De belangrijkste functionaliteiten van {titleShort} staan omschreven
            in een factsheet.
          </Paragraph>
          <Paragraph>
            Heb je specifiekere vragen over hoe de applicaties werken of kom je
            ergens niet uit, neem dan contact op met een van de key-users. Dit
            zijn directe collega’s die veel kennis hebben van de applicaties.
            Zij helpen je graag verder. Vraag aan je teamleider bij wie jij het
            beste terecht kan.
          </Paragraph>
        </Column>
      </Accordion.Section>
      <Accordion.Section label="Support">
        <Column>
          <Paragraph>
            Werkt {title} niet (goed)? Dan kan je de volgende dingen proberen:
          </Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              De pagina opnieuw te laden door op het refresh icoon{" "}
              <Icon svg={RefreshIcon} /> te klikken.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Uit te loggen, om vervolgens opnieuw in te loggen.
            </UnorderedList.Item>
          </UnorderedList>
          <Paragraph>Werkt de applicatie dan nog steeds niet?</Paragraph>
          <Paragraph>Neem dan contact op met:</Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Binnen kantoortijden: <EmailLink email="ivdesk@amsterdam.nl" />
            </UnorderedList.Item>
            <UnorderedList.Item>
              Buiten kantoortijden:{" "}
              <EmailLink email="team.salmagundi@amsterdam.nl" />
            </UnorderedList.Item>
          </UnorderedList>
          <Paragraph>
            Neem in de volgende gevallen ook contact op met ivdesk:
          </Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Als je problemen hebt bij het inloggen.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Er een zaak verwijderd dient te worden.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Er een (nieuw) project dient te worden toegevoegd/uitgezet.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Er een (nieuw) kenmerk in TOP dient te worden toegevoegd/uitgezet.
            </UnorderedList.Item>
            <UnorderedList.Item>
              De gewichten van de variabelen (adres
              coördinaten/hitkans/prioriteit) in TOP dienen te worden aangepast.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Er in een handhavingstraject wordt gevraagd naar het
              hitkanspercentage van ALPHA in TOP, aangaande het huisbezoek
              waarbij de constatering is gedaan.
            </UnorderedList.Item>
          </UnorderedList>
        </Column>
      </Accordion.Section>
      <Accordion.Section label="Feedback">
        <Paragraph>
          Ontdek je dingen die niet kloppen of heb je suggesties om AZA nog
          beter te maken? Op elke pagina van AZA zie je aan de rechterkant een
          rood label: Feedback. Via dit formulier kan je alles aan ons kwijt. We
          nemen daarna zo snel mogelijk contact met je op om je vragen te
          beantwoorden.
        </Paragraph>
      </Accordion.Section>
    </Accordion>
  </>
)

export default HelpContent
