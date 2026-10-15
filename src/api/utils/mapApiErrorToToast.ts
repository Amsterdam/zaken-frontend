import type { ApiError } from "@/api/types/apiError"
import type { ToastMessage } from "@/components/toasts/types"

/**
 * What the toast says for an error of the API (texts from top-frontend-v2):
 * short and the same for every request, without the url or the technical
 * message.
 */
export function mapApiErrorToToast(error: ApiError): Omit<ToastMessage, "id"> {
  switch (error.status) {
    case 403:
      return {
        title: "Toegang geweigerd!",
        description:
          "Helaas, je hebt geen toestemming voor deze actie. Neem contact op als je denkt dat dit onterecht is!",
        severity: "error",
      }

    case 404:
      return {
        title: "Niet gevonden!",
        description:
          "Deze pagina of gegevens bestaan (niet meer). Misschien is het verplaatst of verwijderd?",
        severity: "error",
      }

    default:
      return {
        title: "Oeps, iets ging mis!",
        description:
          "Er is een onverwachte fout opgetreden. Probeer het later opnieuw of neem contact met ons op.",
        severity: "error",
      }
  }
}
