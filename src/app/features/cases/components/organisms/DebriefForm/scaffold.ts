import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"

export default (caseId: string) => {
  const fields = {
    hit: {
      type: "RadioFields",
      props: {
        label: "Is er sprake van een hit?",
        name: "hit",
        isRequired: true,
        options: {
          "true": "Ja, hit",
          "false": "Nee, geen hit",
          "other": "Nader onderzoek nodig"
        }
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "text"
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
      ["hit"],
      ["text"],
      ["submit"],
      ["cancel"]
    ])
    .getScaffoldProps()
}
