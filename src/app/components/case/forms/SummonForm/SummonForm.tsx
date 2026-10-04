import { useFieldArray, useForm, useWatch } from "react-hook-form"
import {
  Button,
  Column,
  FieldSet,
  OrderedList,
  Paragraph,
} from "@amsterdam/design-system-react"
import { PlusIcon, DeleteIcon } from "@amsterdam/design-system-react-icons"
import {
  RadioControl,
  SelectControl,
  TextAreaControl,
  TextInputControl,
} from "@amsterdam/ee-ads-rhf"
import { useCreateSummon, useSummonTypesByTaskId } from "@/api/hooks"
import { PERSON_ROLE_MAP } from "@/components/CaseEventTimeline/utils/renderValue.formatters"
import { HelpDialog } from "@/components/HelpDialog/HelpDialog"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"
import {
  BOARD,
  emptyPerson,
  LEGAL,
  NATURAL,
  PERSON,
  type SummonFormValues as FormValues,
  toSummonedPersons,
} from "./summonPersons"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

// A summon is addressed to at most two natural persons.
const MAX_PERSONS = 2
// How wide a field is, in characters: as wide as what is filled in there.
const NAME_SIZE = 30
const PREPOSITION_SIZE = 10
const NUMBER_SIZE = 5
// The type of summon that closes accommodations.
const CLOSING = "sluiting"

const roleOptions = (without: string[]) => [
  { label: "Kies een rol", value: "" },
  ...Object.entries(PERSON_ROLE_MAP)
    .filter(([key]) => !without.includes(key))
    .map(([key, label]) => ({ label, value: key })),
]
const personRoles = roleOptions(["PERSON_ROLE_PLATFORM"])
const legalEntityRoles = roleOptions([
  "PERSON_ROLE_HEIR",
  "PERSON_ROLE_RESIDENT",
])

/**
 * The page to say which summon was sent on a case, and to whom: one or two
 * natural persons, or a legal entity (its board or one person of it).
 */
const SummonForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: types } = useSummonTypesByTaskId(caseUserTaskId)
  const { mutateAsync: createSummon, isPending } = useCreateSummon(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: {
      type: "",
      number_of_accommodations: "",
      entity_type: "",
      persons: [emptyPerson],
      legal_entity_name: "",
      legal_entity_role: "",
      legal_entity_type: "",
      legal_person: { first_name: "", preposition: "", last_name: "" },
      description: "",
    },
  })
  const persons = useFieldArray({ control: form.control, name: "persons" })
  const [typeId, entityType, legalEntityType] = useWatch({
    control: form.control,
    name: ["type", "entity_type", "legal_entity_type"],
  })
  const isClosing =
    types?.results?.find(({ id }) => String(id) === typeId)?.workflow_option ===
    CLOSING

  const onSubmit = async (values: FormValues) => {
    try {
      await createSummon({
        case: id,
        case_user_task_id: caseUserTaskId,
        type: Number(values.type),
        persons: toSummonedPersons(values),
        ...(isClosing && {
          type_result: {
            number_of_accommodations: Number(values.number_of_accommodations),
          },
        }),
        // Without an explanation the field is left out, as before.
        ...(values.description.trim() !== "" && {
          description: values.description,
        }),
      })
    } catch {
      // The error is shown as a message at the top of the page; the form stays.
      return
    }
    afterSubmit()
  }

  return (
    <CaseFormPage
      id={id}
      title="Resultaat aanschrijving"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      intro={
        <Paragraph>
          Meld welke aanschrijving is opgesteld en voor wie. Doe dit nadat de
          brief daadwerkelijk verstuurd is.
        </Paragraph>
      }
    >
      <SelectControl<FormValues>
        name="type"
        label="Welke aanschrijving is opgesteld?"
        options={[
          { label: "Maak een keuze", value: "" },
          ...(types?.results ?? []).map(({ id, name }) => ({
            label: name,
            value: String(id),
          })),
        ]}
        registerOptions={{ required: "Kies een aanschrijving." }}
      />
      <HelpDialog label="Meerdere aanschrijvingen?">
        <OrderedList>
          <OrderedList.Item>Verwerk eerst deze aanschrijving.</OrderedList.Item>
          <OrderedList.Item>
            Kies daarna bij “Taak opvoeren” op de zaakpagina “Opstellen concept
            aanschrijving”.
          </OrderedList.Item>
          <OrderedList.Item>
            Vul het formulier in en rond af met de knop “Resultaat verwerken”.
          </OrderedList.Item>
          <OrderedList.Item>
            Herhaal dit per opgestelde aanschrijving.
          </OrderedList.Item>
        </OrderedList>
      </HelpDialog>
      {isClosing && (
        <TextInputControl<FormValues>
          name="number_of_accommodations"
          label="Aantal gesloten logiesverblijven"
          size={NUMBER_SIZE}
          // The keyboard for numbers.
          attributes={{ inputMode: "numeric" }}
          registerOptions={{
            required: "Vul het aantal gesloten logiesverblijven in.",
            pattern: {
              value: /^\s*\d+\s*$/,
              message: "Vul het aantal in als een heel getal.",
            },
          }}
        />
      )}
      <RadioControl<FormValues>
        name="entity_type"
        label="Aan wie is de aanschrijving gericht?"
        options={[
          { label: "Natuurlijk persoon", value: NATURAL },
          { label: "Rechtspersoon", value: LEGAL },
        ]}
        registerOptions={{
          required: "Kies aan wie de aanschrijving gericht is.",
        }}
      />

      {entityType === NATURAL && (
        <>
          {persons.fields.map((person, index) => {
            const number = index + 1
            return (
              <FieldSet
                key={person.id}
                legend={`Aangeschreven persoon ${number}`}
              >
                <Column>
                  <TextInputControl<FormValues>
                    name={`persons.${index}.first_name`}
                    label="Voornaam"
                    size={NAME_SIZE}
                    registerOptions={{
                      required: `Vul de voornaam van persoon ${number} in.`,
                    }}
                    inFieldSet
                  />
                  <TextInputControl<FormValues>
                    name={`persons.${index}.preposition`}
                    label="Tussenvoegsel"
                    size={PREPOSITION_SIZE}
                    inFieldSet
                  />
                  <TextInputControl<FormValues>
                    name={`persons.${index}.last_name`}
                    label="Achternaam"
                    size={NAME_SIZE}
                    registerOptions={{
                      required: `Vul de achternaam van persoon ${number} in.`,
                    }}
                    inFieldSet
                  />
                  <SelectControl<FormValues>
                    name={`persons.${index}.person_role`}
                    label="Rol"
                    options={personRoles}
                    registerOptions={{
                      required: `Kies de rol van persoon ${number}.`,
                    }}
                    inFieldSet
                  />
                  {persons.fields.length > 1 && (
                    <div>
                      <Button
                        type="button"
                        variant="secondary"
                        icon={DeleteIcon}
                        iconBefore
                        onClick={() => persons.remove(index)}
                      >
                        Persoon {number} verwijderen
                      </Button>
                    </div>
                  )}
                </Column>
              </FieldSet>
            )
          })}
          {persons.fields.length < MAX_PERSONS && (
            <div>
              <Button
                type="button"
                variant="secondary"
                icon={PlusIcon}
                iconBefore
                onClick={() => persons.append(emptyPerson)}
              >
                Persoon toevoegen
              </Button>
            </div>
          )}
        </>
      )}

      {entityType === LEGAL && (
        <>
          <TextInputControl<FormValues>
            name="legal_entity_name"
            label="Aangeschreven rechtspersoon"
            description="De naam van het bedrijf."
            registerOptions={{
              required: "Vul de naam van de rechtspersoon in.",
            }}
          />
          <SelectControl<FormValues>
            name="legal_entity_role"
            label="Rol"
            options={legalEntityRoles}
            registerOptions={{ required: "Kies de rol van de rechtspersoon." }}
          />
          <RadioControl<FormValues>
            name="legal_entity_type"
            label="Gericht aan"
            options={[
              { label: "Aan bestuur", value: BOARD },
              { label: "Aan persoon", value: PERSON },
            ]}
            registerOptions={{
              required:
                "Kies of de aanschrijving aan het bestuur of een persoon is.",
            }}
          />
          {legalEntityType === PERSON && (
            <FieldSet legend="Aangeschreven persoon">
              <Column>
                <TextInputControl<FormValues>
                  name="legal_person.first_name"
                  label="Voornaam"
                  size={NAME_SIZE}
                  registerOptions={{ required: "Vul de voornaam in." }}
                  inFieldSet
                />
                <TextInputControl<FormValues>
                  name="legal_person.preposition"
                  label="Tussenvoegsel"
                  size={PREPOSITION_SIZE}
                  inFieldSet
                />
                <TextInputControl<FormValues>
                  name="legal_person.last_name"
                  label="Achternaam"
                  size={NAME_SIZE}
                  registerOptions={{ required: "Vul de achternaam in." }}
                  inFieldSet
                />
              </Column>
            </FieldSet>
          )}
        </>
      )}

      <TextAreaControl<FormValues>
        name="description"
        label="Korte toelichting"
        rows={4}
      />
    </CaseFormPage>
  )
}

export default SummonForm
