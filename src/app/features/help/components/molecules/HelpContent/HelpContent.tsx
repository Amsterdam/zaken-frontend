import React from "react"
import { Heading } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/"

const EMPLOYEES = [
  { name: "E. Mployee 1", phone: "06-12345678" },
  { name: "E. Mployee 2", phone: "06-23456789" },
  { name: "E. Mployee 3", phone: "06-34567890", email: "test@example.com" }
]

const HelpContent: React.FC = () => (
  <>
    <RowWithColumn>
      <Heading as="h2">Technisch support</Heading>
      <p>
      Werk het zaaksysteem niet (goed)? Probeer de pagina opnieuw te laden door op het refresh icoon te klikken (icoon tonen).<br/>
      Werkt het zaaksysteeem dan nog steeds niet, neem dan contact op met:
      </p>
      <ul>
        <li>Tijdens kantooruren ontwikkelteam Zaaksysteem, { EMPLOYEES[0].name } { EMPLOYEES[0].phone }</li>
        <li>Buiten kantoortijden Datapunt, { EMPLOYEES[1].name } { EMPLOYEES[1].phone }</li>
      </ul>
    </RowWithColumn>
    <RowWithColumn>
      <Heading as="h2">Vraag een demo aan</Heading>
      <p>
      Ben je nieuw met het systeem, loop je ergens tegen aan of wil je gewoon graag persoonlijke uitleg over het zaaksysteem? Neem contact op met { EMPLOYEES[2].name }
      </p>
      <ul>
        <li>Telefonisch: te bereiken tijdens kantooruren op ma, di, wo en do op { EMPLOYEES[2].phone }</li>
        <li>Per e-mail: { EMPLOYEES[2].email }</li>
      </ul>
      <p>Ook voor goede ideeën en suggesties <span role="img">🙂</span></p>
    </RowWithColumn>
  </>
)
export default HelpContent
