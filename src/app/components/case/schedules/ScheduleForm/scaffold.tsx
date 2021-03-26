import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

// TODO: scheduleTypes type
export default (caseId: Components.Schemas.Case["id"], scheduleTypes: any) => {

  const fields = {
    action: {
      type: "ComplexSelectField",
      props: {
        label: "action",
        name: "action",
        optionLabelField: "name",
        options: scheduleTypes?.actions,
        isRequired: true
      }
    },
    week_segment: {
      type: "ComplexSelectField",
      props: {
        label: "week_segment",
        name: "week_segment",
        optionLabelField: "name",
        options: scheduleTypes?.week_segments,
        isRequired: true
      }
    },
    day_segment: {
      type: "ComplexSelectField",
      props: {
        label: "day_segment",
        name: "day_segment",
        optionLabelField: "name",
        options: scheduleTypes?.day_segments,
        isRequired: true
      }
    },
    priority: {
      type: "ComplexSelectField",
      props: {
        label: "priority",
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
        label: "Huisbezoek inplannen",
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

