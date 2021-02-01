import React from "react"
import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import InfoButton from "app/features/shared/components/molecules/InfoHeading/InfoButton"
import { helpTextViolation } from "./HelpContent"
import navigateTo from "app/routing/navigateTo"

const Scaffold = (caseId: Components.Schemas.Case["id"], isEditing = false) => {
  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Wat is de uitkomst van het huisbezoek?",
        extraLabel: <InfoButton infoTitle="Niet duidelijk of er een overtreding is? Twee opties:" infoText={ helpTextViolation}></InfoButton>,
        name: "violation",
        options: {
          "YES": "Overtreding",
          "NO": "Geen overtreding",
          "ADDITIONAL_RESEARCH_REQUIRED": "Nader intern onderzoek nodig",
          "ADDITIONAL_VISIT_REQUIRED": "Aanvullend huisbezoek nodig"
        }
      }
    },
    feedback: {
      type: "TextAreaField",
      props: {
        isRequired: true,
        name: "feedback",
        label: "Korte toelichting"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: isEditing ? "Terugkoppeling wijzigen" : "Terugkoppeling toevoegen"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigateTo(`/zaken/${ caseId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", [
      ["violation", "violation"],
      ["feedback", "feedback"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

export default Scaffold
