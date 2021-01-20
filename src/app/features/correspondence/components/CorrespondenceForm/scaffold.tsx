import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"
import InfoButton from "app/features/shared/components/molecules/InfoHeading/InfoButton"

export default (caseId: Components.Schemas.Case["id"], correspondence: MockComponents.Schemas.Correspondence[]) => {

  const correspondenceObject = correspondence.reduce((acc, cur) => {
    acc[`correspondence.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)

  const fields = {
    correspondence: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Welk type correspondentie is van toepassing?",
        extraLabel:<InfoButton infoTitle="Let op" infoText="Zorg dat je eventueel binnengekomen correspondentie correct opslaat in decos."></InfoButton>,
        name: "correspondence",
        options: correspondenceObject
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Notitie",
        name: "text",
        isRequired: true
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Notitie verwerken"
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
      ["correspondence", "correspondence"],
      ["text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

