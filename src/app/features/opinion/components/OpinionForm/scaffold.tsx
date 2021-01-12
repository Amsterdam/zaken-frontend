import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"

const Scaffold = (caseId: Components.Schemas.Case["id"]) => {
  const fields = {
    resultview: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Wat is de uitkomst van de zienswijze: Voornemen boete?", //TODO make dynamic
        name: "resultview",
        options: {
          "NO": "Afzien aanschrijving",
          "YES": "Opstellen besluit"
        }
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigate(`/cases/${ caseId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr 1fr", [
      ["resultview", "resultview"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

export default Scaffold
