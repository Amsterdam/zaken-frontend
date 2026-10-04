import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

/**
 * What every form about a case does after it is saved: back to the case, with
 * a message that it worked. (When saving fails the API's error is shown as a
 * message by the query client and the form stays.)
 */
export const useAfterCaseFormSubmit = (
  id: components["schemas"]["CaseDetail"]["id"],
) => {
  const navigateWithFlashMessage = useNavigateWithFlashMessage()

  return () =>
    navigateWithFlashMessage(
      "/zaken/:id",
      { id },
      "info",
      "Succes",
      "Het resultaat is verwerkt",
    )
}
