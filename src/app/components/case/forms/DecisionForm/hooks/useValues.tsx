import List from "app/components/shared/List/List"
import { capitalizeString } from "app/components/shared/Helpers/helpers"
import PersonDisplay from "app/components/shared/PersonDisplay/PersonDisplay"
import PersonRoleDisplay from "app/components/shared/PersonRoleDisplay/PersonRoleDisplay"
import { personRoleMap } from "app/components/case/CaseTimeline/helpers/dictionaries"

export default (summon?: Components.Schemas.Summon) => {

  if (summon === undefined) return

  const { persons, type_name } = summon

  const personRole = (person_role: Components.Schemas.PersonRoleEnum ) => 
    person_role ? (personRoleMap[person_role]).toLowerCase() : ""

  const personNames = persons.map(({ first_name, last_name, preposition, person_role }) => 
    <>
      <PersonDisplay
        firstName={ capitalizeString(first_name) }
        namePrefix={ preposition ?? undefined }
        name={ capitalizeString(last_name) }
      />
      {person_role && <PersonRoleDisplay personRole= { personRole(person_role) } /> }
    </>
  )

  const values = [
    ["Aanschrijving", type_name],
    ["Aangeschrevene(n)", <List items={ personNames } />]
  ]

  return Object.fromEntries(values)
}