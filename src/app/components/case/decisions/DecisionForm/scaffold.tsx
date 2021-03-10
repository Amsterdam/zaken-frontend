import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
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
    amount: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { decision } }: { values: { decision: MockComponents.Schemas.Decision } }) => { console.log("decision", decision); return (decision && decision.title === "Ja") },
        field: {
          type: "NumberField",
          props: {
            isRequired: true,
            label: "Wat is het bedrag?",
            name: "sanction_amount",
            pattern: "[0-9]",
            title: "Vul alleen cijfers in, geen punten en komma's"
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
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo(`/zaken/${ caseId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr", [
      ["decision", "decision", "decision"],
      ["amount", "amount", "amount"],
      ["text", "text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

