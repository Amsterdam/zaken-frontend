import dayjs from "dayjs"
import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"

import { Fields } from "app/components/shared/Form/ScaffoldFields"

function scaffold(
  onCancel: () => void,
  scheduleTypes?: Components.Schemas.ThemeScheduleTypes,
  visitFromOptions?: { id: number, name: string }[]
) {
  const fields = {
    week_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Op welke dagen kan het bezoek het beste worden ingepland?",
        name: "week_segment",
        optionLabelField: "name",
        isRequired: true,
        options: scheduleTypes?.week_segments,
      },
    },
    day_segment: {
      type: "ComplexSelectField",
      props: {
        label:
          "Tijdens welk dagdeel kan het bezoek het beste worden ingepland?",
        name: "day_segment",
        optionLabelField: "name",
        isRequired: true,
        options: scheduleTypes?.day_segments,
      },
    },
    visit_from: {
      type: "ComplexSelectField",
      props: {
        label: "Wanneer kan het bezoek het beste gelopen worden?",
        name: "visit_from",
        optionLabelField: "name",
        isRequired: true,
        options: visitFromOptions,
      },
    },
    visit_from_datetime: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { visit_from: { id: number } } }) =>
          formValues?.values?.visit_from?.id === 2,
        field: {
          type: "DateField",
          props: {
            label: "Vanaf welke datum kan het bezoek ingepland worden?",
            name: "visit_from_datetime",
            isRequired: true,
            validate: (value: string | undefined) => {
              const now = dayjs()
              const valueDate = dayjs(value)
              const isInvalidDate = valueDate.isBefore(now, "day") // Date cannot be in the past.
              return isInvalidDate
                ? "Selecteer vandaag of een dag in de toekomst!"
                : false
            },
          },
        },
      },
    },
    priority: {
      type: "ComplexSelectField",
      props: {
        label: "Wat is de urgentie voor het bezoek?",
        name: "priority",
        optionLabelField: "name",
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.priorities
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
        label: "Wijziging opslaan",
        align: "right",
      },
    },
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["week_segment", "week_segment"],
      ["day_segment", "day_segment"],
      ["visit_from", "visit_from"],
      ["visit_from_datetime", "visit_from_datetime"],
      ["priority", "priority"],
      ["cancel", "submit"],
    ])
    .getScaffoldProps()
}

export default scaffold
