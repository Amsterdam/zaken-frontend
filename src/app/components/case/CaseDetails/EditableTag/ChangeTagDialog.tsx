import { useForm } from "react-hook-form"
import { SelectControl } from "@amsterdam/ee-ads-rhf"
import { useTags, useUpdateCase } from "@/api/hooks"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"

type Props = {
  case: components["schemas"]["CaseCreate"]
  onClose: () => void
}

type FormValues = { tag: string }

// A case has one tag or none.
const NO_TAG = "none"

/** Changes the tag of a case, in a dialog. Render it while it is open. */
const ChangeTagDialog: React.FC<Props> = ({ case: caseItem, onClose }) => {
  const { data } = useTags(caseItem.theme.id)
  const { mutateAsync: updateCase, isPending } = useUpdateCase(caseItem.id)
  const { showToast } = useToast()
  const form = useForm<FormValues>({
    defaultValues: {
      tag: caseItem.tags.length > 0 ? String(caseItem.tags[0].id) : NO_TAG,
    },
  })

  const onSubmit = async ({ tag }: FormValues) => {
    try {
      await updateCase({ tag_ids: tag === NO_TAG ? [] : [Number(tag)] })
    } catch {
      // The error is shown as a message at the top of the page; the dialog stays.
      return
    }
    const name = data?.results?.find(({ id }) => String(id) === tag)?.name
    showToast({
      severity: "success",
      title: "Tag gewijzigd",
      description: name ? (
        <>
          De zaak heeft nu de tag <strong>{name}</strong>.
        </>
      ) : (
        "De zaak heeft geen tag meer."
      ),
    })
    onClose()
  }

  return (
    <FormDialog
      heading="Tag wijzigen"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      onClose={onClose}
    >
      <SelectControl<FormValues>
        // Once the tags are there the field starts anew, so it shows the
        // current tag: a select cannot choose an option it does not have yet.
        key={data ? "loaded" : "loading"}
        name="tag"
        label="Welke tag past bij deze zaak?"
        options={[
          { label: "Geen tag", value: NO_TAG },
          ...(data?.results ?? []).map(({ id, name }) => ({
            label: name,
            value: String(id),
          })),
        ]}
        registerOptions={{ required: "Kies een tag." }}
        // The dialog has its own heading: the question is no second one.
        inFieldSet
      />
    </FormDialog>
  )
}

export default ChangeTagDialog
