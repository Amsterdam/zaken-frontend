import { Column, DataList, Skeleton } from "@amsterdam/design-system-react"
import { HouseIcon, AreaIcon } from "@amsterdam/design-system-react-icons"
import { useBenkAgg } from "@/api/hooks"
import type { DescriptionItem } from "@/components/Description/Description"
import { getAddressFromBenkAggResponse } from "@/components/addresses/utils"
import { formatDate } from "@/shared/dateFormatters"
import { HeadingWithIcon } from "@/components/HeadingWithIcon/HeadingWithIcon"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

// The BAG writes some values without a capital ("woonfunctie").
const capitalize = <T extends string | number>(value: T) =>
  typeof value === "string"
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : value

// An empty value is left out of the list (DetailsList skips undefined).
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

type DetailsListProps = {
  items: DescriptionItem[]
  loading: boolean
  numLoadingRows: number
}

/** The details as a Data List; items without a value are left out. */
const DetailsList = ({ items, loading, numLoadingRows }: DetailsListProps) => (
  <DataList>
    {loading
      ? Array.from({ length: numLoadingRows }, (_, index) => (
          <DataList.Item key={index}>
            <DataList.Key>
              <Skeleton>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
            </DataList.Key>
            <DataList.Value>
              <Skeleton>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
            </DataList.Value>
          </DataList.Item>
        ))
      : items
          .filter(({ value }) => value !== null && value !== undefined)
          .map(({ label, value }, index) => (
            <DataList.Item key={index}>
              <DataList.Key>{label}</DataList.Key>
              <DataList.Value>{value}</DataList.Value>
            </DataList.Item>
          ))}
  </DataList>
)

/** What kind of home an address is, and where it lies (from the BAG). */
const ObjectDetails: React.FC<Props> = ({ bagId }) => {
  const { data: benkAggResponse, isLoading: isBusy } = useBenkAgg(bagId)
  const object = getAddressFromBenkAggResponse(benkAggResponse)
  const floor = object?.verblijfsobjectVerdiepingToegang

  return (
    <Column gap="x-large">
      <Column gap="small">
        <HeadingWithIcon
          label="Objectdetails"
          svg={HouseIcon}
          level={2}
          className="ams-mb-m"
        />
        <DetailsList
          loading={isBusy}
          numLoadingRows={10}
          items={[
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
              label: "Begin geldigheid",
              value: text(formatDate(object?.beginGeldigheid)),
            },
            {
              label: "BAG-proces verblijfsobject",
              value: text(object?.verblijfsobjectBagproces),
            },
            {
              label: "BAG-proces ligplaats",
              value: text(object?.ligplaatsBagproces),
            },
            {
              label: "BAG-proces standplaats",
              value: text(object?.standplaatsBagproces),
            },
            {
              label: "Begin geldigheid verblijfsobject",
              value: text(formatDate(object?.verblijfsobjectBeginGeldigheid)),
            },
            {
              label: "Begin geldigheid ligplaats",
              value: text(formatDate(object?.ligplaatsBeginGeldigheid)),
            },
            {
              label: "Begin geldigheid standplaats",
              value: text(formatDate(object?.standplaatsBeginGeldigheid)),
            },
            {
              label: "Type woonobject",
              value: fromBuildings(object?.panden, "type woonobject Pand"),
            },
          ]}
        />
      </Column>
      <Column gap="small">
        <HeadingWithIcon
          label="Gebied"
          svg={AreaIcon}
          level={2}
          className="ams-mb-m"
        />
        <DetailsList
          loading={isBusy}
          numLoadingRows={3}
          items={[
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
