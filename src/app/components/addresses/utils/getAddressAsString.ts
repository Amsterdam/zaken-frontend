const getAddressAsString = (address?: BAGAddressResponse["results"][number]) => {
  if (!address) return
  const { straatnaam, huisnummer, bag_huisletter, bag_toevoeging } = address
  return (
    `${ straatnaam } ${ huisnummer }${ bag_huisletter ?? "" }${ bag_toevoeging ? `-${ bag_toevoeging }` : "" }`
  )
}

export default getAddressAsString
