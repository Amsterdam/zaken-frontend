import List from "app/components/shared/List/List"
import { capitalizeString } from "app/components/shared/Helpers/helpers"
import { PersonNameDisplay, PersonRoleDisplay } from "@amsterdam/wonen-ui"

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
      <PersonRoleDisplay personRole= { person_role } addToEndOfString />
    </>
  )

  const values = [
    ["Aanschrijving", type_name],
    ["Aangeschrevene(n)", <List items={ personNames } />]
  ]

  return Object.fromEntries(values)
}