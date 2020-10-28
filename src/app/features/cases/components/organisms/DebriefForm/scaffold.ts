import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"

export default (caseId: Components.Schemas.Case["id"]) => {
  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Is er sprake van een overtreding?",
        name: "violation",
        options: {
          "YES": "Ja, overtreding",
          "NO": "Nee, geen overtreding",
          "ADDITIONAL_RESEARCH_REQUIRED": "Nader onderzoek nodig"
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
    submit: {
      type: "SubmitButton",
      props: {
        label: "Terugkoppeling toevoegen"
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "textButton",
        onClick: () => navigate(`/cases/${ caseId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["violation"],
      ["feedback"],
      ["submit"],
      ["cancel"]
    ])
    .getScaffoldProps()
}
