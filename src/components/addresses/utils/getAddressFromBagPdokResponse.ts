export const getAddressFromBagPdokResponse = (
  data?: BAGPdokResponse,
): BAGPdokAddress | undefined => {
  const docs = data?.response?.docs
  const hoofdadres = docs?.find((doc) => doc.adrestype === "hoofdadres")

  return hoofdadres ?? docs?.[0]
}
