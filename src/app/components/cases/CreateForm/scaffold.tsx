import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (bagId: Components.Schemas.Address["bag_id"], teams?: Components.Schemas.CaseTeam[], reasons?: Components.Schemas.CaseReason[]) => {

  console.log("reasons", reasons)
  const fields = {
    team: {
      type: "ComplexRadioFields",
      props: {
        label: "Team wonen",
        name: "team",
        options: teams,
        optionLabelField: "name",
        isRequired: true
      }
    },
    reason: {
      type: "ComplexRadioFields",
      props: {
        label: "Aanleiding",
        name: "reason",
        options: reasons,
        optionLabelField: "name",
        isRequired: true
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "description",
        isRequired: true,
        rows: 7
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigateTo(`/adres/${ bagId }`)
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Zaak aanmaken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["team", "team"],
      ["reason", "reason"],
      ["description", "description"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}