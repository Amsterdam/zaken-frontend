import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], scheduleTypes: Components.Schemas.TeamScheduleTypes) => {

  const fields = {
    action: {
      type: "ComplexSelectField",
      props: {
        label: "Welke actie moet worden ingepland?",
        name: "action",
        optionLabelField: "name",
        options: scheduleTypes?.actions,
        isRequired: true
      }
    },
    week_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Op welke dagen kan de actie het best worden ingepland?",
        name: "week_segment",
        optionLabelField: "name",
        options: scheduleTypes?.week_segments,
        isRequired: true
      }
    },
    day_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Tijdens welk dagdeel kan de actie het beste worden ingepland?",
        name: "day_segment",
        optionLabelField: "name",
        options: scheduleTypes?.day_segments,
        isRequired: true
      }
    },
    priority: {
      type: "ComplexSelectField",
      props: {
        label: "Wat is de urgentie?",
        name: "priority",
        optionLabelField: "name",
        options: scheduleTypes?.priorities,
        isRequired: true
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
        label: "Actie inplannen",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["action", "action"],
      ["week_segment", "week_segment"],
      ["day_segment", "day_segment"],
      ["priority", "priority"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

