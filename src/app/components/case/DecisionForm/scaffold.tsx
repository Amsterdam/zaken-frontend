import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], decisions: Components.Schemas.DecisionType[]) => {

  const fields = {
    decision_type: {
      type: "ComplexSelectField",
      props: {
        isRequired: true,
        label: "Welk besluit is opgesteld?",
        name: "decision_type",
        optionLabelField: "name",
        options: decisions,
        withEmptyOption: true,
        emptyOptionLabel: "Maak een keuze"
      }
    },
    sanction_amount: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { decision_type } }: { values: { decision_type: Components.Schemas.DecisionType } }) => decision_type?.is_sanction === true,
        field: {
          type: "NumberField",
          props: {
            isRequired: true,
            label: "Wat is het opgelegde bedrag?",
            extraLabel: <InfoButton infoTitle="Hoe vul ik het bedrag in?" infoText="Vul hier alleen cijfers in, geen punten, komma's of tekens."></InfoButton>,
            name: "sanction_amount",
            pattern: "[0-9]"
          }
        }
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(niet verplicht)",
        name: "description",
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
      ["decision_type", "decision_type"],
      ["sanction_amount", "sanction_amount"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

