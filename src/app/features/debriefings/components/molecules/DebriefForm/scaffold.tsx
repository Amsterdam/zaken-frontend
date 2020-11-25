import React from "react"
import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { navigate } from "@reach/router"
import InfoButton from "app/features/shared/components/molecules/InfoHeading/InfoButton"

const Scaffold = (caseId: Components.Schemas.Case["id"], isEditing = false) => {
  const helpTextViolation = <>
    <ol>
      <li><b>Nader onderzoek nodig</b>
        <ul>
          <li>Iets uitzoeken wat niet op de locatie zelf is. Bijv. advies van de teamleider of jurist.</li>
          <li>Verwerk de uitkomst vervolgens in een nieuwe debriefnotitie.</li>
        </ul>
        <br/><br/>
      </li>
      <li><b>Aanvullend huisbezoek nodig</b>
        <ul>
          <li>Nader onderzoek nodig op het adres zelf door de toezichthouders.</li>
          <li>Zet dit bezoek uit via de projectmedewerker.</li>
          <li>Vermeldt waar specifiek op gelet moet worden.</li>
          <br/><br/>
        </ul>
      </li>
    </ol>
  </>
  const fields = {
    violation: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Is er sprake van een overtreding?",
        extraLabel: <InfoButton infoTitle="Niet duidelijk of er een overtreding is? Twee opties:" infoText={helpTextViolation}></InfoButton>,
        name: "violation",
        options: {
          "YES": "Ja, overtreding",
          "NO": "Nee, geen overtreding",
          "ADDITIONAL_RESEARCH_REQUIRED": "Nader onderzoek nodig",
          "ADDITIONAL_VISIT_REQUIRED": "Nieuw huisbezoek nodig"
        }
      }
    },
    feedback: {
      type: "TextAreaField",
      props: {
        isRequired: true,
        name: "feedback",
        label: "Korte toelichting"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: isEditing ? "Terugkoppeling wijzigen" : "Terugkoppeling toevoegen"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: () => navigate(`/cases/${ caseId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr 1fr", [
      ["violation", "violation"],
      ["feedback", "feedback"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

export default Scaffold
