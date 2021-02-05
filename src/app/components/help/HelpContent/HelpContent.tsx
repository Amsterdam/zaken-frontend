import React, { useMemo } from "react"
import { Heading, Paragraph, Spinner } from "@amsterdam/asc-ui"

import { RowWithColumn } from "app/components/shared/components/atoms/Grid"
import EmailLink from "./EmailLink"
import PhoneLink from "./PhoneLink"

import { useSupportContacts } from "app/state/rest/"
import { Refresh } from "app/components/shared/components/atoms/Icons"
import styled from "styled-components"

const showOptionalProperty = (prop: string | undefined) => prop ?? "(onbekend)"

const mapData = (data: Components.Schemas.PaginatedSupportContactList | undefined) => ([
  data?.results?.find(({ title }) => title === "Coördinator Ontwikkelkamer"),
  data?.results?.find(({ title }) => title === "ICT Beheerder Team Basis"),
  data?.results?.find(({ title }) => title === "UX Designer")
])

const RefreshIcon = styled (Refresh)`
  vertical-align: text-top;
`

const HelpContent: React.FC = () => {
  const { data } = useSupportContacts()
  const showSpinner = data === undefined
  const title = "Zaaksysteem Wonen"
  const contacts = useMemo(() => mapData(data), [data])

  return showSpinner ?
    <Spinner /> :
    <>
      <RowWithColumn>
        <Heading as="h2">Technisch support</Heading>
        <Paragraph>
        Werkt { title } niet (goed)? Probeer de pagina opnieuw te laden door op het refresh icoon <RefreshIcon /> te klikken.<br/>
        Werkt { title } dan nog steeds niet, neem dan contact op met:
        </Paragraph>
        <ul>
          <li>Tijdens kantooruren ontwikkelteam { title }, { showOptionalProperty(contacts[0]?.name) } <PhoneLink phoneNumber={ showOptionalProperty(contacts[0]?.phone_number) } /></li>
          <li>Buiten kantoortijden Datapunt, { showOptionalProperty(contacts[1]?.name) } <PhoneLink phoneNumber={ showOptionalProperty(contacts[1]?.phone_number) } /></li>
        </ul>
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Vraag een demo aan</Heading>
        <Paragraph>
        Ben je nieuw met { title }, loop je ergens tegen aan of wil je gewoon graag persoonlijke uitleg over { title }? Neem dan contact op met { showOptionalProperty(contacts[2]?.name) }, { showOptionalProperty(contacts[2]?.title) }.
        </Paragraph>
        <ul>
          <li>Telefonisch: te bereiken tijdens kantooruren op ma, di, wo en do op <PhoneLink phoneNumber={ showOptionalProperty(contacts[2]?.phone_number) } /></li>
          <li>Per e-mail: <EmailLink email={ showOptionalProperty(contacts[2]?.email) } /></li>
        </ul>
        <Paragraph>
        Ook voor goede ideeën en suggesties <span role="img" aria-label="Slightly Smiling Face">🙂</span>
        </Paragraph>
      </RowWithColumn>
    </>
}
export default HelpContent
