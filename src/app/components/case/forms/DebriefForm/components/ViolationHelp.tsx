import { useState } from "react"
import { createPortal } from "react-dom"
import {
  ActionGroup,
  Button,
  Dialog,
  OrderedList,
  UnorderedList,
} from "@amsterdam/design-system-react"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"
import { StandaloneButton } from "@/components/StandaloneButton/StandaloneButton"

/**
 * Help with the outcome of a debrief: what to choose when it is not clear
 * whether there is a violation. A button that opens the explanation.
 */
export const ViolationHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <StandaloneButton onClick={() => setIsOpen(true)}>
        Niet duidelijk of er een overtreding is?
      </StandaloneButton>
      {/* Outside the form the button is in: a button of the dialog must not
          send the form. */}
      {isOpen &&
        createPortal(
          <OpenDialog
            heading="Niet duidelijk of er een overtreding is? Twee opties:"
            onClose={() => setIsOpen(false)}
            footer={
              <ActionGroup>
                <Button type="button" onClick={Dialog.close}>
                  Sluiten
                </Button>
              </ActionGroup>
            }
          >
            <OrderedList>
              <OrderedList.Item>
                <strong>Nader intern onderzoek nodig</strong>
                <UnorderedList>
                  <UnorderedList.Item>
                    Nader onderzoek nodig wat niet op de locatie zelf is. Bijv.
                    advies van de teamleider of jurist.
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
                    Nader onderzoek nodig op het adres zelf door de
                    toezichthouders.
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
          </OpenDialog>,
          document.body,
        )}
    </div>
  )
}

export default ViolationHelp
