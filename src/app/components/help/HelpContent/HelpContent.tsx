import { useMemo } from "react"
import { Accordion, AccordionWrapper, Heading, Paragraph, Spinner } from "@amsterdam/asc-ui"

import { RowWithColumn } from "app/components/layouts/Grid"
import EmailLink from "./EmailLink"
import PhoneLink from "./PhoneLink"

import { useSupportContacts } from "app/state/rest/"
import { Refresh } from "app/components/shared/Icons"
import styled from "styled-components"

const showOptionalProperty = (prop: string | undefined) => prop ?? "(onbekend)"

const mapData = (data: Components.Schemas.PaginatedSupportContactList | undefined) => ([
  data?.results?.find(({ title }) => title === "Coördinator Ontwikkelkamer"),
  data?.results?.find(({ title }) => title === "Datapunt"),
  data?.results?.find(({ title }) => title === "UX Specialist")
])

const RefreshIcon = styled (Refresh)`
  vertical-align: text-top;
`

const HelpContent: React.FC = () => {
  const [data] = useSupportContacts()
  const showSpinner = data === undefined
  const title = "Amsterdamse Zaak Administratie"
  const titleShort = "AZA"
  const contacts = useMemo(() => mapData(data), [data])

  return showSpinner ?
    <Spinner /> :
    <>
      <RowWithColumn>
        <Heading as="h2">Wat kan je met de { title } ({ titleShort })?</Heading>
        <Paragraph>
          De belangrijkste functionaliteiten van { titleShort } staan omschreven in een factsheet. <br/>
          {/* TODO add url */}
          Deze is te raadplegen via de bijgevoegde link: volgt nog
        </Paragraph>
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Bij wie kan ik terecht met vragen?</Heading>
      </RowWithColumn>
      <RowWithColumn>
        <AccordionWrapper>
          <Accordion title="Werkproces">
            <Paragraph>
              Voor het werkproces, oftewel hoe { titleShort } te gebruiken, is een aparte werkinstructie geschreven. Deze kan je opvragen bij je teamleider. De teamleider is er verder ook om vragen en suggesties betreft het werkproces te beantwoorden.
            </Paragraph>
          </Accordion>
          <Accordion title="Algemeen gebruik zaaksysteem">
            <Paragraph>
              In de factsheet, waar bovenaan deze pagina naar verwezen wordt, lees je wat je in { titleShort } kan vinden. Heb je specifiekere vragen hoe { titleShort } werkt of kom je ergens niet uit, neem dan contact op met een van de key-users. Dit zijn directe collega’s die veel kennis hebben van { titleShort } en hier speciaal voor getraind zijn. Zij helpen je graag verder. Vraag aan je teamleider bij wie jij het beste terecht kan.  
            </Paragraph>
          </Accordion>
          <Accordion title="Technisch support" >
            <Paragraph>
              Werkt { titleShort } niet (goed)? Probeer de pagina opnieuw te laden door op het refresh icoon <RefreshIcon /> te klikken.
            </Paragraph>
            <Paragraph>
              Werkt { titleShort } dan nog steeds niet, neem dan contact op met:
            </Paragraph>
            <ul>
              <li>Tijdens kantooruren ontwikkelteam { titleShort }, { showOptionalProperty(contacts[0]?.name) } <PhoneLink phoneNumber={ showOptionalProperty(contacts[0]?.phone_number) } /></li>
              <li>Buiten kantoortijden Datapunt, { showOptionalProperty(contacts[1]?.name) } <PhoneLink phoneNumber={ showOptionalProperty(contacts[1]?.phone_number) } /></li>
            </ul>
          </Accordion>
          <Accordion title={`Feedback ${ titleShort }`}>
            <Paragraph>
              Ontdek je dingen die niet kloppen of heb je suggesties om { titleShort } nog beter te maken? Dan hoort het ontwikkelteam dit graag. Op elke pagina van { titleShort } zie je aan de rechterkant een rood label: Feedback. Via dit formulier kan je alles aan ons kwijt. We nemen daarna zo snel mogelijk contact met je op om je vragen te beantwoorden.<br/>
            </Paragraph>
            <Paragraph>
              Liever persoonlijk contact? Neem contact op met { showOptionalProperty(contacts[2]?.name) }, { showOptionalProperty(contacts[2]?.title) }:
            </Paragraph>
            <ul>
              <li>Telefonisch: te bereiken op ma, di, wo en do tijdens kantooruren op <PhoneLink phoneNumber={ showOptionalProperty(contacts[2]?.phone_number) } /></li>
              <li><EmailLink email={ showOptionalProperty(contacts[2]?.email) } /></li>
            </ul>
          </Accordion>
        </AccordionWrapper>
      </RowWithColumn>
    </>
}
export default HelpContent
