import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/toasts/useToast"

/**
 * What every form about a case does after it is saved: back to the case, with
 * a toast that it worked. (When saving fails the API's error is shown as a
 * message by the query client and the form stays.)
 */
export const useAfterCaseFormSubmit = (
  id: components["schemas"]["CaseDetail"]["id"],
) => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  return () => {
    showToast({
      severity: "success",
      title: "Opgeslagen",
      description: "Het resultaat is verwerkt.",
    })
    navigate(`/zaken/${id}`)
  }
}
