import { OrderedList, UnorderedList } from "@amsterdam/design-system-react"
import { HelpDialog } from "@/components/HelpDialog/HelpDialog"

/**
 * Help with the outcome of a debrief: what to choose when it is not clear
 * whether there is a violation. A button that opens the explanation.
 */
export const ViolationHelp: React.FC = () => (
  <HelpDialog
    label="Niet duidelijk of er een overtreding is?"
    heading="Niet duidelijk of er een overtreding is? Twee opties:"
  >
    <OrderedList>
      <OrderedList.Item>
        <strong>Nader intern onderzoek nodig</strong>
        <UnorderedList>
          <UnorderedList.Item>
            Nader onderzoek nodig wat niet op de locatie zelf is. Bijv. advies
            van de teamleider of jurist.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Verwerk de uitkomst vervolgens in een nieuwe debriefnotitie.
          </UnorderedList.Item>
        </UnorderedList>
      </OrderedList.Item>
      <OrderedList.Item>
        <strong>Aanvullend bezoek nodig</strong>
        <UnorderedList>
          <UnorderedList.Item>
            Nader onderzoek nodig op het adres zelf door de toezichthouders.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Zet dit bezoek uit via de projectmedewerker.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Vermeld waar specifiek op gelet moet worden.
          </UnorderedList.Item>
        </UnorderedList>
      </OrderedList.Item>
    </OrderedList>
  </HelpDialog>
)
