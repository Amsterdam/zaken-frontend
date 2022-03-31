import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

const THEME_ID_SUBLET = 6

export default (
  bagId: Components.Schemas.Address["bag_id"],
  themeId: Components.Schemas.CaseTheme["id"],
  setTheme: (id?: Components.Schemas.CaseTheme["id"]) => void,
  themes: Components.Schemas.CaseTheme[] | undefined,
  reasons: Components.Schemas.CaseReason[],
  projects: Components.Schemas.CaseProject[],
  subjects: Components.Schemas.Subject[],
  advertisementOptions: Record<string, string>,
  cases: Components.Schemas.Case[],
  corporations: Components.Schemas.HousingCorporation[]
  ) => {

  const fields = {
    theme: {
      type: "ComplexRadioFields",
      props: {
        label: "Thema wonen",
        name: "theme",
        options: themes,
        optionLabelField: "name",
        isRequired: true,
        onChange: (index: string) => setTheme(themes?.[parseInt(index, 10)]?.id)
      }
    },
    housing_corporation: {
      type: "ShowHide",
      props: {
        shouldShow: () => themeId === THEME_ID_SUBLET && corporations.length > 0, // Sublet use only.
        field: {
          type: "ComplexSelectField",
          props: {
            label: "Welke corporatie is eigenaar van dit adres?",
            name: "housing_corporation",
            options: corporations,
            optionLabelField: "name",
            withEmptyOption: true,
            emptyOptionLabel: "Maak een keuze",
            isRequired: false
          }
        }
      }
    },
    reason: {
      type: "ShowHide",
      props: {
        shouldShow: () => themeId !== -1 || reasons.length > 0,
        field: {
          type: "ComplexRadioFields",
          props: {
            label: "Aanleiding",
            name: "reason",
            options: reasons,
            optionLabelField: "name",
            isRequired: true
          }
        }
      }
    },
    mma_number: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { reason?: Components.Schemas.CaseReason } }) => (
          formValues?.values?.reason?.name === "MMA"
        ),
        field: {
          type: "NumberField",
          props: {
            label: "MMA-nummer",
            name: "mma_number",
            placeholder: "123456",
            min: 1,
            step: 1,
            isRequired: true,
            hideNumberSpinner: true
          }
        }
      }
    },
    subjects: {
      type: "ShowHide",
      props: {
        shouldShow: () => themeId !== -1 || subjects.length > 0,
        field: {
          type: "ComplexCheckboxFields",
          props: {
            label: "Onderwerp(en)",
            name: "subjects",
            options: subjects,
            optionLabelField: "name",
            isRequired: true
          }
        }
      }
    },

    reporter_anonymous: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { reason?: Components.Schemas.CaseReason } }) => formValues?.values?.reason?.name === "SIA melding",
        field: {
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
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { reason?: Components.Schemas.CaseReason } }) => formValues?.values?.reason?.name === "SIA melding",
        field: {
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
        }
      }
    },
    description_citizenreport: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { reason?: Components.Schemas.CaseReason } }) => formValues?.values?.reason?.name === "SIA melding",
        field: {
          type: "TextAreaField",
          props: {
            label: "Korte samenvatting melding",
            name: "description_citizenreport",
            isRequired: true
          }
        }
      }
    },
    nuisance: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { reason?: Components.Schemas.CaseReason, theme?: Components.Schemas.CaseTheme } }) =>
        formValues?.values?.theme?.name === "Vakantieverhuur" && formValues?.values?.reason?.name === "SIA melding",
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
    project: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { reason?: Components.Schemas.CaseReason } }) => formValues?.values?.reason?.name === "Project",
        field: {
          type: "ComplexSelectField",
          props: {
            label: "Projectnaam",
            name: "project",
            options: projects,
            optionLabelField: "name",
            withEmptyOption: true,
            emptyOptionLabel: "Maak een keuze",
            isRequired: true
          }
        }
      }
    },
    advertisement: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { theme?: Components.Schemas.CaseTheme } }) =>
        formValues?.values?.theme?.name !== undefined && formValues?.values?.theme?.name !== "Kamerverhuur" && formValues?.values?.theme?.name !== "Ondermijning",
        field: {
          type: "RadioFields",
          props: {
            isRequired: true,
            name: "advertisement",
            label: "Is er een advertentie bekend?",
            options: advertisementOptions
          }
        }
      }
    },
    advertisements: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { advertisement: string } }) => formValues?.values?.advertisement === "yes",
        field: {
          type: "ArrayField",
          props: {
            label: "Link(s) naar de advertentie",
            name: "advertisements",
            isRequired: true,
            allowAdd: true,
            allowRemove: true,
            minItems: 1,
            scaffoldFields: {
              link: {
                type: "TextField",
                props: {
                  placeholder: "Link naar de advertentie",
                  name: "link",
                  hint: "Vul hier de volledige url in, inclusief http(s)://",
                  isRequired: true
                }
              }
            }
          }
        }
      }
    },
    otherTheme: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { theme?: Components.Schemas.CaseTheme } }) => formValues?.values?.theme !== undefined,
        field: {
          type: "CheckboxFields",
          props: {
            label: "Overgedragen vanuit ander thema",
            name: "otherTheme",
            options: {
              otherTheme: "Ja"
            }
          }
        }
      }
    },
    previous_case: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { otherTheme?: any } }) => (
          formValues?.values?.otherTheme?.includes("otherTheme")
        ),
        field: {
          type: "ComplexSelectField",
          props: {
            label: "Overgedragen zaak ID",
            name: "previous_case",
            options: cases,
            optionLabelField: "id",
            withEmptyOption: true,
            emptyOptionLabel: "Maak een keuze",
            isRequired: true
          }
        }
      }
    },
    description: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { theme?: Components.Schemas.CaseTheme } }) => formValues?.values?.theme !== undefined,
        field: {
          type: "TextAreaField",
          props: {
            label: "Korte toelichting",
            name: "description",
            extraLabel: "(Niet verplicht)"
          }
        }
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigateTo(`/adres/${ bagId }`)
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Zaak aanmaken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["theme", "theme"],
      ["housing_corporation", "housing_corporation"],
      ["reason", "reason"],
      ["reporter_anonymous", "reporter_anonymous"],
      ["reporter_name"],
      ["reporter_phone"],
      ["reporter_email"],
      ["identification"],
      ["description_citizenreport", "description_citizenreport"],
      ["nuisance"],
      ["project"],
      ["mma_number"],
      ["advertisement", "advertisement"],
      ["advertisements", "advertisements"],
      ["subjects", "subjects"],
      ["otherTheme", "otherTheme"],
      ["previous_case"],
      ["description", "description"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}
