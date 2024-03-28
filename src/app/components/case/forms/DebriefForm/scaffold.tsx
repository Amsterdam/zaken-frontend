import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import InfoContent from "./components/InfoContent"
import type { NavigateToFunction } from "app/routing/useNavigation"


const createObjectFromArray = (arr: any) => {
  const obj: any = {}
  arr.forEach((item: any) => {
    obj[item] = item
  })
  return obj
}

const getThemeOptions = (themes: Components.Schemas.CaseTheme[], themeName?: string) => {
  const optionsArray: any = [ "-", "Woningverbetering" ]
  themes.forEach((theme) => {
    // Remove current theme from options
    if (theme.name !== themeName) {
      optionsArray.push([theme.name])
    }
  })
  optionsArray.sort()
  const options = createObjectFromArray(optionsArray)
  return options
}

export default (
  caseId: Components.Schemas.CaseDetail["id"],
  navigateTo: NavigateToFunction,
  violationTypes: Components.Schemas.PaginatedViolationTypeList["results"],
  themes: Components.Schemas.CaseTheme[],
  themeName?: string
) => {
  const violationOptions = violationTypes?.reduce((acc, item) => ({ ...acc, [item.key]: [item.value] }), {})

  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: themeName === "Goed verhuurderschap" ? "Wat is de uitkomst van het debriefen?" : "Wat is de uitkomst van het bezoek?",
        extraLabel: <InfoButton infoTitle="Niet duidelijk of er een overtreding is? Twee opties:" infoText={ InfoContent }></InfoButton>,
        name: "violation",
        options: violationOptions
      }
    },
    theme: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { violation: Components.Schemas.ViolationEnum } }) => formValues?.values?.violation === "SEND_TO_OTHER_THEME",
        field: {
          type: "SelectField",
          props: {
            isRequired: true,
            name: "violation_result.theme",
            label: "Naar welk thema overdragen?",
            options: getThemeOptions(themes, themeName)
          }
        }
      }
    },
    nuisance_detected: {
      type: "ShowHide",
      props: {
        shouldShow: (() => themeName === "Vakantieverhuur" ),
        field: {
          type: "CheckboxFields",
          props: {
            label: "Overlast geconstateerd",
            name: "nuisance_detected",
            extraLabel: <InfoButton infoTitle="Overlast geconstateerd" infoText="Aanvinken indien overlast geconstateerd is zoals geluid, lawaai, stank en vuil overlast."></InfoButton>,
            options: {
              nuisance_detected: "Ja"
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
      ["nuisance_detected", "nuisance_detected"],
      ["feedback", "feedback"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}