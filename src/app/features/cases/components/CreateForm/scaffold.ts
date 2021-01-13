import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { navigate } from "@reach/router"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

export default (bagId: Components.Schemas.Address["bag_id"], teams: MockComponents.Schemas.Team[], reasons: MockComponents.Schemas.Team[]) => {

  const teamsObject = teams.reduce((acc, cur) => {
    acc[`team.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)

  const reasonsObject = reasons.reduce((acc, cur) => {
    acc[`reason.${ cur.id }`] = cur.title
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
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "text",
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
    .setGrid("laptop", "1fr 1fr 1fr 1fr", [
      ["team", "team"],
      ["reason", "reason"],
      ["text", "text"],
      ["submit", "cancel"]
    ])
    .getScaffoldProps()
}