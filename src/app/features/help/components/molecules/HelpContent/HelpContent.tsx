import React from "react"
import { Heading, Paragraph } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/"
import EmailLink from "./EmailLink"
import PhoneLink from "./PhoneLink"

const EMPLOYEES = [
  { name: "E. Mployee", phoneNumber: "06-12345678" },
  { name: "E.M. Ployee", phoneNumber: "06-23456789" },
  { name: "E.M.P Loyee", phoneNumber: "06-34567890", email: "test@example.com" }
]

const HelpContent: React.FC = () => (
  <>
    <RowWithColumn>
      <Heading as="h2">Technisch support</Heading>
      <Paragraph>
      Werk het zaaksysteem niet (goed)? Probeer de pagina opnieuw te laden door op het refresh icoon te klikken (icoon tonen).<br/>
      Werkt het zaaksysteeem dan nog steeds niet, neem dan contact op met:
      <ul>
        <li>Tijdens kantooruren ontwikkelteam Zaaksysteem, { EMPLOYEES[0].name } <PhoneLink phoneNumber={ EMPLOYEES[0].phoneNumber } /></li>
        <li>Buiten kantoortijden Datapunt, { EMPLOYEES[1].name } <PhoneLink phoneNumber={ EMPLOYEES[1].phoneNumber } /></li>
      </ul>
      </Paragraph>
    </RowWithColumn>
    <RowWithColumn>
      <Heading as="h2">Vraag een demo aan</Heading>
      <Paragraph>
      Ben je nieuw met het systeem, loop je ergens tegen aan of wil je gewoon graag persoonlijke uitleg over het zaaksysteem? Neem contact op met { EMPLOYEES[2].name }
      <ul>
        <li>Telefonisch: te bereiken tijdens kantooruren op ma, di, wo en do op <PhoneLink phoneNumber={ EMPLOYEES[2].phoneNumber } /></li>
        <li>Per e-mail: <EmailLink email={ EMPLOYEES[2].email! } /></li>
      </ul>
      Ook voor goede ideeën en suggesties <span role="img">🙂</span>
      </Paragraph>
    </RowWithColumn>
  </>
)
export default HelpContent
