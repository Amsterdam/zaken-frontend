import { type ReactNode } from "react"
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
  useFormState,
} from "react-hook-form"
import {
  ActionGroup,
  Button,
  Column,
  Grid,
  Heading,
  InvalidFormAlert,
} from "@amsterdam/design-system-react"
import { FormProvider } from "@amsterdam/ee-ads-rhf"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { mapErrorsToAlert } from "@/shared/mapErrorsToAlert"

type Props<T extends FieldValues> = {
  title: string
  /** The react-hook-form form the fields (the children) belong to. */
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  submitText: string
  /** While saving: the submit button is off and says so. */
  isPending?: boolean
  /** Where "Annuleren" goes. */
  onCancel: () => void
  /** What to know before filling in the form, above the white area. */
  intro?: ReactNode
  /** What the form is about (e.g. which case), at the top of the white area. */
  summary?: ReactNode
  /** The fields of the form (@amsterdam/ee-ads-rhf). */
  children: ReactNode
}

/**
 * The page of a form: the title, and in a white area what the form is about
 * and the form (react-hook-form), with below the fields the button that saves
 * and "Annuleren". What is wrong after a try to save is listed above the
 * white area, with links to the fields, and said at each field.
 */
export function FormPage<T extends FieldValues>({
  title,
  form,
  onSubmit,
  submitText,
  isPending = false,
  onCancel,
  intro,
  summary,
  children,
}: Props<T>) {
  const { errors } = useFormState({ control: form.control })
  const alertErrors = mapErrorsToAlert(errors)

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>{title}</Heading>
      </Grid.Cell>
      {intro && (
        <Grid.Cell span="all" appearance="transparent">
          {intro}
        </Grid.Cell>
      )}
      {alertErrors.length > 0 && (
        <Grid.Cell span="all" appearance="transparent">
          <InvalidFormAlert errors={alertErrors} headingLevel={2} />
        </Grid.Cell>
      )}
      <Grid.Cell span="all">
        <Column gap="x-large">
          {summary}
          <FormProvider form={form} onSubmit={onSubmit}>
            {/* The fields are narrower than the white area they are in. */}
            <Grid className="grid-in-cell">
              <Grid.Cell
                span={{ narrow: 4, medium: 6, wide: 6 }}
                appearance="transparent"
              >
                <Column gap="large">
                  {children}
                  {/* In a block of its own, or the column stretches the buttons. */}
                  <div>
                    <ActionGroup>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Bezig met opslaan…" : submitText}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                      >
                        Annuleren
                      </Button>
                    </ActionGroup>
                  </div>
                </Column>
              </Grid.Cell>
            </Grid>
          </FormProvider>
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default FormPage
