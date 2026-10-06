import {
  Accordion,
  Column,
  Heading,
  Link,
  Paragraph,
  UnorderedList,
} from "@amsterdam/design-system-react"

const title = "AZA, TON en TOP"

const EmailLink = ({ email }: { email: string }) => (
  <Link href={`mailto:${email}`}>{email}</Link>
)

const HelpContact: React.FC = () => (
  <>
    <Heading level={2} className="ams-mb-s">
      Waar kan ik terecht met vragen over {title}?
    </Heading>
    <Accordion headingLevel={3}>
      <Accordion.Section label="Werkproces">
        <Paragraph>
          Voor afspraken over het werkproces met betrekking tot het gebruik van
          de applicaties, kan je terecht bij je teamleider. De teamleider is er
          verder ook om vragen en suggesties over het werkproces te
          beantwoorden.
        </Paragraph>
      </Accordion.Section>
      <Accordion.Section label="Algemeen gebruik">
        <Column>
          <Paragraph>
            Heb je specifiekere vragen over hoe de applicaties werken of kom je
            ergens niet uit, neem dan contact op met één van de key-users. Dit
            zijn directe collega’s die veel kennis hebben van de applicaties.
            Zij helpen je graag verder. Vraag aan je teamleider bij wie jij het
            beste terecht kan.
          </Paragraph>
        </Column>
      </Accordion.Section>
      <Accordion.Section label="Support">
        <Column>
          <Paragraph>
            Neem in de volgende gevallen contact op met{" "}
            <EmailLink email="ivdesk@amsterdam.nl" />:
          </Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Als je technische problemen ondervindt bij het gebruik van {title}
              .
            </UnorderedList.Item>
            <UnorderedList.Item>
              Als je toegang nodig hebt tot {title}, of als je rol of rechten
              moeten worden aangepast.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Als er een zaak verwijderd dient te worden.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Als er een (nieuw) project dient te worden toegevoegd/uitgezet.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Als er onderwerpen gewijzigd, verwijderd of toegevoegd moeten
              worden.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Als er tags gewijzigd, verwijderd of toegevoegd moeten worden.
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

export default HelpContact
