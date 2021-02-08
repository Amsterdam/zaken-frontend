declare type BAGAddressResponse = {
  results: Array<{
    _links: Array<any>
    adres: string
    adresseerbaar_object_id: string
    bag_huisletter: string
    bag_toevoeging: string
    centroid: number[]
    dataset: string
    huisnummer: number
    landelijk_id: string
    postcode: string
    status: string
    straatnaam: string
    subtype: string
    subtype_id: string
    toevoeging: string
    type: string
    type_adres: string
    vbo_status: string
    woonplaats: string
  }>
}
