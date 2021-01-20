import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"

const Scaffold = (caseId: Components.Schemas.Case["id"], opinions: MockComponents.Schemas.Opinion[], summonTitle: string) => {
  
  const opinionsObject = opinions.reduce((acc, cur) => {
    acc[`opinion.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)
  
  const fields = {
    opinions: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: `Wat is de uitkomst van de zienswijze: ${ summonTitle }?`,
        name: "opinions",
        options: opinionsObject
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Notitie",
        extraLabel: "(Niet verplicht)",
        name: "text",
        isRequired: false
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
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", [
      ["opinions", "opinions", "opinions", "opinions"],
      ["text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

export default Scaffold
