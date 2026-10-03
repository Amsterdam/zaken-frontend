import {
  Column,
  Heading,
  Link,
  Paragraph,
  UnorderedList,
} from "@amsterdam/design-system-react"
import { useCasesByBagId } from "@/api/hooks"
import { SmallSkeleton } from "@/components/SmallSkeleton/SmallSkeleton"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

const IS_OPEN_CASES = true

/** The advertisements of the open cases on an address, each one once. */
const Advertisements: React.FC<Props> = ({ bagId }) => {
  const { data, isLoading: isBusy } = useCasesByBagId(bagId, IS_OPEN_CASES)
  const ads = (data?.results ?? []).flatMap((c) => c.advertisements ?? [])
  const uniqueAds = ads.filter(
    (value, index, self) =>
      self.findIndex((v) => v.link === value.link) === index,
  )

  return (
    <Column gap="small">
      <Heading level={2}>Advertenties</Heading>
      {isBusy ? (
        <SmallSkeleton height={10} maxRandomWidth={300} />
      ) : uniqueAds.length > 0 ? (
        <UnorderedList markers={false}>
          {uniqueAds.map((ad) => (
            <UnorderedList.Item key={ad.id}>
              <Link href={ad.link} target="_blank" rel="noopener noreferrer">
                {ad.link}
              </Link>
            </UnorderedList.Item>
          ))}
        </UnorderedList>
      ) : (
        <Paragraph>Geen advertenties gevonden</Paragraph>
      )}
    </Column>
  )
}

export default Advertisements
