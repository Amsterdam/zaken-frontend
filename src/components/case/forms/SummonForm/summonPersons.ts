type PersonRole = components["schemas"]["PersonRoleEnum"]

/** A person as filled in: a name and (for a natural person) a role. */
export type PersonValues = {
  first_name: string
  preposition: string
  last_name: string
  person_role: string
}

export type SummonFormValues = {
  type: string
  number_of_accommodations: string
  entity_type: "" | typeof NATURAL | typeof LEGAL
  /** A natural person: one or two persons, each with a role. */
  persons: PersonValues[]
  /** A legal entity: its name and role, and who the summon is addressed to. */
  legal_entity_name: string
  legal_entity_role: string
  legal_entity_type: "" | typeof BOARD | typeof PERSON
  legal_person: Omit<PersonValues, "person_role">
  description: string
}

/** A person as the backend takes it. */
export type SummonedPerson = Omit<
  components["schemas"]["SummonedPerson"],
  "id" | "summon"
>

export const NATURAL = "natural"
export const LEGAL = "legal"
export const BOARD = "board"
export const PERSON = "person"

export const emptyPerson: PersonValues = {
  first_name: "",
  preposition: "",
  last_name: "",
  person_role: "",
}

const toName = ({
  first_name,
  preposition,
  last_name,
}: Omit<PersonValues, "person_role">) => ({
  first_name: first_name.trim(),
  // Without a preposition the field is left out.
  ...(preposition.trim() !== "" && { preposition: preposition.trim() }),
  last_name: last_name.trim(),
})

/** Who the summon is addressed to, as the persons the backend takes. */
export const toSummonedPersons = (
  values: SummonFormValues,
): SummonedPerson[] => {
  if (values.entity_type === LEGAL) {
    const legalEntity = {
      person_role: values.legal_entity_role as PersonRole,
      entity_name: values.legal_entity_name.trim(),
    }
    // To the board of the legal entity, or to one person of it.
    return values.legal_entity_type === BOARD
      ? [{ ...legalEntity, function: "Bestuur" }]
      : [{ ...toName(values.legal_person), ...legalEntity }]
  }

  return values.persons.map((person) => ({
    ...toName(person),
    person_role: person.person_role as PersonRole,
  }))
}
