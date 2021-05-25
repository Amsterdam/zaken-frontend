import { SearchResult } from "../SearchResults"
import OpenButton from "app/components/shared/OpenButton/OpenButton"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

const onClick = (bagId: Components.Schemas.Address["bag_id"]) => (e: React.MouseEvent) => {
  e.stopPropagation()
  navigateTo("/adres/:bagId", { bagId })
}

export default (results?: SearchResult[]) =>
  results?.filter(({ postcode }) => typeof postcode === "string")
    .map(({ adresseerbaar_object_id, adres, postcode }) => ({
      onClick: onClick(adresseerbaar_object_id),
      itemList: [
        adres ?? "-",
        postcode ?? "-",
        adresseerbaar_object_id ?
          <OpenButton href={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) } text="Bekijk" /> :
          null
      ]
    }))