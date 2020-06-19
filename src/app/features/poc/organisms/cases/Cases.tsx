import React from "react"
import Case from "./Case"
import { Link } from "@reach/router"
import { Button } from "@datapunt/asc-ui"

type Props = {
  items: API.Case[]
}

const Cases: React.FC<Props> = ({ items }) => (
  <>
    <table>
      <thead>
        <tr>
          <th>uuid</th>
          <th>omschrijving</th>
          <th>acties</th>
        </tr>
      </thead>
      <tbody>
        { items.map(item => <Case item={ item } key={ item.uuid }/>) }
      </tbody>
    </table>
    <Link to={ "/cases/new" }><Button>Toevoegen</Button></Link>
  </>
)

export default Cases
