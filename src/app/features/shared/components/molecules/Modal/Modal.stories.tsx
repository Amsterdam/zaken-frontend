import React from "react"
import { boolean, withKnobs } from "@storybook/addon-knobs"
import { Heading, Paragraph } from "@datapunt/asc-ui"

import Modal, { ModalBlock } from "./Modal"
import ConfirmModal from "./ConfirmModal"

export default {
  title: "Shared/Molecules/Modal",
  decorators: [withKnobs]
}

export const Example = () =>
  <Modal isOpen={boolean("isOpen", true)} onClose={() => {}} title='Fusce Inceptos'>
    <ModalBlock>
        <Heading forwardedAs="h4">Sed posuere consectetur est at lobortis</Heading>
        <Paragraph>
          Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Paragraph>
    </ModalBlock>
  </Modal>

export const ConfirmExample = () =>
  <ConfirmModal
    isOpen={boolean("isOpen", true)}
    onClose={() => {}}
    title='Zaak verwijderen'
    heading='Weet je zeker dat je deze zaak wilt verwijderen?'
  >
    Let op: Deze actie kan niet worden ongedaan gemaakt!
  </ConfirmModal>

