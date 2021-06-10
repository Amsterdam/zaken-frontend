import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import InfoContent from "./components/InfoContent"
import navigateTo from "app/routing/navigateTo"
import translationsViolationTypes from "app/translations/translationsViolationTypes"
import translationsMap from "app/translations/translationsMap"

export default (caseId: Components.Schemas.Case["id"], violationTypes: Components.Schemas.PaginatedViolationTypeList["results"]) => {

  const violationOptions = violationTypes?.map(({ key }) => key).reduce((acc, item) => { acc[item] = translationsMap(translationsViolationTypes, item); return acc }, {} as Record<string, string>)

  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Wat is de uitkomst van het bezoek?",
        extraLabel: <InfoButton infoTitle="Niet duidelijk of er een overtreding is? Twee opties:" infoText={ InfoContent }></InfoButton>,
        name: "violation",
        options: violationOptions
      }
    },
    theme: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { violation } }: { values: { violation: any } }) => violation === "SEND_TO_OTHER_THEME",
        field: {
          type: "SelectField",
          props: {
            isRequired: true,
            name: "violation_result.theme",
            label: "Naar welk thema overdragen?",
            options: { 
              "-": "-",
              "Kamerverhuur": "Kamerverhuur",
              "Leegstand": "Leegstand",
              "Onderhuur": "Onderhuur",
              "Ondermijning": "Ondermijning",
              "Woningverbetering": "Woningverbetering"
            }
          }
        }
      }
    },
    feedback: {
      type: "TextAreaField",
      props: {
        isRequired: true,
        name: "feedback",
        label: "Korte toelichting"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Terugkoppeling toevoegen",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["violation", "violation"],
      ["theme", "theme"],
      ["feedback", "feedback"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}