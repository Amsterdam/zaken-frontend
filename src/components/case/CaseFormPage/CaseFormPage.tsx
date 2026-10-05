import { type ReactNode } from "react"
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form"
import { useNavigate } from "react-router"
import { FormPage } from "@/components/FormPage/FormPage"
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
  /** What to know before filling in the form, above the white area. */
  intro?: ReactNode
  /** The fields of the form (@amsterdam/ee-ads-rhf). */
  children: ReactNode
}

/**
 * The page of a form about a case: a FormPage that says which case it is
 * about, and goes back to that case with "Annuleren".
 */
export function CaseFormPage<T extends FieldValues>({
  id,
  submitText = "Resultaat verwerken",
  ...formPage
}: Props<T>) {
  const navigate = useNavigate()

  return (
    <FormPage
      {...formPage}
      submitText={submitText}
      summary={<CaseSummary id={id} />}
      onCancel={() => navigate(`/zaken/${id}`)}
    />
  )
}

export default CaseFormPage
