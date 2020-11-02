import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"

export default (caseId: Components.Schemas.Case["id"], onDelete?: () => void) => {
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
    secondaryButton: {
      type: "Button",
      props: {
        label: onDelete ? "Verwijder" : "Annuleer",
        variant: "primaryInverted",
        onClick: onDelete ?? (() => navigate(`/cases/${ caseId }`))
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr 1fr", [
      ["violation", "violation"],
      ["feedback", "feedback"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}
