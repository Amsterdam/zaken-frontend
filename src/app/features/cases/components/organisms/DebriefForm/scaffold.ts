import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"

export default (caseId: string) => {
  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        label: "Is er sprake van een overtreding?",
        isRequired: true,
        options: {
          "true": "Ja, overtreding",
          "false": "Nee, geen overtreding",
          "other": "Nader onderzoek nodig"
        }
      }
    },
    feedback: {
      type: "TextAreaField",
      isRequired: true,
      props: {
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
