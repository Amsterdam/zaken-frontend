import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], scheduleTypes?: Components.Schemas.TeamScheduleTypes) => {

  const fields = {
    week_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Op welke dagen kan het huisbezoek het beste worden ingepland?",
        name: "week_segment",
        optionLabelField: "name",
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.week_segments ?? []
      }
    },
    day_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Tijdens welk dagdeel kan het huisbezoek het beste worden ingepland?",
        name: "day_segment",
        optionLabelField: "name",
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.day_segments ?? []
      }
    },
    priority: {
      type: "ComplexSelectField",
      props: {
        label: "Wat is de urgentie voor het huisbezoek?",
        name: "priority",
        optionLabelField: "name",
        extraLabel: <InfoButton infoTitle="Urgentie huisbezoek" infoText="Gebruik hoge urgentie indien er nu toeristen aanwezig zijn of als er bijvoorbeeld een machtiging van kracht is."></InfoButton>,
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.priorities ?? []
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
        label: "Huisbezoek inplannen",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["week_segment", "week_segment"],
      ["day_segment", "day_segment"],
      ["priority", "priority"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

