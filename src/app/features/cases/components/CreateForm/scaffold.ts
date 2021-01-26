import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { navigate } from "@reach/router"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

export default (bagId: Components.Schemas.Address["bag_id"], teams: Components.Schemas.CaseTeam[], reasons: Components.Schemas.CaseReason[]) => {

  const teamsObject = teams.reduce((acc, cur) => {
    acc[`team.${ cur.id }`] = cur.name
    return acc
  }, {} as Record<string, string>)

  const reasonsObject = reasons.reduce((acc, cur) => {
    acc[`reason.${ cur.id }`] = cur.name
    return acc
  }, {} as Record<string, string>)

  const fields = {
    team: {
      type: "RadioFields",
      props: {
        label: "Team wonen",
        name: "team",
        options: teamsObject,
        isRequired: true
      }
    },
    reason: {
      type: "RadioFields",
      props: {
        label: "Aanleiding",
        name: "reason",
        options: reasonsObject,
        isRequired: true
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "description",
        isRequired: true
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Zaak aanmaken"
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigate(`/adres/${ bagId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", [
      ["team", "team"],
      ["reason", "reason"],
      ["description", "description"],
      ["submit", "cancel"]
    ])
    .getScaffoldProps()
}