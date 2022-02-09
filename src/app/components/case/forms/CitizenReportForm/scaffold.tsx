import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (
  caseId: Components.Schemas.Case["id"],
  themeName: Components.Schemas.CaseTheme["name"]
  ) => {


  const fields = {
    reporter_anonymous: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "reporter_anonymous",
        label: "Is de melder anoniem?",
        options: {
          yes: "Ja, de melder is anoniem",
          no: "Nee, de melder is niet anoniem"
        }
      }
    },
    reporter_name: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?:  { reporter_anonymous: string } }) => formValues?.values?.reporter_anonymous === "no",
        field: {
          type: "TextField",
          props: {
            label: "Naam melder",
            extraLabel: "(indien bekend)",
            name: "reporter_name"
          }
        }
      }
    },
    reporter_phone: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?:  { reporter_anonymous: string } }) => formValues?.values?.reporter_anonymous === "no",
        field: {
          type: "TelField",
          props: {
            label: "Telefoonnummer melder",
            extraLabel: "(indien bekend)",
            name: "reporter_phone",
            hint: "Vul hier alleen cijfers in",
            validate: (value: string | undefined) => (value === undefined || /^[0-9]{10}$/.test(value.trim())) ? false : "Vul hier enkel 10 cijfers in"
          }
        }
      }
    },
    reporter_email: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?:  { reporter_anonymous: string } }) => formValues?.values?.reporter_anonymous === "no",
        field: {
          type: "EmailField",
          props: {
            label: "E-mailadres melder",
            extraLabel: "(indien bekend)",
            name: "reporter_email"
          }
        }
      }
    },
    identification: {
      type: "NumberField",
      props: {
        label: "SIA-nummer",
        extraLabel: <InfoButton infoTitle="SIA-nummer" infoText="Vermeld hier het corresponderende SIA-nummer, zodat de melding makkelijk terug te vinden is in SIA."></InfoButton>,
        name: "identification",
        placeholder: "123456",
        min: 1,
        step: 1,
        isRequired: true,
        hideNumberSpinner: true
      }
    },
    description_citizenreport: {
      type: "TextAreaField",
      props: {
        label: "Korte samenvatting melding",
        extraLabel: <InfoButton infoTitle="Korte samenvatting melding" infoText="Geef een korte beschrijving van de melding. Deze informatie komt ook door in TOP voor de toezichthouder."></InfoButton>,
        name: "description_citizenreport",
        isRequired: true
      }
    },
    nuisance: {
      type: "ShowHide",
      props: {
        shouldShow: (() => themeName === "Vakantieverhuur" ),
        field: {
          type: "CheckboxFields",
          props: {
            label: "Betreft overlast",
            name: "nuisance",
            extraLabel: <InfoButton infoTitle="Betreft overlast" infoText="Aanvinken indien in de melding sprake is van overlast zoals geluid, lawaai, stank en vuil overlast."></InfoButton>,
            options: {
              nuisance: "Ja"
            }
          }
        }
      }
    },
    advertisement: {
      type: "ShowHide",
      props: {
        shouldShow: (() => themeName !== "Kamerverhuur" && themeName !== "Ondermijning"),
        field: {
          type: "RadioFields",
          props: {
            isRequired: true,
            name: "advertisement",
            label: "Is er een advertentie bekend?",
            options: {
              yes: "Ja, er is een advertentie",
              no: "Nee, er is geen advertentie"
            }
          }
        }
      }
    },
    advertisement_linklist: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { advertisement: string } }) => formValues?.values?.advertisement === "yes",
        field: {
          type: "ArrayField",
          props: {
            label: "Link(s) naar de advertentie",
            name: "advertisement_linklist",
            isRequired: true,
            allowAdd: true,
            allowRemove: true,
            minItems: 1,
            scaffoldFields: {
              advertisement_link: {
                type: "TextField",
                props: {
                  placeholder: "Link naar de advertentie",
                  name: "advertisement_link",
                  hint: "Vul hier de volledige url in, inclusief http(s)://",
                  isRequired: true
                }
              }
            }
          }
        }
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["reporter_anonymous", "reporter_anonymous"],
      ["reporter_name"],
      ["reporter_phone"],
      ["reporter_email"],
      ["identification"],
      ["description_citizenreport", "description_citizenreport"],
      ["nuisance"],
      ["advertisement", "advertisement"],
      ["advertisement_linklist", "advertisement_linklist"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}

