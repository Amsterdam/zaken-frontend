import { themeSpacing } from "@amsterdam/asc-ui"
import React from "react"
import styled from "styled-components"

const Ul = styled.ul`
  margin-bottom: ${ themeSpacing(6) }
`
export const helpTextViolation = 
  <ol>
    <li>
      <b>Nader onderzoek nodig</b>
      <Ul>
        <li>Nader onderzoek nodig wat niet op de locatie zelf is. Bijv. advies van de teamleider of jurist.</li>
        <li>Verwerk de uitkomst vervolgens in een nieuwe debriefnotitie.</li>
      </Ul>
    </li>
    <li>
      <b>Aanvullend huisbezoek nodig</b>
      <Ul>
        <li>Nader onderzoek nodig op het adres zelf door de toezichthouders.</li>
        <li>Zet dit bezoek uit via de projectmedewerker.</li>
        <li>Vermeldt waar specifiek op gelet moet worden.</li>
      </Ul>
    </li>
  </ol>