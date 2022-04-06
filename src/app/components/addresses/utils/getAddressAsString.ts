const getAddressAsString = (data?: BAGAddressResponse) => {
  const address = data?.results[0]
  if (!address) return
  const { straatnaam, huisnummer, bag_huisletter, bag_toevoeging } = address
  return (
    `${ straatnaam } ${ huisnummer }${ bag_huisletter ?? "" }${ bag_toevoeging ? `-${ bag_toevoeging }` : "" }`
  )
}

export default getAddressAsString
