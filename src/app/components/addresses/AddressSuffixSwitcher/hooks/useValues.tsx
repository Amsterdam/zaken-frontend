import type { SearchResult } from "app/components/search/SearchResults/SearchResults"
import navigateTo from "app/routing/navigateTo"
import to from "app/routing/utils/to"
import OpenButton from "app/components/shared/OpenButton/OpenButton"

export default (
  response: SearchResult[] | undefined,
  onAddressChosen: () => void
) => {

  const onClick = (newBagId: Components.Schemas.Address["bag_id"]) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddressChosen()
    navigateTo("/adres/:bagId", { bagId: newBagId })
  }

  return response?.map(({ adres, adresseerbaar_object_id }) => (
    {
      onClick: onClick(adresseerbaar_object_id),
      itemList: [
        adres,
        <OpenButton
          href={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) }
          text="Open"
        />
      ]
    }
  ))
}
