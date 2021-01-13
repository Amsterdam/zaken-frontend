import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"
import InfoButton from "app/features/shared/components/molecules/InfoHeading/InfoButton"

export default (caseId: Components.Schemas.Case["id"], summons: MockComponents.Schemas.Summon[]) => {

  const summonsObject = summons.reduce((acc, cur) => {
    acc[cur.id] = cur.title
    return acc
  }, {} as Record<string, string>)


  const fields = {
    resultview: {
      type: "CheckboxFields",
      props: {
        isRequired: true,
        label: "Welke aanschrijving is opgesteld?",
        extraLabel: <InfoButton infoTitle="TODO Aanschrijvingen" infoText="TODO Uitleg over aanschrijvingen"></InfoButton>,
        name: "summon",
        options: summonsObject
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

