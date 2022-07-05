import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

const descriptionRequired = (idDecision: number | undefined, shouldMatch = true) => shouldMatch ? idDecision === 9 : idDecision !== 9

export default (caseId: Components.Schemas.CaseDetail["id"], decisions?: Components.Schemas.DecisionType[]) => {

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
        shouldShow: (formValues: { values?: { decision_type: Components.Schemas.DecisionType } }) => formValues?.values?.decision_type?.is_sanction === true,
        field: {
          type: "NumberField",
          props: {
            isRequired: true,
            label: "Wat is het opgelegde bedrag?",
            extraLabel: <InfoButton infoTitle="Hoe vul ik het bedrag in?" infoText="Vul hier alleen cijfers in, geen punten, komma's of tekens."></InfoButton>,
            name: "sanction_amount",
            pattern: "[0-9]",
            min: 0,
            validate: (value: number | undefined) => Number.isInteger(value) ? false : "Voer alleen cijfers in, geen punten of komma's!"
          }
        }
      }
    },
    description: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { decision_type: Components.Schemas.DecisionType } }) => descriptionRequired(formValues?.values?.decision_type?.id, false),
        field: {
          type: "TextAreaField",
          props: {
            label: "Korte toelichting",
            extraLabel: "(niet verplicht)",
            name: "description"
          }
        }
      }
    },
    description_closing: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { decision_type: Components.Schemas.DecisionType } }) => descriptionRequired(formValues?.values?.decision_type?.id),
        field: {
          type: "TextAreaField",
          props: {
            label: "Korte toelichting",
            name: "description_closing",
            isRequired: true
          }
        }
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
        variant: "secondary",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["decision_type", "decision_type"],
      ["sanction_amount", "sanction_amount"],
      ["description", "description"],
      ["description_closing", "description_closing"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

