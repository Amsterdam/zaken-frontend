import {
  Accordion,
  Column,
  Heading,
  Link,
  Paragraph,
  UnorderedList,
} from "@amsterdam/design-system-react"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"

const titleShort = "AZA"

const HelpExplanation: React.FC = () => (
  <>
    <Heading level={2} className="ams-mb-s">
      Hoe werkt {titleShort}?
    </Heading>
    <Accordion headingLevel={3}>
      <Accordion.Section label="Zoeken">
        <Column>
          <Paragraph>
            Via{" "}
            <Link linkComponent={RouterLink} href="/">
              Zoeken
            </Link>{" "}
            in het menu zoek je een adres op, met een postcode en huisnummer of
            met een straatnaam. Je ziet resultaten zodra je minimaal 3 tekens
            hebt ingevoerd. Klik op een adres om de zaken en de gegevens van dat
            adres te bekijken.
          </Paragraph>
          <Paragraph>
            Voor het zoeken gebruikt {titleShort} PDOK. PDOK is het centrale
            platform voor openbare geo-data en kaarten van de Nederlandse
            overheid. Het wordt beheerd door het Kadaster, in samenwerking met
            andere overheidsinstanties.
          </Paragraph>
          <Paragraph>Goed om te weten:</Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Je vindt alleen adressen in de gemeente Amsterdam.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Je ziet maximaal 25 adressen. Staat het adres er niet tussen, maak
              de zoekopdracht dan specifieker.
            </UnorderedList.Item>
          </UnorderedList>
        </Column>
      </Accordion.Section>
      <Accordion.Section label="Taken- en zakenoverzicht">
        <Column>
          <Paragraph>
            Het{" "}
            <Link linkComponent={RouterLink} href="/taken">
              Takenoverzicht
            </Link>{" "}
            toont de open taken, het{" "}
            <Link linkComponent={RouterLink} href="/zaken">
              Zakenoverzicht
            </Link>{" "}
            de zaken. Standaard zie je in het Takenoverzicht de taken van je
            eigen rol en in het Zakenoverzicht de open zaken.
          </Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Filteren: de filters staan boven de tabel en werken direct. De
              minder gebruikte filters staan achter “Alle filters”. Projecten,
              onderwerpen en tags kan je pas kiezen als je een thema hebt
              gekozen. Met “Wis alle filters” zet je de filters terug.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Sorteren: kies een volgorde in het veld “Sorteren op”. Klikken op
              een kolomkop sorteert niet.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Een zaak openen: klik op “Zaakdetails” aan het einde van een rij.
              De rij zelf is niet klikbaar.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Zoeken: in het Zakenoverzicht kan je zoeken op straat of postcode.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Handhavingsverzoeken: deze staan in het Takenoverzicht in een
              aparte tabel bovenaan.
            </UnorderedList.Item>
          </UnorderedList>
          <Paragraph>
            Je filters staan in het adres van de pagina, dus je kan een
            gefilterd overzicht delen met een collega. Het menu onthoudt je
            laatste filters zolang het tabblad van je browser open is.
          </Paragraph>
        </Column>
      </Accordion.Section>
      <Accordion.Section label="Processen (BPMN)">
        <Column>
          <Paragraph>
            Een BPMN is een tekening van een werkproces: een soort routekaart
            die laat zien welke stappen er zijn, in welke volgorde ze komen en
            waar een keuze wordt gemaakt. BPMN staat voor Business Process Model
            and Notation, een standaard manier om processen te tekenen.
          </Paragraph>
          <Paragraph>Zo lees je de tekening:</Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Een rondje is het begin of het einde van het proces.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Een blokje is een taak, bijvoorbeeld het inplannen van een
              huisbezoek.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Een ruit is een keuze: afhankelijk van het antwoord gaat het
              proces de ene of de andere kant op.
            </UnorderedList.Item>
            <UnorderedList.Item>
              De pijlen geven aan welke stap daarna komt.
            </UnorderedList.Item>
          </UnorderedList>
          <Paragraph>
            {titleShort} gebruikt deze tekeningen om te bepalen welke taak
            wanneer klaarstaat. Elke zaak doorloopt een of meer processen, zoals
            een huisbezoek, een aanschrijving of een besluit. In de tekening zie
            je dus waarom een taak openstaat en wat erna komt.
          </Paragraph>
          <Paragraph>Je vindt de tekeningen op twee plekken:</Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              Bij een zaak: op het tabblad “Processen”, naast “Open taken”,
              staan alle processen die op de zaak zijn gestart, met de status
              Actief of Afgerond. Via “Bekijk huidige processtap” open je het
              diagram; de openstaande taken zijn daarin gemarkeerd.
            </UnorderedList.Item>
            <UnorderedList.Item>
              Alle processen: via{" "}
              <Link linkComponent={RouterLink} href="/bpmn">
                BPMN
              </Link>{" "}
              in het menu kies je een proces en een versie. Standaard zie je de
              nieuwste versie.
            </UnorderedList.Item>
          </UnorderedList>
          <Paragraph>
            In het diagram zoom je in en uit door Ctrl ingedrukt te houden en te
            scrollen. Je verschuift het diagram door te slepen of te scrollen.
            Het adres van de pagina onthoudt je keuze, dus je kan de link delen
            met een collega.
          </Paragraph>
          <Paragraph>
            Als een zaak wordt afgesloten, worden de processen van die zaak
            verwijderd.
          </Paragraph>
        </Column>
      </Accordion.Section>
    </Accordion>
  </>
)

export default HelpExplanation
