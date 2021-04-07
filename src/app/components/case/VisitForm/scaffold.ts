import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

const scaffold = (caseId: Components.Schemas.Case["id"], authors: Components.Schemas.User[]) => {

  const fields = {
    author1: {
      type: "ComplexSelectField",
      props: {
        withEmptyOption: true,
        name: "author1",
        label: "Toezichthouder 1",
        optionLabelField: "full_name",
        options: authors
      }
    },
    author2: {
      type: "ComplexSelectField",
      props: {
        withEmptyOption: true,
        name: "author2",
        label: "Toezichthouder 2",
        optionLabelField: "full_name",
        options: authors
      }
    },
    time: {
      type: "CurrentTime",
      props: {
        name: "start_time",
        label: "Starttijd onderzoek",
        pattern: "2[0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
        title: "2021-12-30T12:34"
      }
    },
    status: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "situation",
        label: "Welke situatie is van toepassing?",
        options: {
          nobody_present: "Niemand aanwezig",
          no_cooperation: "Geen medewerking",
          access_granted: "Toegang verleend"
        }
      }
    },
    observations: {
      type: "CheckboxFields",
      props: {
        name: "observations",
        label: "Opvallende zaken (niet verplicht)",
        options: {
          malfunctioning_doorbell: "Bel functioneert niet",
          intercom: "Contact via intercom",
          hotel_furnished: "Hotelmatig ingericht",
          vacant: "Leegstand",
          likely_inhabited: "Vermoedelijk bewoond"
        }
      }
    },
    suggest_next_visit: {
      type: "RadioFields",
      props: {
        name: "suggest_next_visit",
        label: "Suggestie nieuw bezoek",
        options: {
          daytime: "Overdag",
          weekend: "Weekend",
          evening: "'s Avonds",
          unknown: "Niet meer uitzetten"
        }
      }
    },
    suggest_next_visit_description: {
      type: "TextAreaField",
      props: {
        label: "Geef toelichting (niet verplicht)",
        name: "suggest_next_visit_description"
      }
    },
    next_visit: {
      type: "RadioFields",
      props: {
        name: "can_next_visit_go_ahead",
        label: "Kan het adres direct worden uitgezet?",
        options: {
          yes: "Ja, doorlaten",
          no: "Nee, tegenhouden"
        }
      }
    },
    next_visit_description: {
      type: "TextAreaField",
      props: {
        name: "can_next_visit_go_ahead_description",
        label: "Geef toelichting (niet verplicht)"
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        isRequired: false,
        name: "notes",
        label: "Opmerkingen"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Toevoegen",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["author1", "author1"],
      ["author2", "author2"],
      ["time", "time"],
      ["status", "status"],
      ["observations", "observations"],
      ["next_visit", "next_visit"],
      ["next_visit_description", "next_visit_description"],
      ["suggest_next_visit", "suggest_next_visit"],
      ["suggest_next_visit_description", "suggest_next_visit_description"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .setGrid("laptop", "1fr 1fr", [
      ["author1", "author2"],
      ["time", "time"],
      ["status", "status"],
      ["observations", "observations"],
      ["next_visit", "next_visit_description"],
      ["suggest_next_visit", "suggest_next_visit_description"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

export default scaffold
