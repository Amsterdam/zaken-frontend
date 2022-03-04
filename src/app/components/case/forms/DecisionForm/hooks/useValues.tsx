import { List, PersonNameDisplay, PersonRoleDisplay, PersonEntityDisplay } from "@amsterdam/wonen-ui"

export default (summon?: Components.Schemas.Summon) => {

  if (summon === undefined) return

  const { persons, type_name } = summon

  const personNames = persons.map(({ first_name, last_name, preposition, person_role, function: person_function, entity_name }) =>
    <>
      { last_name && <PersonNameDisplay firstName={first_name} namePrefix={preposition ?? undefined} name={last_name} /> }
      { last_name && (person_function || entity_name) && <span>, </span> }
      <PersonEntityDisplay personFunction={person_function} entityName={entity_name} />
      { person_role && <>
        <span> (</span>
          <PersonRoleDisplay personRole={person_role} />
        <span>)</span>
      </> }
    </>
  )

  const values = [
    ["Aanschrijving", type_name],
    ["Aangeschrevene(n)", <List data={ personNames } />]
  ]

  return Object.fromEntries(values)
}