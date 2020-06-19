import React from "react"
import { Link } from "@reach/router"
import { Button } from "@datapunt/asc-ui"
import useGlobalActions from "../../globalstate/useGlobalActions"

type Props = {
  item: API.Case
}

const Case: React.FC<Props> = ({ item: { uuid, omschrijving } }) => {
  const { cases: { del } } = useGlobalActions()

  const onClick = () => {
    if (window.confirm("Weet je het zeker?")) {
      del(uuid)
    }
  }

  return (
    <tr>
      <td><Link to={ `/cases/${ uuid }` }>{ uuid }</Link></td>
      <td>{ omschrijving }</td>
      <td><Link to={ `/cases/${ uuid }/update` }><Button>wijzig</Button></Link></td>
      <td><Button onClick={ onClick }>verwijder</Button></td>
    </tr>
  )
}

export default Case
