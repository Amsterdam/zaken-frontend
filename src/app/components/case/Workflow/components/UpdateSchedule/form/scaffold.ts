import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { Schedule } from "../types"

function getPriorityOptions(
  scheduleTypes?: Components.Schemas.ThemeScheduleTypes,
): Record<number, string> {
  if (!scheduleTypes?.priorities) {
    return {}
  }

  return scheduleTypes.priorities.reduce(
    (acc, priority) => {
      acc[priority.id] = priority.name
      return acc
    },
    {} as Record<number, string>,
  )
}

function scaffold(
  onCancel: () => void,
  schedule?: Schedule,
  scheduleTypes?: Components.Schemas.ThemeScheduleTypes,
) {
  const fields = {
    priority: {
      type: "SelectField",
      props: {
        isRequired: true,
        name: "priority",
        label: "Wat is de urgentie voor het bezoek?",
        options: getPriorityOptions(scheduleTypes),
      },
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: onCancel,
      },
    },
    submit: {
      type: "SubmitButton",
      variant: "primary",
      props: {
        label: "Verwerken",
        align: "right",
      },
    },
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["priority", "priority"],
      ["cancel", "submit"],
    ])
    .getScaffoldProps()
}

export default scaffold
