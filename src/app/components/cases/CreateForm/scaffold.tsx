import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (bagId: Components.Schemas.Address["bag_id"], teams?: Components.Schemas.CaseTeam[], reasons?: Components.Schemas.CaseReason[]) => {

  console.log("reasons", reasons)
  const fields = {
    team: {
      type: "ComplexRadioFields",
      props: {
        label: "Team wonen",
        name: "team",
        options: teams,
        optionLabelField: "name",
        isRequired: true
      }
    },
    reason: {
      type: "ComplexRadioFields",
      props: {
        label: "Aanleiding",
        name: "reason",
        options: reasons,
        optionLabelField: "name",
        isRequired: true
      }
    },
    reporter_anonymous: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { reason } }: { values: { reason: Components.Schemas.CaseReason } }) => reason?.name === "Melding",
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
        shouldShow: ({ values: { reporter_anonymous } }: { values: { reporter_anonymous: string } }) => reporter_anonymous === "no",
        field: {
          type: "TextField",
          props: {
            label: "Naam melder",
            name: "reporter_name",
            isRequired: true
          }
        }
      }
    },
    reporter_phone: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { reporter_anonymous } }: { values: { reporter_anonymous: string } }) => reporter_anonymous === "no",
        field: {
          type: "NumberField",
          props: {
            label: "Telefoonnummer melder",
            name: "reporter_phone",
            isRequired: true,
            hideNumberSpinner: true
          }
        }
      }
    },
    identification: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { reason } }: { values: { reason: Components.Schemas.CaseReason } }) => reason?.name === "Melding",
        field: {
          type: "NumberField",
          props: {
            label: "SIA-nummer",
            extraLabel: <InfoButton infoTitle="SIA-nummer" infoText="Vermeld hier het corresponderende SIA-nummer, zodat de melding makkelijk terug te vindein is in SIA."></InfoButton>,
            name: "identification",
            isRequired: true,
            hideNumberSpinner: true
          }
        }
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "description",
        isRequired: true,
        rows: 7
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
      ["team", "team"],
      ["reason", "reason"],
      ["reporter_anonymous", "reporter_anonymous"],
      ["reporter_name", "reporter_phone"],
      ["identification", "identification"],
      ["description", "description"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}