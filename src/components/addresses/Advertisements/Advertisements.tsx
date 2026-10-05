import {
  Column,
  Heading,
  Paragraph,
  Skeleton,
  StandaloneLink,
  UnorderedList,
} from "@amsterdam/design-system-react"
import { LinkExternalIcon } from "@amsterdam/design-system-react-icons"
import { useCasesByBagId } from "@/api/hooks"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

const IS_OPEN_CASES = true

/**
 * The site and the page of an advertisement, without "www." and without the
 * search parameters (dates, tracking): "airbnb.nl/rooms/123". The link itself
 * keeps the whole address.
 */
const shortenLink = (link: string) => {
  try {
    const { hostname, pathname } = new URL(link)
    return `${hostname.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}`
  } catch {
    return link
  }
}

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
        <Skeleton>
          <Skeleton.List lines={2} />
        </Skeleton>
      ) : uniqueAds.length > 0 ? (
        <UnorderedList markers={false}>
          {uniqueAds.map((ad) => (
            <UnorderedList.Item key={ad.id}>
              {/* You leave the app: the icon says so, and the hidden text
                  says it to a screen reader. */}
              <StandaloneLink
                href={ad.link}
                icon={LinkExternalIcon}
                title={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                // A long address without spaces must not widen the page.
                style={{ overflowWrap: "anywhere" }}
              >
                {shortenLink(ad.link)}
                <span className="ams-visually-hidden">
                  {" "}
                  (externe website, opent in een nieuw tabblad)
                </span>
              </StandaloneLink>
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
