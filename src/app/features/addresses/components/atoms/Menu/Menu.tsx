import React from "react"
import { Link } from "@reach/router"

const Menu: React.FC = () =>
  <menu>
    <ul>
      <li><Link to="detail">Adres details</Link></li>
      <li><Link to="personen">Persoonsgegevens</Link></li>
      <li><Link to="vergunningen">Vergunningen</Link></li>
      <li><Link to="zaken">Gerelateerde zaken</Link></li>
    </ul>
  </menu>
export default Menu
