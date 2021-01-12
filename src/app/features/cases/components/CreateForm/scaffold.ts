import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

export default (teams: MockComponents.Schemas.Team[], reasons: MockComponents.Schemas.Team[]) => {

  const teamsObject = teams.reduce((acc, cur) => {
    acc[cur.id] = cur.title
    return acc
  }, {} as Record<string, string>)

  const reasonsObject = reasons.reduce((acc, cur) => {
    acc[cur.id] = cur.title
    return acc
  }, {} as Record<string, string>)

  const fields = {
    team: {
      type: "RadioFields",
      props: {
        label: "Team wonen",
        name: "team",
        options: teamsObject
      }
    },
    reasons: {
      type: "RadioFields",
      props: {
        label: "Aanleiding",
        name: "reason",
        options: reasonsObject
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
        label: "Opslaan"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}