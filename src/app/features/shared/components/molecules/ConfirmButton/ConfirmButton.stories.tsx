import React from "react"
import { withKnobs } from "@storybook/addon-knobs"

import { TrashBin } from "@datapunt/asc-assets/lib"
import ConfirmButton from "./ConfirmButton"

export default {
  title: "Shared/Molecules/ConfirmButton",
  decorators: [withKnobs]
}

const handleConfirm = () => new Promise((resolve) => setTimeout(resolve, 2000))

export const Example = () =>
  <>
    <p>Opens a modal onClick.</p>
    <ConfirmButton
      onConfirm={handleConfirm}
      iconLeft={<TrashBin />}
      variant="secondary"
      modalTitle="Weet je zeker dat je deze zaak wilt verwijderen?"
      modalContent="Let op! Deze actie kan niet ongedaan worden gemaakt."
    >
      Verwijder deze zaak
    </ConfirmButton>
  </>
