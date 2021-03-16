import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], decisions: MockComponents.Schemas.Decision[]) => {

  const fields = {
    decision: {
      type: "ComplexRadioFields",
      props: {
        isRequired: true,
        label: "Is er sprake van een sanctie?",
        name: "decision",
        optionLabelField: "title",
        options: decisions
      }
    },
    sanction_amount: {
      type: "ShowHide",
      props: {
        name: "sanction_amount",
        label: "Wat is het bedrag?",
        shouldShow: ({ values: { decision } }: { values: { decision: MockComponents.Schemas.Decision } }) => decision && decision.title === "Ja",
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
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(niet verplicht)",
        name: "text",
        isRequired: false
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["decision", "decision"],
      ["sanction_amount", "sanction_amount"],
      ["text", "text"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

