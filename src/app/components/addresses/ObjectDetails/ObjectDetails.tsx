import { Column, Heading } from "@amsterdam/design-system-react"
import { useBenkAgg } from "@/api/hooks"
import { Description } from "@/components/Description/Description"
import { getAddressFromBenkAggResponse } from "@/app/components/addresses/utils"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

// The BAG writes some values without a capital ("woonfunctie").
const capitalize = <T extends string | number>(value: T) =>
  typeof value === "string"
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : value

// An empty value is left out of the list (the Description skips undefined).
const text = (value?: string | number | null) =>
  value === null || value === undefined || value === ""
    ? undefined
    : capitalize(value)

const list = (values?: (string | number)[] | null) =>
  values && values.length > 0
    ? Array.from(new Set(values.map(capitalize))).join(", ")
    : undefined

/** A value of every building of the address; the API gives each building as a JSON text. */
const fromBuildings = (buildings: string[] | null | undefined, key: string) =>
  list(
    (buildings ?? []).flatMap((building) => {
      try {
        const value: unknown = JSON.parse(building)?.[key]
        return typeof value === "string" || typeof value === "number"
          ? [value]
          : []
      } catch {
        return []
      }
    }),
  )

/** What kind of home an address is, and where it lies (from the BAG). */
const ObjectDetails: React.FC<Props> = ({ bagId }) => {
  const { data: benkAggResponse, isLoading: isBusy } = useBenkAgg(bagId)
  const object = getAddressFromBenkAggResponse(benkAggResponse)
  const floor = object?.verblijfsobjectVerdiepingToegang

  return (
    <Column gap="large">
      <Column gap="small">
        <Heading level={2}>Objectdetails</Heading>
        <Description
          termsWidth="medium"
          loading={isBusy}
          numLoadingRows={10}
          data={[
            {
              label: "Gebruiksdoel",
              value: list(object?.gebruiksdoelOmschrijvingen),
            },
            {
              label: "Soort object",
              value: text(object?.typeAdresseerbaarObjectOmschrijving),
            },
            { label: "Type adres", value: text(object?.typeAdres) },
            {
              label: "Status",
              value: text(object?.verblijfsobjectStatusOmschrijving),
            },
            {
              label: "Oppervlakte",
              value: object?.verblijfsobjectOppervlakte
                ? `${object.verblijfsobjectOppervlakte}m²`
                : undefined,
            },
            {
              label: "Aantal kamers",
              value: text(object?.verblijfsobjectAantalKamers),
            },
            {
              label: "Bouwlagen",
              value: text(object?.verblijfsobjectAantalBouwlagen),
            },
            {
              label: "Verdieping",
              value: floor === 0 ? "Begane grond" : text(floor),
            },
            { label: "Toegang", value: list(object?.toegangOmschrijvingen) },
            {
              label: "Eigendomsverhouding",
              value: text(
                object?.verblijfsobjectEigendomsverhoudingOmschrijving,
              ),
            },
            {
              label: "WOZ-soort",
              value: list(object?.wozSoortObjectOmschrijving),
            },
            {
              label: "Bouwjaar",
              value: fromBuildings(object?.panden, "bouwjaar Pand"),
            },
            {
              label: "Type woonobject",
              value: fromBuildings(object?.panden, "type woonobject Pand"),
            },
          ]}
        />
      </Column>
      <Column gap="small">
        <Heading level={2}>Gebied</Heading>
        <Description
          termsWidth="medium"
          loading={isBusy}
          numLoadingRows={3}
          data={[
            { label: "Stadsdeel", value: text(object?.gebiedenStadsdeelNaam) },
            { label: "Wijk", value: text(object?.gebiedenWijkNaam) },
            { label: "Buurt", value: text(object?.gebiedenBuurtNaam) },
          ]}
        />
      </Column>
    </Column>
  )
}

export default ObjectDetails
