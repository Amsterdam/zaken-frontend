import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import InfoContent from "./components/InfoContent"
import navigateTo from "app/routing/navigateTo"
import { translationsDebrief, translationsMap } from "app/translations/translations"

export default (caseId: Components.Schemas.Case["id"], violationTypes: Components.Schemas.PaginatedViolationTypeList["results"]) => {

  const violationOptions = violationTypes?.map(({ key }) => key).reduce((acc, item) => { acc[item] = translationsMap(translationsDebrief, item); return acc }, {} as Record<string, string>)

  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Wat is de uitkomst van het huisbezoek?",
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
          type: "TextField",
          props: {
            isRequired: true,
            name: "theme",
            label: "Naar welk thema overdragen?"
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