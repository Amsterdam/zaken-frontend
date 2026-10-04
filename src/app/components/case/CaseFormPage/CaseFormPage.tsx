import { type ReactNode } from "react"
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
  useFormState,
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {
  ActionGroup,
  Button,
  Column,
  Grid,
  Heading,
  InvalidFormAlert,
} from "@amsterdam/design-system-react"
import { FormProvider, mapErrorsToAlert } from "@amsterdam/ee-ads-rhf"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import CaseSummary from "./CaseSummary"

type Props<T extends FieldValues> = {
  /** The case the form is about: "Annuleren" goes back to it. */
  id: components["schemas"]["CaseDetail"]["id"]
  title: string
  /** The react-hook-form form the fields (the children) belong to. */
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  submitText?: string
  /** While saving: the submit button is off and says so. */
  isPending?: boolean
  /** What the form is about besides the case, above the fields. */
  intro?: ReactNode
  /** The fields of the form (@amsterdam/ee-ads-rhf). */
  children: ReactNode
}

/**
 * The page of a form about a case: the title, and in a white area which case
 * it is about and the form (react-hook-form), with below the fields the button
 * that saves and "Annuleren". What is wrong after a try to save is listed
 * above the white area, with links to the fields, and said at each field.
 */
export function CaseFormPage<T extends FieldValues>({
  id,
  title,
  form,
  onSubmit,
  submitText = "Resultaat verwerken",
  isPending = false,
  intro,
  children,
}: Props<T>) {
  const navigate = useNavigate()
  const { errors } = useFormState({ control: form.control })
  const alertErrors = mapErrorsToAlert(errors)

  // The links of the alert point to "#<the id of the field>". With the
  // <base href="/"> of index.html the browser would take that as a link to the
  // start page and load it, so go to the field ourselves.
  const goToField = (event: React.MouseEvent<HTMLElement>) => {
    const link = (event.target as HTMLElement).closest("a")
    const fieldId = link?.getAttribute("href")?.split("#")[1]
    if (!fieldId) return
    event.preventDefault()
    document.getElementById(fieldId)?.focus()
  }

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>{title}</Heading>
      </Grid.Cell>
      {alertErrors.length > 0 && (
        <Grid.Cell span="all" appearance="transparent">
          <InvalidFormAlert
            errors={alertErrors}
            headingLevel={2}
            onClick={goToField}
          />
        </Grid.Cell>
      )}
      <Grid.Cell span="all">
        <Column gap="x-large">
          <CaseSummary id={id} />
          {intro}
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
                        onClick={() => navigate(`/zaken/${id}`)}
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

export default CaseFormPage
