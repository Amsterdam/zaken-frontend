import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"]) => {


  const fields = {
    identification: {
      type: "TextField",
      props: {
        label: "SIA-nummer",
        extraLabel: <InfoButton infoTitle="SIA-nummer" infoText="Vermeld hier het corresponderende SIA-nummer, zodat de melding makkelijk terug te vindein is in SIA."></InfoButton>,
        name: "identification",
        isRequired: true
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting melding",
        extraLabel: <InfoButton infoTitle="Korte toelichting melding" infoText="Geef korte toelichting betreft de melding. De melding zelf kan opgezocht worden in SIA."></InfoButton>,
        name: "description",
        isRequired: true
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["identification", "identification"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

