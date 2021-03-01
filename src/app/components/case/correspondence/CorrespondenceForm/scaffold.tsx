import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], correspondences: MockComponents.Schemas.Correspondence[]) => {

  const fields = {
    correspondence: {
      type: "ComplexRadioFields",
      props: {
        isRequired: true,
        label: "Welk type notitie is van toepassing?",
        extraLabel:<InfoButton infoTitle="Let op" infoText="Zorg dat je eventueel binnengekomen correspondentie correct opslaat in decos."></InfoButton>,
        name: "correspondence",
        optionLabelField: "title",
        options: correspondences
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
        onClick: () => navigateTo(`/zaken/${ caseId }`)
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

