import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], scheduleTypes?: Components.Schemas.ThemeScheduleTypes) => {

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
      ["priority", "priority"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

