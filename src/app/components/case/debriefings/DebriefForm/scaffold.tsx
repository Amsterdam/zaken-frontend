import React from "react"
import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
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
    sanction_amount: {
      type: "ShowHide",
      props: {
        name: "sanction_amount",
        label: "Wat is het bedrag?",
        shouldShow: ({ values: { violation } }: { values: { violation: any } }) => violation && violation === "YES",
        field: {
          type: "NumberField",
          props: {
            isRequired: true,
            label: "Wat is het bedrag?",
            extraLabel: <InfoButton infoTitle="Hoe vul ik het bedrag in?" infoText="Vul hier alleen cijfers in, geen punten en komma's."></InfoButton>,
            name: "sanction_amount",
            pattern: "[0-9]"
          }
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
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: isEditing ? "Terugkoppeling wijzigen" : "Terugkoppeling toevoegen",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["violation", "violation"],
      ["sanction_amount", "sanction_amount"],
      ["feedback", "feedback"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

export default Scaffold
