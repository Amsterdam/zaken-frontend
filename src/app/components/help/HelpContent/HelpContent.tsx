import { Accordion, Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui"
import { RowWithColumn } from "app/components/layouts/Grid"
import EmailLink from "./EmailLink"
import PhoneLink from "./PhoneLink"
import { Refresh } from "app/components/shared/Icons"
import styled from "styled-components"

const RefreshIcon = styled (Refresh)`
  vertical-align: text-top;
`

const AccordionWrapper = styled.div`
  margin-bottom: ${ themeSpacing(1) };
`

const HelpContent: React.FC = () => {
  const title = "AZA/TOP/de Planningstool"
  const titleShort = "AZA"

  return (
    <>
      <RowWithColumn>
        <Heading as="h2">Waar kan ik terecht met vragen over { title }?</Heading>
      </RowWithColumn>
      <RowWithColumn>
        <AccordionWrapper>
          <Accordion title="Werkproces">
            <Paragraph>
              Voor afspraken over het werkproces met betrekking tot het gebruik van de applicaties, kan je terecht bij je teamleider. De teamleider is er verder ook om vragen en suggesties betreft het werkproces te beantwoorden.
            </Paragraph>
          </Accordion>
        </AccordionWrapper>
        <AccordionWrapper>
          <Accordion title="Algemeen gebruik">
            <Paragraph>
              De belangrijkste functionaliteiten van { titleShort } staan omschreven in een factsheet.
            </Paragraph>
            <Paragraph>
              Je vindt de factsheet op de G-schijf:<br /><i>G:\WZS\Organisatie\VNH\AZA Werkinstructie</i>
            </Paragraph>
            <Paragraph>
              In de factsheet lees je wat je in { titleShort } kan vinden.
            </Paragraph>
            <Paragraph>
              De handleidingen van TOP/de Planningstool staan op tamtam onder:
              Wonen - Toezicht & Handhaving - Items
            </Paragraph>
            <Paragraph>
              Heb je specifiekere vragen over hoe de applicaties werken of kom je ergens niet uit, neem dan contact op met een van de key-users. Dit zijn directe collega’s die veel kennis hebben van de applicaties. Zij helpen je graag verder. Vraag aan je teamleider bij wie jij het beste terecht kan.
            </Paragraph>
          </Accordion>
        </AccordionWrapper>
        <AccordionWrapper>
          <Accordion title="Support" >
            <Paragraph>
              Werkt { title } niet (goed)? Dan kan je de volgende dingen proberen:
              <ul>
                <li>De pagina opnieuw te laden door op het refresh icoon <RefreshIcon /> te klikken.</li>
                <li>Uit te loggen, om vervolgens opnieuw in te loggen.</li>
              </ul>
            </Paragraph>
            <Paragraph>
              Werkt de applicatie dan nog steeds niet?
            </Paragraph>
            <Paragraph>
              Neem dan contact op met:
              <ul>
                <li>Binnen kantoortijden: <EmailLink email="ivdesk@amsterdam.nl" /></li>
                <li>Buiten kantoortijden: <EmailLink email="team.salmagundi.ois@amsterdam.nl" /></li>
              </ul>
            </Paragraph>
            <Paragraph>
              Neem in de volgende gevallen ook contact op met ivdesk:
              <ul>
                <li>Als je problemen hebt bij het inloggen.</li>
                <li>Er een zaak verwijderd dient te worden.</li>
                <li>Er een (nieuw) project dient te worden toegevoegd/uitgezet.</li>
                <li>Er een (nieuw) kenmerk in TOP dient te worden toegevoegd/uitgezet.</li>
                <li>De gewichten van de variabelen (adres coördinaten/hitkans/prioriteit) in TOP dienen te worden aangepast.</li>
                <li>Er in een handhavingstraject wordt gevraagd naar het hitkanspercentage van ALPHA in TOP, aangaande het huisbezoek waarbij de constatering is gedaan.</li>
              </ul>

            </Paragraph>
          </Accordion>
        </AccordionWrapper>
        <AccordionWrapper>
          <Accordion title="Feedback">
            <Paragraph>
              Ontdek je dingen die niet kloppen of heb je suggesties om AZA nog beter te maken? Op elke pagina van AZA zie je aan de rechterkant een rood label: Feedback. Via dit formulier kan je alles aan ons kwijt. We nemen daarna zo snel mogelijk contact met je op om je vragen te beantwoorden.
            </Paragraph>
            <Paragraph>
              Liever persoonlijk contact? Of feedback over TOP/de Planningstool?
            </Paragraph>
            <Paragraph>
              Neem dan contact op met: Mèxime Poll.
              <ul>
                <li>Ma t/m do tijdens kantooruren op <PhoneLink phoneNumber="06-82686587"/>of <EmailLink email="m.poll@amstedam.nl" /></li>
              </ul>
            </Paragraph>
          </Accordion>
        </AccordionWrapper>
      </RowWithColumn>
    </>
  )
}

export default HelpContent
