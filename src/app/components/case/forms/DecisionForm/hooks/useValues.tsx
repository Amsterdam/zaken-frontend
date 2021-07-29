import { capitalizeString } from "app/components/shared/Helpers/helpers"
import { List, PersonNameDisplay, PersonRoleDisplay } from "@amsterdam/wonen-ui"

export default (summon?: Components.Schemas.Summon) => {

  if (summon === undefined) return

  const { persons, type_name } = summon

  const personNames = persons.map(({ first_name, last_name, preposition, person_role }) =>
    <>
      <PersonNameDisplay
        firstName={ capitalizeString(first_name) }
        namePrefix={ preposition ?? undefined }
        name={ capitalizeString(last_name) }
      />
      { person_role && ", " }
      <PersonRoleDisplay personRole= { person_role } />
    </>
  )

  const values = [
    ["Aanschrijving", type_name],
    ["Aangeschrevene(n)", <List data={ personNames } />]
  ]

  return Object.fromEntries(values)
}