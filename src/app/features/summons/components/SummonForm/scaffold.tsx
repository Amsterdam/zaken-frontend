import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"
import InfoButton from "app/features/shared/components/molecules/InfoHeading/InfoButton"
import to from "app/features/shared/routing/to"

export default (caseId: Components.Schemas.Case["id"], summons: MockComponents.Schemas.Summon[]) => {

  const summonsObject = summons.reduce((acc, cur) => {
    acc[`summon.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)

  const fields = {
    summons: {
      type: "SelectField",
      props: {
        isRequired: true,
        withEmptyOption: true,
        label: "Welke aanschrijving is opgesteld?",
        extraLabel: <InfoButton infoTitle="TODO Aanschrijvingen" infoText="TODO Uitleg over aanschrijvingen"></InfoButton>,
        name: "summons",
        options: summonsObject
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(Niet verplicht)",
        name: "text"
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
        onClick: () => navigate(to(`/zaken/${ caseId }`))
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", [
      ["summons", "summons"],
      ["text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

