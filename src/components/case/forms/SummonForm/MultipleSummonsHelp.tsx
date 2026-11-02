import { Accordion, OrderedList } from "@amsterdam/design-system-react"

const MultipleSummonsHelp = () => (
  <Accordion headingLevel={3}>
    <Accordion.Section label="Meer dan één aanschrijving opgesteld?">
      <OrderedList>
        <OrderedList.Item>Verwerk eerst deze aanschrijving.</OrderedList.Item>
        <OrderedList.Item>
          Kies daarna bij “Taak opvoeren” op de zaakpagina “Opstellen concept
          aanschrijving”.
        </OrderedList.Item>
        <OrderedList.Item>
          Vul het formulier in en rond af met de knop “Resultaat verwerken”.
        </OrderedList.Item>
        <OrderedList.Item>
          Herhaal dit per opgestelde aanschrijving.
        </OrderedList.Item>
      </OrderedList>
    </Accordion.Section>
  </Accordion>
)

export default MultipleSummonsHelp
