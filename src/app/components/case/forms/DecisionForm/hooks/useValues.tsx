import List from "app/components/shared/Helpers/MapArrayToList"
import { capitalizeString } from "app/components/shared/Helpers/helpers"

export default (summon?: Components.Schemas.Summon) => {

  if (summon === undefined) return

  const { persons, type_name } = summon
  // TODO: Use PersonDisplay component
  const personNames = persons.map(({ first_name, last_name, preposition }) =>
    `${ capitalizeString(first_name) } ${ preposition ?? "" } ${ capitalizeString(last_name) }`
  )

  const values = [
    ["Aanschrijving", type_name],
    ["Aangeschrevene(n)", <List items={ personNames } />]
  ]

  return Object.fromEntries(values)
}