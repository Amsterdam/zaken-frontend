import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import moment from "moment"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (
    caseId: Components.Schemas.CaseDetail["id"],
    scheduleTypes?: Components.Schemas.ThemeScheduleTypes,
    visitFromOptions?: { id: number, name: string }[]
  ) => {

  const fields = {
    week_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Op welke dagen kan het bezoek het beste worden ingepland?",
        name: "week_segment",
        optionLabelField: "name",
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.week_segments
      }
    },
    day_segment: {
      type: "ComplexSelectField",
      props: {
        label: "Tijdens welk dagdeel kan het bezoek het beste worden ingepland?",
        name: "day_segment",
        optionLabelField: "name",
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.day_segments
      }
    },
    visit_from: {
      type: "ComplexSelectField",
      props: {
        label: "Wanneer kan het bezoek het beste gelopen worden?",
        name: "visit_from",
        optionLabelField: "name",
        isRequired: true,
        withEmptyOption: true,
        options: visitFromOptions
      }
    },
    visit_from_datetime: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { visit_from: { id: number } } }) => formValues?.values?.visit_from?.id === 2,
        field: {
          type: "DateField",
          props: {
            label: "Vanaf welke datum kan het bezoek ingepland worden?",
            name: "visit_from_datetime",
            isRequired: true,
            validate: (value: string | undefined) => {
              const now = moment()
              const valueDate = moment(value)
              const isInvalidDate = valueDate.isBefore(now, "day") // Date cannot be in the past.
              return isInvalidDate ? "Selecteer vandaag of een dag in de toekomst!" : false
            }
          }
        }
      }
    },
    priority: {
      type: "ComplexSelectField",
      props: {
        label: "Wat is de urgentie voor het bezoek?",
        name: "priority",
        optionLabelField: "name",
        extraLabel: <InfoButton infoTitle="Urgentie bezoek" infoText="Gebruik hoge urgentie indien er nu toeristen aanwezig zijn, kies machtiging als het bezoek prioriteit krijgt in verband met een machtiging."></InfoButton>,
        isRequired: true,
        withEmptyOption: true,
        options: scheduleTypes?.priorities
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "description",
        extraLabel: "(niet verplicht)"
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
        label: "Bezoek inplannen",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["week_segment", "week_segment"],
      ["day_segment", "day_segment"],
      ["visit_from", "visit_from"],
      ["visit_from_datetime", "visit_from_datetime"],
      ["priority", "priority"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

